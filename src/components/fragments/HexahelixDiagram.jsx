import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Landmark,
  GraduationCap,
  Building2,
  Camera,
  HeartHandshake,
  Users,
} from 'lucide-react';
import { selectInstitutionsStats } from '../../states/features/institution/institutionSelectors';

const numberFormatter = new Intl.NumberFormat('id-ID');

// Enam simpul model Hexahelix, urut searah jarum jam mulai dari atas --
// posisinya dihitung lewat trigonometri (lihat hexPoint), bukan dihardcode,
// supaya tetap presisi kalau radius/ukuran diagram berubah.
//
// `typeIds`: id di md_institutions_type yang dijumlahkan jadi angka live di
// simpul ini (lihat GetInstitutionsStatsUseCase di back-end-sms). `null`
// berarti dimensi itu belum punya data institusi terstruktur (Komunitas /
// masyarakat sipil bukan "jenis institusi" di skema saat ini) -- simpulnya
// tetap tampil, hanya tanpa angka, alih-alih memalsukan data.
const STAKEHOLDERS = [
  {
    key: 'pemerintah',
    label: 'Pemerintah',
    icon: Landmark,
    typeIds: [4, 5],
  },
  {
    key: 'dunia-usaha',
    label: 'Dunia Usaha',
    icon: Building2,
    typeIds: [6],
  },
  {
    key: 'media-massa',
    label: 'Media Massa',
    icon: Camera,
    typeIds: [7],
  },
  {
    key: 'komunitas',
    label: 'Komunitas',
    icon: Users,
    typeIds: null,
  },
  {
    key: 'ngo-ingo',
    label: 'NGO / INGO',
    icon: HeartHandshake,
    typeIds: [2, 3],
  },
  {
    key: 'universitas',
    label: 'Universitas',
    icon: GraduationCap,
    typeIds: [1],
  },
];

const SIZE = 600;
const CENTER = SIZE / 2;
const NODE_RADIUS = 42;
const RING_RADIUS = 220;

