import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../elements/Button';
import { Label } from '../../../elements/Label';
import { ChevronLeft, Building2, FileText, Calendar, Users, StickyNote, ExternalLink, Link as LinkIcon, Edit, ScrollText } from 'lucide-react';
import { asyncGetPksById } from '../../../../states/features/partnerships/pks/pksThunks';
import { selectPksDetail } from '../../../../states/features/partnerships/pks/pksSelectors';

export default function PksDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetPksById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectPksDetail);

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
            Detail PKS
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
              <Building2 size={20} className="text-[#0D4690]" /> Informasi Instansi & Kerjasama
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nama Instansi" value={data?.name} />
              <InfoItem label="Jenis Instansi" value={data?.jenis} />
              <InfoItem label="Divisi Instansi" value={data?.pksInstituteDivision} />
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status Kemitraan</p>
                <Label label={'Sudah Diperiksa oleh Mitra'} status="success" />
              </div>
              <div className="col-span-full">
                <InfoItem icon={FileText} label="Detail Kerjasama" value={data?.pksDetailPartnership} />
              </div>
            </div>
          </div>

          {/* Letter & Party Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Users size={20} className="text-[#0D4690]" /> Pihak & Surat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Nama Pihak BCF" value={data?.pksNameofBcf} />
              <InfoItem label="Nama Pihak Mitra" value={data?.pksNameOfPartner} />
              <InfoItem label="Nomor Surat BCF" value={data?.pksLetterNumberReference} />
              <InfoItem label="Nomor Surat Mitra" value={data?.pksPartnerLetterNumber} />
            </div>
          </div>

          {/* IA Reference Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <LinkIcon size={20} className="text-[#0D4690]" /> Referensi IA Terkait
            </h2>

            {data?.referenceIa && data.referenceIa.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Implementasi</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.referenceIa.map((value, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{value.iaPartnershipStatusName}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{value.iaYearOfImplementations}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            className="text-[#0D4690] hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
                            onClick={() => navigate(`/dashboard/partnerships/implementation-agreements/${value.iaId}`)}
                          >
                            Lihat
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">Tidak ada IA yang terhubung dengan PKS ini.</p>
              </div>
            )}
          </div>

          {/* TOR Reference Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <ScrollText size={20} className="text-[#0D4690]" /> Referensi ToR Terkait
            </h2>

            {data?.referenceTor && data.referenceTor.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Tanda Tangan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jatuh Tempo</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.referenceTor.map((value, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{value.torPartnershipStatusName}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{value.torSignatureDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{value.torTimePeriod}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{value.torDueDate}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            className="text-[#0D4690] hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
                            onClick={() => navigate(`/dashboard/partnerships/tor/${value.torId}`)}
                          >
                            Lihat
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">Tidak ada ToR yang terhubung dengan PKS ini.</p>
              </div>
            )}
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
              <InfoItem label="Tanggal Tanda Tangan" value={data?.pksSignatureDate} />
              <InfoItem label="Jangka Waktu" value={data?.pksTimePeriod} />
              <InfoItem label="Tanggal Jatuh Tempo" value={data?.pksDueDate} />
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FileText size={20} className="text-[#0D4690]" /> Dokumen
            </h2>
            {data?.pksDocumentUrl ? (
              <a
                href={data.pksDocumentUrl}
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
                  <p className="text-xs text-gray-500 truncate">{data.pksDocumentUrl}</p>
                </div>
              </a>
            ) : (
              <p className="text-sm text-gray-500 italic">Tidak ada dokumen terlampir.</p>
            )}
          </div>

          {/* Notes Card */}
          {data?.pksNote && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <StickyNote size={20} className="text-[#0D4690]" /> Catatan
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed bg-amber-50 p-3 rounded-lg border border-amber-100">
                {data.pksNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
