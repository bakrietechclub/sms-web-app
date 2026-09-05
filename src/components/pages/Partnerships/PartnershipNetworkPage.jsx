import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Lock, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import api from '../../../utils/api';
import { usePermission } from '../../../hooks/usePermission';
import { SIDEBAR_PATH_PERMISSION } from '../../../config/sidebarPermissions';

// Tingkatan digambar dari ATAS ke BAWAH (lihat PartnershipFlowOverview untuk
// penjelasan wajib/opsional per tahap) -- posisi vertikal murni berdasarkan
// JENIS dokumen, bukan urutan dari API.
const TIER_ORDER = ['mou', 'pks', 'ia', 'tor', 'spk'];

const TYPE_PATH_FOR_PERMISSION = {
  mou: '/partnerships/mou',
  pks: '/partnerships/pks',
  ia: '/partnerships/implementation-agreements',
  tor: '/partnerships/tor',
  spk: '/partnerships/spk',
};

const TYPE_LABEL = {
  mou: 'MoU',
  pks: 'PKS',
  ia: 'IA',
  tor: 'TOR',
  spk: 'SPK',
};

const NODE_W = 108;
const NODE_H = 54;
const COL_GAP = 64;
const ROW_GAP = 56;

function buildLayout(nodes) {
  const tiers = TIER_ORDER.map((type) => nodes.filter((n) => n.type === type));
  const tierWidths = tiers.map(
    (tier) => tier.length * NODE_W + Math.max(tier.length - 1, 0) * COL_GAP,
  );
  const maxTierWidth = Math.max(NODE_W, ...tierWidths);

  const positioned = {};
  tiers.forEach((tier, tierIndex) => {
    const startX = (maxTierWidth - tierWidths[tierIndex]) / 2;
    const y = tierIndex * (NODE_H + ROW_GAP);
    tier.forEach((node, colIndex) => {
      const x = startX + colIndex * (NODE_W + COL_GAP);
      positioned[node.id] = { ...node, x, y, tierIndex };
    });
  });

  const height = TIER_ORDER.length * NODE_H + (TIER_ORDER.length - 1) * ROW_GAP;
  return { positioned, tierWidth: maxTierWidth, height };
}

// Semua edge -- termasuk yang melompati tingkat lain (mis. PKS langsung ke
// TOR, melewati tingkat IA) -- digambar sebagai kurva halus lurus ke bawah
// di antara titik tengah node asal dan tujuan. Garisnya boleh lewat di
// belakang kotak node lain yang ada di antaranya (nodenya digambar belakangan
// jadi tetap di atas) -- ini yang diminta: tetap turun lurus, tidak
// dialihkan lewat samping.
function buildEdgePaths(edges, positioned) {
  return edges
    .map((edge) => {
      const from = positioned[edge.from];
      const to = positioned[edge.to];
      if (!from || !to) return null;

      const fromCenterX = from.x + NODE_W / 2;
      const fromBottomY = from.y + NODE_H;
      const toCenterX = to.x + NODE_W / 2;
      const toTopY = to.y;
      const midY = (fromBottomY + toTopY) / 2;

      return {
        ...edge,
        d: `M${fromCenterX},${fromBottomY} C${fromCenterX},${midY} ${toCenterX},${midY} ${toCenterX},${toTopY - 6}`,
      };
    })
    .filter(Boolean);
}