// Titik pada lingkaran heksagon: index 0 di jam 12, lalu searah jarum jam.
function hexPoint(index, radius) {
  const angle = (Math.PI / 180) * (-90 + index * 60);
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

const nodePositions = STAKEHOLDERS.map((_, i) => hexPoint(i, RING_RADIUS));

// Semua pasangan simpul (graf lengkap K6) untuk garis mesh di tengah --
// merepresentasikan bahwa keenam pihak ini saling terhubung, bukan hierarki.
const meshEdges = [];
for (let i = 0; i < nodePositions.length; i += 1) {
  for (let j = i + 1; j < nodePositions.length; j += 1) {
    meshEdges.push([i, j]);
  }
}

// Catatan: komponen ini TIDAK men-dispatch asyncGetInstitutionsStats sendiri
// -- satu-satunya pemakainya (LandingPgLyt) sudah memuat data yang sama
// untuk kartu Divisi, jadi fetch di sini akan duplikat. Kalau komponen ini
// dipakai di halaman lain nanti, tambahkan lagi useEffect fetch-nya di sana.
export const HexahelixDiagram = () => {
  const stats = useSelector(selectInstitutionsStats);

  const statsByType = useMemo(
    () =>
      stats.reduce((acc, row) => {
        acc[row.typeId] = row.total;
        return acc;
      }, {}),
    [stats],
  );

  const totalsByStakeholder = useMemo(
    () =>
      STAKEHOLDERS.map((s) =>
        s.typeIds
          ? s.typeIds.reduce((sum, id) => sum + (statsByType[id] ?? 0), 0)
          : null,
      ),
    [statsByType],
  );

  return (
    <section
      className='bg-white rounded-xl border border-[#E7EDF4] p-6 md:p-8'
      aria-labelledby='hexahelix-title'
    >
      <div className='text-left mb-4'>
        <h2
          id='hexahelix-title'
          className='text-lg font-semibold text-gray-900'
        >
          Model Kolaborasi Hexahelix
        </h2>
        <p className='mt-1 text-sm text-gray-500 max-w-2xl'>
          Enam pemangku kepentingan yang saling terhubung secara setara --
          angka di tiap simpul adalah jumlah institusi terdaftar (real-time,
          sesuai akses Divisi Anda).
        </p>
      </div>

      {/* `overflow-x-auto` + `min-w`: di layar sempit diagram tidak dipaksa
          menyusut sampai labelnya tidak terbaca -- kartunya yang bisa
          di-scroll horizontal. */}
      <div className='overflow-x-auto'>
        <div className='flex justify-center'>
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className='w-full min-w-[380px] max-w-[520px]'
            role='img'
            aria-labelledby='hexahelix-svg-title hexahelix-desc'
          >
            <title id='hexahelix-svg-title'>
              Model Hexahelix Stakeholder BCF
            </title>
            <desc id='hexahelix-desc'>
              Diagram enam pemangku kepentingan yang saling terhubung:
              Pemerintah, Dunia Usaha, Media Massa, Komunitas, NGO/INGO, dan
              Universitas, masing-masing dengan jumlah institusi terdaftar.
            </desc>
  
            {/* Cincin luar putus-putus, dekoratif saja */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RING_RADIUS + NODE_RADIUS + 14}
              fill='none'
              stroke='#0D4690'
              strokeOpacity='0.25'
              strokeDasharray='6 8'
              strokeWidth='2'
            />
  
            {/* Mesh penghubung antar-simpul */}
            <g stroke='#0D4690' strokeOpacity='0.18' strokeWidth='1.5'>
              {meshEdges.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={nodePositions[a].x}
                  y1={nodePositions[a].y}
                  x2={nodePositions[b].x}
                  y2={nodePositions[b].y}
                />
              ))}
            </g>
  
            {/* Label tengah */}
            <text
              x={CENTER}
              y={CENTER - 6}
              textAnchor='middle'
              className='fill-[#0D4690]'
              fontSize='16'
              fontWeight='700'
            >
              HEXAHELIX
            </text>
            <text
              x={CENTER}
              y={CENTER + 15}
              textAnchor='middle'
              className='fill-gray-400'
              fontSize='11'
            >
              Kolaborasi 6 Pihak
            </text>
  
            {/* Simpul stakeholder */}
            {STAKEHOLDERS.map((s, i) => {
              const { x, y } = nodePositions[i];
              const Icon = s.icon;
              const total = totalsByStakeholder[i];
              return (
                <g key={s.key}>
                  <circle
                    cx={x}
                    cy={y}
                    r={NODE_RADIUS}
                    className='fill-[#F5F9FF] stroke-[#0D4690]'
                    strokeWidth='2'
                  />
                  <foreignObject
                    x={x - 20}
                    y={y - 24}
                    width='40'
                    height='30'
                  >
                    <div className='w-full h-full flex items-center justify-center'>
                      <Icon
                        className='w-5 h-5 text-[#0D4690]'
                        strokeWidth={1.75}
                      />
                    </div>
                  </foreignObject>
  
                  {/* Angka live -- ditampilkan hanya kalau ada data (lihat
                      catatan Komunitas di atas) */}
                  {total !== null && (
                    <text
                      x={x}
                      y={y + 20}
                      textAnchor='middle'
                      className='fill-[#0D4690]'
                      fontSize='13'
                      fontWeight='700'
                    >
                      {numberFormatter.format(total)}
                    </text>
                  )}
  
                  <text
                    x={x}
                    y={y + NODE_RADIUS + 20}
                    textAnchor='middle'
                    className='fill-gray-800'
                    fontSize='14'
                    fontWeight='600'
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <p className='mt-5 text-xs text-gray-400 border-t border-[#E7EDF4] pt-3 text-left'>
        Selaras dengan Tujuan Pembangunan Berkelanjutan (SDGs) untuk
        mewujudkan peradaban yang maju, sejahtera, dan bermartabat.
      </p>
    </section>
  );
};
