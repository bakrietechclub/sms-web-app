import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft, Building2, Calendar, Clock, MapPin, FileText, ExternalLink, StickyNote } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudienceDetail } from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudienceById } from '../../../states/features/audience/audienceThunks';
import { Label } from '../../elements/Label';

export default function AudiencesDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const data = useSelector(selectAudienceDetail);

  console.log(data);

  useEffect(() => {
    dispatch(asyncGetAudienceById({ id }));
  }, [id]);

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

        <h1 className="text-2xl font-bold text-gray-800">
          Detail Audiensi
        </h1>
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
    </div>
  );
}
