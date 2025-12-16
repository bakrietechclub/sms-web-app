import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft, MapPin, FileText, Calendar, ExternalLink, Users } from 'lucide-react';
import { Label } from '../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetResearchCollabById } from '../../../states/features/research/collab/collabThunks';
import { selectCollabDetail, selectCollabLoading } from '../../../states/features/research/collab/collabSelectors';

export default function ColabPartnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectCollabDetail);
  const loading = useSelector(selectCollabLoading);

  useEffect(() => {
    dispatch(asyncGetResearchCollabById({ id }));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
          <div className="flex items-center justify-between">
            <div className="h-8 w-1/3 bg-gray-200 rounded" />
            <div className="h-9 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Main Information Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* MoU and PKS Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[1, 2].map((card) => (
            <div key={card} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" /> {/* Title */}
              <div className="space-y-3">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex gap-4">
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>

        {/* Collab Details Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="space-y-4">
            <div>
              <div className="h-3 w-48 bg-gray-200 rounded mb-1" />
              <div className="h-5 w-full bg-gray-200 rounded" />
            </div>
            <div>
              <div className="h-3 w-48 bg-gray-200 rounded mb-1" />
              <div className="h-5 w-full bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* SWOT Analysis Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const updateButtonClasses = `
    rounded-md px-4 py-2 text-sm font-medium transition duration-200 shadow-sm
    bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer
  `;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Back Button and Actions */}
      <div className="mb-4">
        <Button
          className="text-[#0D4690] hover:text-blue-800 cursor-pointer flex items-center gap-1 mb-3 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} /> Kembali
        </Button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Riset Kolaborasi Mitra
          </h1>
          <Button className={updateButtonClasses}>
            Perbarui
          </Button>
        </div>
      </div>

      {/* Main Information Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Nama {data?.institutionType?.toLowerCase().includes('universitas') ? 'Universitas' : 'Lembaga Sosial/Komunitas'}
            </p>
            <p className="text-sm font-semibold text-gray-900">{data?.institutionName || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Jenis Instansi</p>
            <p className="text-sm text-gray-900">{data?.institutionType || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Divisi Instansi</p>
            <p className="text-sm text-gray-900">-</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
              <MapPin size={14} /> Region
            </p>
            <p className="text-sm text-gray-900">{data?.institutionRegion || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Program LSD</p>
            <p className="text-sm text-gray-900">{data?.researchPrograms?.join(', ') || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status Kerjasama</p>
            <Label label={data?.MoUstatus} status="success" />
          </div>
        </div>
      </div>

      {/* MoU and PKS Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* MoU Status Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={18} /> Status MoU
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-start">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide w-32 flex items-center gap-1">
                <Calendar size={12} /> Tanggal TTD
              </dt>
              <dd className="text-gray-900 flex-1">{data?.MoUSignatureDate || '-'}</dd>
            </div>
            <div className="flex items-start">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide w-32 flex items-center gap-1">
                <Calendar size={12} /> Jatuh Tempo
              </dt>
              <dd className="text-gray-900 flex-1">{data?.MoUDueDate || '-'}</dd>
            </div>
            <div className="flex items-start">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide w-32">Link Dokumen</dt>
              <dd className="flex-1">
                {data?.MouDocumentUrl ? (
                  <a
                    href={data.MouDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D4690] hover:text-blue-800 text-sm underline inline-flex items-center gap-1"
                  >
                    Lihat Dokumen <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-gray-900">-</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* PKS Status Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={18} /> Status PKS
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-start">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide w-32 flex items-center gap-1">
                <Calendar size={12} /> Tanggal TTD
              </dt>
              <dd className="text-gray-900 flex-1">{data?.PkSSignatureDate || '-'}</dd>
            </div>
            <div className="flex items-start">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide w-32 flex items-center gap-1">
                <Calendar size={12} /> Jatuh Tempo
              </dt>
              <dd className="text-gray-900 flex-1">{data?.PkSDueDate || '-'}</dd>
            </div>
            <div className="flex items-start">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide w-32">Link Dokumen</dt>
              <dd className="flex-1">
                {data?.PkSDocumentUrl ? (
                  <a
                    href={data.PkSDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D4690] hover:text-blue-800 text-sm underline inline-flex items-center gap-1"
                  >
                    Lihat Dokumen <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-gray-900">-</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Users size={18} /> Kontak
        </h2>
        <a
          href="#"
          className="text-[#0D4690] hover:text-blue-800 text-sm font-medium underline inline-flex items-center gap-1"
        >
          Lihat Detail Kontak <ExternalLink size={14} />
        </a>
      </div>

      {/* Collaboration Details Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Detail Rencana Kolaborasi</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Program LSD Rencana Kolaborasi</p>
            <p className="text-sm text-gray-900">{data?.researchPrograms?.join(', ') || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Detail Rencana Kolaborasi</p>
            <p className="text-sm text-gray-900">{data?.detail || '-'}</p>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Analisis SWOT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-800 mb-2">Strengths (Kekuatan)</h3>
            <p className="text-sm text-gray-700">{data?.strengths || '-'}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Weaknesses (Kelemahan)</h3>
            <p className="text-sm text-gray-700">{data?.weakness || '-'}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Opportunities (Peluang)</h3>
            <p className="text-sm text-gray-700">{data?.opportunities || '-'}</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">Challenges (Tantangan)</h3>
            <p className="text-sm text-gray-700">{data?.challenge || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
