import React, { useEffect, useState } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft, Building2, User, FileText, Calendar, Users, Briefcase, ExternalLink, Edit } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncGetImplementationAgreementById, asyncDeleteImplementationAgreementById } from '../../../../states/features/partnerships/ia/iaThunks';
import { selectIADetail, selectIALoading } from '../../../../states/features/partnerships/ia/iaSelectors';
import ConfirmationModal from '../../../fragments/ConfirmationModal';
import UpdateIaModal from '../../../fragments/UpdateIaModal';
import { selectHasAccess } from '../../../../states/features/auth/authSelectors';
import { getButtonClasses } from '../../../../utils/styleConstants';

export default function IaDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const hasAccess = useSelector(selectHasAccess);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetImplementationAgreementById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectIADetail);
  const loading = useSelector(selectIALoading);

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

          {/* Sidebar - Documents */}
          <div className="space-y-6">
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

  const updateButtonClasses = `${getButtonClasses('primary', !hasAccess)} w-fit`;
  const deleteButtonClasses = `${getButtonClasses('danger', !hasAccess)} w-fit flex items-center gap-2`;

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
            Detail Implementasi Agreement (IA)
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
              <Building2 size={20} className="text-[#0D4690]" /> Informasi Instansi & Program
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nama Instansi" value={data?.instituteName} />
              <InfoItem label="Jenis Instansi" value={data?.instituteTypeName} />
              <InfoItem label="Divisi Instansi" value={data?.institutionDivision} />
              <InfoItem icon={Calendar} label="Tahun Implemenasi" value={data?.iaYearOfImplementations} />

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
                <InfoItem icon={Briefcase} label="Program Kerjasama" value={data?.programName} />
                <InfoItem icon={Users} label="Batch Program" value={data?.batchName} />
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status Kerjasama</p>
                <Label label={data?.iaPartnershipStatusName || 'Draft'} status="success" />
              </div>
            </div>
          </div>

          {/* Parties & Letters Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FileText size={20} className="text-[#0D4690]" /> Pihak & Surat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nama Pihak BCF" value={data?.iaNameOfBcf} />
              <InfoItem label="Nama Pihak Mitra" value={data?.iaNameOfPartner} />
              <InfoItem label="Nomor Surat BCF" value={data?.LetterReferenceNumber} />
              <InfoItem label="Nomor Surat Mitra" value={data?.iaLetterNumberPartner} />
            </div>
          </div>
        </div>

        {/* Sidebar - Documents */}
        <div className="space-y-6">
          {/* Documents Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FileText size={20} className="text-[#0D4690]" /> Dokumen
            </h2>
            {data?.iaDocumentUrl ? (
              <a
                href={data.iaDocumentUrl}
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
                  <p className="text-xs text-gray-500 truncate">{data.iaDocumentUrl}</p>
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
          dispatch(asyncDeleteImplementationAgreementById({ id }));
          navigate('/dashboard/partnerships/implementation-agreements');
        }}
        title="Hapus IA"
        message={`Apakah Anda yakin ingin menghapus data IA dengan "${data?.instituteName}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        isDanger={true}
      />
      <UpdateIaModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        initialData={data}
        onSuccess={() => dispatch(asyncGetImplementationAgreementById({ id }))}
      />
    </div>
  );
}
