import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { usePermission } from '../../../hooks/usePermission';
import { SIDEBAR_PATH_PERMISSION } from '../../../config/sidebarPermissions';

// Urutan & syarat di bawah ini mengikuti tata kelola kerja sama BCF yang
// sesungguhnya berlaku (bukan sekadar urutan menu). Catatan untuk tim
// engineering:
// - MoU merujuk ke tx_ps_research, yaitu tabel Riset POTENSIAL (bukan
//   Kolaborasi) -- lihat FK tx_ps_mou.id_partnership_research REFERENCES
//   tx_ps_research(id).
// - PKS->IA, PKS->TOR, dan IA->TOR OPSIONAL karena kolom relasinya nullable
//   (tx_ps_ia.id_partnership_pks, tx_ps_tor.id_partnership_ia,
//   tx_ps_tor.id_partnership_pks) -- satu PKS bisa langsung lanjut ke TOR
//   tanpa IA.
// - MoU->PKS dan TOR->SPK WAJIB (kolom NOT NULL:
//   tx_ps_pks.id_partnership_mou, tx_ps_spk.id_partnership_tor).
const NODES = {
  riset: {
    key: 'riset',
    label: 'Riset Mitra',
    sublabel: 'Riset Potensial',
    path: '/research/potential-partner',
    x: 20,
    y: 140,
    description: 'Titik awal: calon mitra yang sudah melalui proses riset potensial.',
  },
  mou: {
    key: 'mou',
    label: 'MoU',
    sublabel: 'Nota Kesepahaman',
    path: '/partnerships/mou',
    x: 220,
    y: 140,
    description: 'Kesepakatan payung yang menandai kedua pihak sepakat untuk bekerja sama.',
    requirement: 'Wajib berasal dari mitra yang sudah tercatat di Riset Potensial.',
  },
  pks: {
    key: 'pks',
    label: 'PKS',
    sublabel: 'Perjanjian Kerja Sama',
    path: '/partnerships/pks',
    x: 420,
    y: 140,
    description: 'Menerjemahkan kesepakatan MoU menjadi perjanjian kerja sama yang lebih rinci.',
    requirement: 'Wajib: MoU untuk kerja sama ini harus sudah ada lebih dulu.',
  },
  ia: {
    key: 'ia',
    label: 'IA',
    sublabel: 'Implementation Agreement',
    path: '/partnerships/implementation-agreements',
    x: 660,
    y: 30,
    description: 'Rincian teknis pelaksanaan program, dapat diturunkan dari satu PKS.',
    requirement: 'Opsional: hanya dibuat kalau program ini butuh rincian implementasi tersendiri.',
  },
  tor: {
    key: 'tor',
    label: 'TOR',
    sublabel: 'Term of Reference',
    path: '/partnerships/tor',
    x: 660,
    y: 250,
    description: 'Kerangka acuan kerja untuk pelaksanaan program di lapangan.',
    requirement: 'Opsional dari PKS/IA: bisa dibuat langsung dari PKS, atau melanjutkan IA kalau ada.',
  },
  spk: {
    key: 'spk',
    label: 'SPK',
    sublabel: 'Surat Perintah Kerja',
    path: '/partnerships/spk',
    x: 890,
    y: 250,
    description: 'Surat perintah resmi untuk mulai mengeksekusi pekerjaan di lapangan.',
    requirement: 'Wajib: TOR untuk pekerjaan ini harus sudah ada lebih dulu.',
  },
};

const FLOW_STEPS = [
  NODES.riset,
  NODES.mou,
  NODES.pks,
  NODES.ia,
  NODES.tor,
  NODES.spk,
];

// `required: true` -> garis solid ("wajib ada duluan"), `false` -> garis
// putus-putus ("boleh dilewati / opsional"). Lihat catatan skema di atas.
const EDGES = [
  { from: 'riset', to: 'mou', required: true },
  { from: 'mou', to: 'pks', required: true },
  { from: 'pks', to: 'ia', required: false },
  { from: 'pks', to: 'tor', required: false },
  { from: 'ia', to: 'tor', required: false },
  { from: 'tor', to: 'spk', required: true },
];

