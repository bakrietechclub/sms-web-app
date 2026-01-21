import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft, Building2, Calendar, Clock, MapPin, FileText, ExternalLink, StickyNote, Edit } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudienceDetail, selectAudienceLoading } from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudienceById } from '../../../states/features/audience/audienceThunks';
import { Label } from '../../elements/Label';
import ConfirmationModal from '../../fragments/ConfirmationModal';
import UpdateAudienceModal from '../../fragments/UpdateAudienceModal';
import { asyncDeleteAudienceById } from '../../../states/features/audience/audienceThunks';
import { selectHasAccess } from '../../../states/features/auth/authSelectors';
import { getButtonClasses } from '../../../utils/styleConstants';

export default function AudiencesDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const data = useSelector(selectAudienceDetail);
  const hasAccess = useSelector(selectHasAccess);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetAudienceById({ id }));
  }, [dispatch, id]);

  const loading = useSelector(selectAudienceLoading);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-8 w-48 bg-gray-200 rounded" />
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

        {/* Location Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="h-6 w-48 bg-gray-200 rounded mb-3" />
          <div className="h-5 w-full bg-gray-200 rounded" />
        </div>

        {/* Link Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* Notes Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="h-6 w-48 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  const updateButtonClasses = getButtonClasses('primary', !hasAccess);
  const deleteButtonClasses = getButtonClasses('danger', !hasAccess);

  const handleUpdateSuccess = () => {
    dispatch(asyncGetAudienceById({ id }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="mb-4">
        <Button
          className="text-[#0D4690] hover:text-blue-800 cursor-pointer flex items-center gap-1 mb-3 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} /> Kembali
        </Button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Audiensi
          </h1>
          <div className="flex gap-2">
            <Button
              disabled={!hasAccess}
              className={updateButtonClasses}
              onClick={() => setIsUpdateModalOpen(true)}
            >
              <Edit size={16} /> Perbarui
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
      </div>

      {/* Main Information Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Building2 size={14} /> Nama Instansi
            </p>
            <p className="text-sm font-semibold text-gray-900">{data?.instituteName || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Jenis Instansi</p>
            <p className="text-sm text-gray-900">{data?.instituteDivision || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Calendar size={14} /> Tanggal Audiensi
            </p>
            <p className="text-sm text-gray-900">{data?.audiencesDate || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Clock size={14} /> Jam Audiensi
            </p>
            <p className="text-sm text-gray-900">{data?.audiencesTime || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Jenis Audiensi</p>
            <Label
              label={data?.audiencesType ? 'Online' : 'Offline'}
              status={data?.audiencesType === 'Online' ? 'info' : 'white'}
            />
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status Audiensi</p>
            <Label
              label={data?.audiencesStatus}
              status={
                data?.audiencesStatus === 'Re-audiensi'
                  ? 'warning'
                  : data?.audiencesStatus === 'Selesai'
                    ? 'success'
                    : 'danger'
              }
            />
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <MapPin size={18} /> Tempat Audiensi
        </h2>
        <p className="text-sm text-gray-900">{data?.audiencesLocation || '-'}</p>
      </div>

      {/* Documentation Link Card */}
      {data?.documentUrl && (
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={16} /> Link Dokumentasi
          </h2>
          <a
            href={data.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0D4690] hover:text-blue-800 text-sm underline inline-flex items-center gap-1 break-all"
          >
            {data.documentUrl} <ExternalLink size={14} />
          </a>
        </div>
      )}

      {/* Additional Notes Card */}
      {data?.audiencesNote && (
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <StickyNote size={18} /> Catatan Tambahan
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.audiencesNote}</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          dispatch(asyncDeleteAudienceById({ id }));
          navigate('/dashboard/audiences');
        }}
        title="Hapus Audiensi"
        message={`Apakah Anda yakin ingin menghapus data audiensi dengan "${data?.instituteName}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        isDanger={true}
      />
      <UpdateAudienceModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        id={id}
        initialData={data}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
}
