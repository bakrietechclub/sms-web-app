import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncGetLetterById } from '../../../states/features/letter/letterThunks';
import { selectLetterDetail } from '../../../states/features/letter/letterSelectors';
import { Button } from '../../elements/Button';
import { ChevronLeft, Mail, Calendar, FileText, Link as LinkIcon, Edit } from 'lucide-react';

export default function LetterNumberingDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetLetterById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectLetterDetail);

  const handleNavigate = (doc) => {
    if (!doc?.documentTypeName || !doc?.documentId) return;

    // Mapping tipe dokumen ke path route
    const routeMap = {
      'PKS (Perjanjian Kerjasama)': `/dashboard/partnerships/pks/${doc.documentId}`,
      'MoU (Nota Kesepahaman)': `/dashboard/partnerships/mou/${doc.documentId}`,
      'IA (Implementation Agreement)': `/dashboard/partnerships/ia/${doc.documentId}`,
      'SPK (Surat Pernyataan Komitmen)': `/dashboard/partnerships/spk/${doc.documentId}`,
      // tambahkan sesuai tipe dokumen lain
    };

    const path =
      routeMap[doc.documentTypeName] ||
      `/dashboard/partnerships/documents/${doc.documentId}`; // default fallback

    navigate(path);
  };

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
            Detail Nomor Surat
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
              <Mail size={20} className="text-[#0D4690]" /> Informasi Surat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nomor Surat" value={data?.letterReferenceNumber} />
              <InfoItem label="Tipe Surat" value={data?.letterNumberType} />
              <InfoItem icon={Calendar} label="Tanggal Nomor Surat" value={data?.letterNumberDate} />
              <div className="col-span-full">
                <InfoItem icon={FileText} label="Perihal / Tujuan" value={data?.letterNumberSubjectOfLetter} />
              </div>
            </div>
          </div>

          {/* Reference Document Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <LinkIcon size={20} className="text-[#0D4690]" /> Referensi Dokumen Terkait
            </h2>

            {data?.referenceDocument ? (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kerjasama</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Tanda Tangan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jangka Waktu</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jatuh Tempo</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{data?.referenceDocument?.documentTypeName || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{data?.referenceDocument?.documentSignatureDate || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{data?.referenceDocument?.docuemntTimePeriod || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{data?.referenceDocument?.documentDueDate || '-'}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          className="text-[#0D4690] hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
                          onClick={() => handleNavigate(data?.referenceDocument)}
                        >
                          Lihat Detail
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">Tidak ada Dokumen yang terhubung dengan Nomor Surat ini.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Space - Can be used for future metadata, or kept for grid consistency */}
        <div className="space-y-6">
          {/* Example of empty sidebar or relevant helpful info could go here if needed. 
              For now keeping it matching the layout structure. */}
        </div>
      </div>
    </div>
  );
}