const NODE_W = 168;
const NODE_H = 88;
const SIZE_W = 890 + NODE_W + 30;
const SIZE_H = 250 + NODE_H + 30;

// Titik sambung di tepi kotak node, supaya garis tidak menusuk ke tengah
// kotak melainkan masuk dari sisi yang masuk akal (kanan/kiri/atas/bawah)
// tergantung posisi relatif kedua node.
function edgePoint(node, side) {
  const cx = node.x + NODE_W / 2;
  const cy = node.y + NODE_H / 2;
  switch (side) {
    case 'right':
      return { x: node.x + NODE_W, y: cy };
    case 'left':
      return { x: node.x, y: cy };
    case 'top':
      return { x: cx, y: node.y };
    case 'bottom':
      return { x: cx, y: node.y + NODE_H };
    default:
      return { x: cx, y: cy };
  }
}

export const PartnershipFlowOverview = () => {
  const navigate = useNavigate();
  const { can } = usePermission();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Alur Legalitas Kerjasama
        </h1>
        <p className='mt-1 text-sm text-gray-500 max-w-3xl'>
          Diagram ini menggambarkan standar dan tata kelola kerja sama yang
          berlaku di BCF: dokumen mana yang wajib ada lebih dulu, dan dokumen
          mana yang sifatnya opsional tergantung kebutuhan program.
        </p>
      </div>

      <section
        className='bg-white rounded-xl border border-[#E7EDF4] p-6 md:p-8'
        aria-labelledby='partnership-flow-title'
      >
        <div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
          <h2
            id='partnership-flow-title'
            className='text-sm font-semibold text-gray-900'
          >
            Diagram Tahapan
          </h2>
          {/* Legenda garis solid vs putus-putus -- tanpa ini orang akan
              menyimpulkan semua panah berarti "wajib", padahal 3 dari 6
              relasi di sini opsional. */}
          <div className='flex items-center gap-4 text-xs text-gray-500'>
            <span className='flex items-center gap-1.5'>
              <svg
                width='24'
                height='2'
                aria-hidden='true'
              >
                <line
                  x1='0'
                  y1='1'
                  x2='24'
                  y2='1'
                  stroke='#0D4690'
                  strokeWidth='2'
                />
              </svg>
              Wajib ada lebih dulu
            </span>
            <span className='flex items-center gap-1.5'>
              <svg
                width='24'
                height='2'
                aria-hidden='true'
              >
                <line
                  x1='0'
                  y1='1'
                  x2='24'
                  y2='1'
                  stroke='#B9C4D3'
                  strokeWidth='2'
                  strokeDasharray='4 3'
                />
              </svg>
              Opsional, sesuai kebutuhan
            </span>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <svg
            viewBox={`0 0 ${SIZE_W} ${SIZE_H}`}
            className='w-full min-w-[900px]'
            role='img'
            aria-labelledby='partnership-flow-svg-title partnership-flow-desc'
          >
            <title id='partnership-flow-svg-title'>
              Tahapan legalitas kerjasama BCF
            </title>
            <desc id='partnership-flow-desc'>
              Riset Mitra wajib menghasilkan MoU, MoU wajib menjadi dasar PKS.
              Dari PKS, IA dan TOR bersifat opsional dan bisa dibuat langsung
              tanpa harus melalui satu sama lain. TOR wajib ada sebelum SPK
              dibuat.
            </desc>

            <defs>
              <marker
                id='arrowhead-required'
                markerWidth='8'
                markerHeight='8'
                refX='6'
                refY='4'
                orient='auto'
              >
                <path
                  d='M0,0 L8,4 L0,8 Z'
                  fill='#0D4690'
                />
              </marker>
              <marker
                id='arrowhead-optional'
                markerWidth='8'
                markerHeight='8'
                refX='6'
                refY='4'
                orient='auto'
              >
                <path
                  d='M0,0 L8,4 L0,8 Z'
                  fill='#B9C4D3'
                />
              </marker>
            </defs>

            {EDGES.map((edge) => {
              const from = NODES[edge.from];
              const to = NODES[edge.to];
              const sameRow = from.y === to.y;
              const goingDown = to.y > from.y;

              let p1;
              let p2;
              if (sameRow) {
                p1 = edgePoint(from, 'right');
                p2 = edgePoint(to, 'left');
              } else if (edge.from === 'pks') {
                // Cabang dari PKS ke IA (naik) / TOR (turun)
                p1 = edgePoint(from, 'right');
                p2 = edgePoint(to, 'left');
              } else {
                // IA -> TOR: turun lurus di antara keduanya
                p1 = edgePoint(from, goingDown ? 'bottom' : 'top');
                p2 = edgePoint(to, goingDown ? 'top' : 'bottom');
              }

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={edge.required ? '#0D4690' : '#B9C4D3'}
                  strokeWidth='2'
                  strokeDasharray={edge.required ? undefined : '5 4'}
                  markerEnd={`url(#arrowhead-${edge.required ? 'required' : 'optional'})`}
                />
              );
            })}

            {FLOW_STEPS.map((step) => {
              const hasAccess = can(SIDEBAR_PATH_PERMISSION[step.path]);
              return (
                <foreignObject
                  key={step.key}
                  x={step.x}
                  y={step.y}
                  width={NODE_W}
                  height={NODE_H}
                >
                  <button
                    type='button'
                    onClick={() => hasAccess && navigate(step.path)}
                    disabled={!hasAccess}
                    title={
                      hasAccess
                        ? `Buka ${step.label}`
                        : 'Anda tidak memiliki akses ke menu ini'
                    }
                    className={`w-full h-full rounded-lg border-2 flex flex-col items-center justify-center gap-0.5 px-2 text-center transition-colors ${
                      hasAccess
                        ? 'border-[#0D4690] bg-[#F5F9FF] hover:bg-[#E7EDF4] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4690]'
                        : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    {!hasAccess && (
                      <Lock className='w-3.5 h-3.5 text-gray-400 mb-0.5' />
                    )}
                    <span
                      className={`text-sm font-bold ${hasAccess ? 'text-[#0D4690]' : 'text-gray-400'}`}
                    >
                      {step.label}
                    </span>
                    <span
                      className={`text-[11px] leading-tight ${hasAccess ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                      {step.sublabel}
                    </span>
                  </button>
                </foreignObject>
              );
            })}
          </svg>
        </div>

        <p className='mt-4 text-xs text-gray-400 border-t border-[#E7EDF4] pt-3'>
          Klik salah satu kotak untuk membuka halamannya. Kotak abu-abu
          berarti Anda belum memiliki akses ke menu tersebut -- hubungi
          admin lewat menu Atur Akses jika diperlukan.
        </p>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {FLOW_STEPS.map((step) => (
          <div
            key={step.key}
            className='rounded-xl border border-[#E7EDF4] bg-white p-4'
          >
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#F5F9FF] text-[#0D4690] text-xs font-bold'>
                {step.label}
              </span>
              <h3 className='font-semibold text-gray-900 text-sm'>
                {step.sublabel}
              </h3>
            </div>
            <p className='mt-2 text-sm text-gray-500'>{step.description}</p>
            {step.requirement && (
              <div
                className={`mt-3 flex items-start gap-1.5 text-xs rounded-md px-2.5 py-2 ${
                  step.requirement.startsWith('Wajib')
                    ? 'text-[#0D4690] bg-[#F5F9FF]'
                    : 'text-gray-600 bg-gray-50'
                }`}
              >
                <ArrowRight className='w-3.5 h-3.5 mt-0.5 shrink-0' />
                <span>{step.requirement}</span>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default PartnershipFlowOverview;
