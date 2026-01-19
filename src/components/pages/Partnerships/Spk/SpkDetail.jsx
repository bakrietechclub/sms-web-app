import React, { useEffect, useState } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft, Building2, FileText, Calendar, Users, Briefcase, ExternalLink, Link as LinkIcon, Edit } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpkDetail, selectSpkLoading } from '../../../../states/features/partnerships/spk/spkSelectors';
import { asyncGetSpkById, asyncDeleteSpkById } from '../../../../states/features/partnerships/spk/spkThunks';
import ConfirmationModal from '../../../fragments/ConfirmationModal';
import UpdateSpkModal from '../../../fragments/UpdateSpkModal';
import { selectHasAccess } from '../../../../states/features/auth/authSelectors';

export default function SpkDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const hasAccess = useSelector(selectHasAccess);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetSpkById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectSpkDetail);
  const loading = useSelector(selectSpkLoading);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto pb-10 animate-pulse">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-8 w-48 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information - Left Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="h-6 w-48 bg-gray-200 rounded mb-4" /> {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Parties Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Dates & Docs */}
          <div className="space-y-6">
            {/* Timeline Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-16 bg-blue-50 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
        {Icon && <Icon size={14} />} {label}
      </p>
      <p className="text-sm font-medium text-gray-900 break-words">{value || '-'}</p>
    </div>
  );

  const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-75';

  const updateButtonClasses = `
    bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer rounded-lg px-4 py-2 flex items-center gap-2 transition-colors w-fit
    ${!hasAccess ? disabledClasses : ''}
  `;

  const deleteButtonClasses = `
    bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded-lg px-4 py-2 flex items-center gap-2 transition-colors w-fit
    ${!hasAccess ? disabledClasses : ''}
  `;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Button
            className="text-[#0D4690] hover:text-blue-800 cursor-pointer flex items-center gap-1 mb-2 transition-colors pl-0"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} /> Kembali
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Perjanjian Kerjasama (SPK)
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={!hasAccess}
            className={updateButtonClasses}
            onClick={() => setIsUpdateModalOpen(true)}
          >
            <Edit size={16} /> Perbarui Data
          </Button>
          <Button
            disabled={!hasAccess}
            className={deleteButtonClasses}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Hapus
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information - Left Column (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Building2 size={20} className="text-[#0D4690]" /> Informasi Instansi & Kerjasama
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nama Instansi" value={data?.instituteName} />
              <InfoItem label="Jenis Instansi" value={data?.instituteTypeName} />
              <InfoItem label="Divisi Instansi" value={data?.institutionDivision} />

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status Kerjasama</p>
                <Label label={data?.spkPartnershipStatus || 'Draft'} status="success" />
              </div>

              <div className="col-span-full">
                <InfoItem icon={FileText} label="Detail Kerjasama" value={data?.spkDetailPartnership} />
              </div>
            </div>
          </div>

          {/* Parties Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Users size={20} className="text-[#0D4690]" /> Pihak Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nama Pihak BCF" value={data?.spkNameOfBcf} />
              <InfoItem label="Nama Pihak Mitra" value={data?.spkNameOfPartner} />
            </div>
          </div>
        </div>

        {/* Sidebar - Dates & Docs */}
        <div className="space-y-6">
          {/* Timeline Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Calendar size={20} className="text-[#0D4690]" /> Timeline
            </h2>
            <div className="space-y-4">
              <InfoItem label="Tanggal Tanda Tangan" value={data?.spkSignatureDate} />
              <InfoItem label="Jangka Waktu (Tahun)" value={data?.spkTimePeriod ? `${data.spkTimePeriod} Tahun` : '-'} />
              <InfoItem label="Tanggal Jatuh Tempo" value={data?.spkDueDate} />
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FileText size={20} className="text-[#0D4690]" /> Dokumen
            </h2>
            {data?.spkDocumentUrl ? (
              <a
                href={data.spkDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
              >
                <div className="bg-white p-2 rounded-md shadow-sm text-[#0D4690]">
                  <FileText size={20} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-[#0D4690] mb-1 group-hover:underline flex items-center gap-1">
                    Buka Dokumen <ExternalLink size={12} />
                  </p>
                  <p className="text-xs text-gray-500 truncate">{data.spkDocumentUrl}</p>
                </div>
              </a>
            ) : (
              <p className="text-sm text-gray-500 italic">Tidak ada dokumen terlampir.</p>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          dispatch(asyncDeleteSpkById({ id }));
          navigate('/dashboard/partnerships/spk');
        }}
        title="Hapus SPK"
        confirmLabel="Hapus"
        isDanger={true}
      />
      <UpdateSpkModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        initialData={data}
        onSuccess={() => dispatch(asyncGetSpkById({ id }))}
      />
    </div >
  );
}
