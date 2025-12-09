import React, { useEffect } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft, Building2, User, FileText, Calendar, Users, Briefcase, ExternalLink, Edit } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncGetImplementationAgreementById } from '../../../../states/features/partnerships/ia/iaThunks';
import { selectIADetail } from '../../../../states/features/partnerships/ia/iaSelectors';

export default function IaDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetImplementationAgreementById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectIADetail);

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
        {Icon && <Icon size={14} />} {label}
      </p>
      <p className="text-sm font-medium text-gray-900 break-words">{value || '-'}</p>
    </div>
  );

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
        <Button
          className="bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer rounded-lg px-4 py-2 flex items-center gap-2 transition-colors w-fit"
        >
          <Edit size={16} /> Perbarui Data
        </Button>
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
    </div>
  );
}
