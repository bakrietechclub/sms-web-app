import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncGetLetterById } from '../../../states/features/letter/letterThunks';
import { selectLetterDetail } from '../../../states/features/letter/letterSelectors';
import { Button } from '../../elements/Button';
import { ChevronLeft } from 'lucide-react';

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

  return (
    <div>
      <Button
        className={'text-[#0D4690] cursor-pointer flex items-center gap-1'}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} /> Kembali
      </Button>

      <h1 className="text-2xl font-semibold my-4">Data Lengkap Nomor Surat</h1>

      <div className="flex justify-end">
        <Button
          className={
            'bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2'
          }
        >
          Perbarui
        </Button>
      </div>

      {/* Detail utama */}
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Nomor Surat:</p>
          <p>{data?.letterReferenceNumber || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Tanggal Nomor Surat:</p>
          <p>{data?.letterNumberDate || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Tujuan:</p>
          <p>{data?.letterNumberSubjectOfLetter || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Tipe:</p>
          <p>{data?.letterNumberType || '-'}</p>
        </div>
      </div>

      {/* Reference PKS */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Referensi Dokumen Terkait
        </h2>
        {data?.referenceDocument ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-[#0D4690]">
                <tr>
                  {[
                    'Jenis Kerjasama',
                    'Tahun Tanda Tangan',
                    'Jangka Waktu',
                    'Jatuh Tempo',
                    'Aksi',
                  ].map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data?.referenceDocument?.documentTypeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data?.referenceDocument?.documentSignatureDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data?.referenceDocument?.docuemntTimePeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data?.referenceDocument?.documentDueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      className="text-[#0D4690] underline cursor-pointer"
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
          <p className="text-gray-500 italic">
            Tidak ada Dokumen yang terhubung dengan Nomor Surat ini.
          </p>
        )}
      </div>
    </div>
  );
}