export const PartnershipNetworkPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { can } = usePermission();

  const [network, setNetwork] = useState({ nodes: [], edges: [], focusId: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 2.5;
  const ZOOM_STEP = 0.25;

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .getPartnershipNetwork({ type, id })
      .then((data) => setNetwork(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, id]);

  const { positioned, tierWidth, height } = useMemo(
    () => buildLayout(network.nodes),
    [network.nodes],
  );

  const edgePaths = useMemo(
    () => buildEdgePaths(network.edges, positioned),
    [network.edges, positioned],
  );

  const width = tierWidth;

  const originTypePath = TYPE_PATH_FOR_PERMISSION[type];
  const originLabel = TYPE_LABEL[type] || 'Dokumen';

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={() => navigate(`${originTypePath}/${id}`)}
          className='inline-flex items-center gap-1.5 text-sm font-medium text-[#0D4690] hover:text-[#08326b] cursor-pointer'
        >
          <ChevronLeft size={16} />
          Kembali ke {originLabel}
        </button>
      </div>

      <div>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Jejaring Surat
        </h1>
        <p className='mt-1 text-sm text-gray-500 max-w-3xl'>
          Peta seluruh dokumen legalitas yang terhubung satu sama lain, dari
          MoU sampai ke turunannya (PKS, IA, TOR, SPK).
        </p>
      </div>

      <section className='bg-white rounded-xl border border-[#E7EDF4] p-6 md:p-8'>
        {loading ? (
          <div className='h-64 rounded-lg bg-gray-100 animate-pulse' />
        ) : error ? (
          <p className='text-sm text-[#DC3545]'>
            Gagal memuat jejaring surat: {error}
          </p>
        ) : network.nodes.length === 0 ? (
          <p className='text-sm text-gray-500'>
            {originLabel} ini belum tertaut ke MoU manapun, jadi jejaringnya
            belum bisa digambarkan. Tautkan dulu lewat &quot;Perbarui
            Data&quot; supaya muncul di sini.
          </p>
        ) : network.nodes.length === 1 ? (
          <p className='text-sm text-gray-500'>
            MoU ini belum punya dokumen turunan (PKS/IA/TOR/SPK) untuk
            digambarkan jejaringnya.
          </p>
        ) : (
          <>
            <div className='flex flex-wrap items-center justify-between gap-3 mb-4'>
              <div className='flex flex-wrap items-center gap-4 text-xs text-gray-500'>
                <span className='flex items-center gap-1.5'>
                  <svg width='24' height='2' aria-hidden='true'>
                    <line x1='0' y1='1' x2='24' y2='1' stroke='#0D4690' strokeWidth='2' />
                  </svg>
                  Wajib ada lebih dulu
                </span>
                <span className='flex items-center gap-1.5'>
                  <svg width='24' height='2' aria-hidden='true'>
                    <line x1='0' y1='1' x2='24' y2='1' stroke='#B9C4D3' strokeWidth='2' strokeDasharray='5 4' />
                  </svg>
                  Opsional, sesuai kebutuhan
                </span>
                <span className='flex items-center gap-1.5'>
                  <span className='inline-block w-3 h-3 rounded-full bg-[#E89229]' />
                  Dokumen yang sedang dibuka
                </span>
              </div>

              {/* Zoom -- diagramnya sengaja dibuat kecil supaya rapi di
                  desktop, tapi itu bikin susah dicek detailnya. Kontrol ini
                  cuma memperbesar ukuran render SVG (viewBox-nya tetap),
                  jadi proporsi & tata letak tidak berubah, cuma diperjelas. */}
              <div className='flex items-center gap-1 shrink-0'>
                <button
                  type='button'
                  onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))}
                  disabled={zoom <= ZOOM_MIN}
                  title='Perkecil'
                  className='p-1.5 rounded-md border border-[#E7EDF4] text-gray-500 hover:bg-[#F5F9FF] hover:text-[#0D4690] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
                >
                  <ZoomOut size={14} />
                </button>
                <span className='text-xs text-gray-500 w-10 text-center tabular-nums'>
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type='button'
                  onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))}
                  disabled={zoom >= ZOOM_MAX}
                  title='Perbesar'
                  className='p-1.5 rounded-md border border-[#E7EDF4] text-gray-500 hover:bg-[#F5F9FF] hover:text-[#0D4690] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type='button'
                  onClick={() => setZoom(1)}
                  disabled={zoom === 1}
                  title='Reset zoom'
                  className='p-1.5 rounded-md border border-[#E7EDF4] text-gray-500 hover:bg-[#F5F9FF] hover:text-[#0D4690] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* `maxWidth: width * zoom` (bukan w-full) -- viewBox diagram
                ini kecil (satuan px sudah dikecilkan sesuai ukuran kartu),
                jadi kalau SVG dipaksa w-full mengisi lebar penuh container
                desktop, tiap satuan ikut membesar dan kartunya jadi
                kelihatan gede lagi. Dibatasi ke lebar aslinya dikali level
                zoom -- viewBox-nya sendiri tidak berubah, jadi proporsi
                tetap sama, cuma ukuran render-nya yang membesar/mengecil.
                Wrapper dikasih batas tinggi + overflow-auto (dua arah)
                supaya waktu di-zoom in bisa digeser untuk mengecek detail,
                tanpa halaman ikut melar.
                PENTING: centering pakai `mx-auto` di SVG-nya, BUKAN
                `flex justify-center` di wrapper -- justify-content:center
                pada flex container yang overflow itu bikin sisi kelebihan
                lebarnya "tersembunyi" simetris di kedua sisi dan TIDAK BISA
                di-scroll di kebanyakan browser, jadi zoom di atas titik
                tertentu (waktu total lebarnya sudah melebihi container)
                kelihatan seperti berhenti membesar padahal DOM-nya sudah
                benar. mx-auto tidak punya masalah itu -- begitu lebih lebar
                dari container dia rata kiri dan scrollable penuh. */}
            <div className='overflow-auto max-h-[70vh]'>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className='block mx-auto'
                style={{
                  width: `${width * zoom}px`,
                  height: `${height * zoom}px`,
                }}
                role='img'
                aria-label='Diagram jejaring dokumen legalitas kerjasama'
              >
                <defs>
                  <marker id='net-arrow-required' markerWidth='8' markerHeight='8' refX='6' refY='4' orient='auto'>
                    <path d='M0,0 L8,4 L0,8 Z' fill='#0D4690' />
                  </marker>
                  <marker id='net-arrow-optional' markerWidth='8' markerHeight='8' refX='6' refY='4' orient='auto'>
                    <path d='M0,0 L8,4 L0,8 Z' fill='#B9C4D3' />
                  </marker>
                </defs>

                {edgePaths.map((edge) => (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={edge.d}
                    fill='none'
                    stroke={edge.required ? '#0D4690' : '#B9C4D3'}
                    strokeWidth='2'
                    strokeDasharray={edge.required ? undefined : '5 4'}
                    markerEnd={`url(#net-arrow-${edge.required ? 'required' : 'optional'})`}
                  />
                ))}

                {Object.values(positioned).map((node) => {
                  const permissionPath = TYPE_PATH_FOR_PERMISSION[node.type];
                  const hasAccess = can(SIDEBAR_PATH_PERMISSION[permissionPath]);
                  const isFocus = node.id === network.focusId;
                  return (
                    <foreignObject
                      key={node.id}
                      x={node.x}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                    >
                      <button
                        type='button'
                        onClick={() => hasAccess && navigate(node.path)}
                        disabled={!hasAccess}
                        title={
                          hasAccess
                            ? `${TYPE_LABEL[node.type]} -- ${node.subLabel}${node.statusName ? ` (${node.statusName})` : ''}`
                            : 'Anda tidak memiliki akses ke menu ini'
                        }
                        className={`w-full h-full rounded-md border flex flex-col items-start justify-center gap-0 px-1.5 text-left leading-none transition-colors ${
                          isFocus
                            ? 'border-[#E89229] bg-[#FFF6EA] ring-2 ring-[#E89229]/40'
                            : hasAccess
                              ? 'border-[#0D4690] bg-[#F5F9FF] hover:bg-[#E7EDF4] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4690]'
                              : 'border-gray-300 bg-gray-50 cursor-not-allowed'
                        }`}
                      >
                        <div className='flex items-center gap-0.5'>
                          {!hasAccess && <Lock className='w-2 h-2 text-gray-400' />}
                          <span
                            className={`text-[11px] font-bold ${
                              isFocus
                                ? 'text-[#B9660A]'
                                : hasAccess
                                  ? 'text-[#0D4690]'
                                  : 'text-gray-400'
                            }`}
                          >
                            {TYPE_LABEL[node.type]}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] leading-tight truncate w-full mt-0.5 ${hasAccess ? 'text-gray-600' : 'text-gray-400'}`}
                        >
                          {node.subLabel}
                        </span>
                        {node.statusName && (
                          <span
                            className={`text-[8px] leading-tight truncate w-full ${hasAccess ? 'text-gray-400' : 'text-gray-300'}`}
                          >
                            {node.statusName}
                          </span>
                        )}
                      </button>
                    </foreignObject>
                  );
                })}
              </svg>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default PartnershipNetworkPage;
