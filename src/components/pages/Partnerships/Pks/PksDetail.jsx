import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../elements/Button';
import { Label } from '../../../elements/Label';
import { ChevronLeft } from 'lucide-react';
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

  return (
    <div>
      <Button
        className="text-[#0D4690] cursor-pointer flex"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold mt-4">Data Lengkap PKS</h1>
      <div className="flex justify-end">
        <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
          Perbarui
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Nama Instansi:</p>
          <p>{data?.name}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi</p>
          <p>{data?.jenis}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p>{data?.pksInstituteDivision}</p>
        </div>
        <div>
          <p className="font-semibold">Program Kerjasama:</p>
          <p>-</p>
        </div>
        <div>
          <p className="font-semibold">Detail Kerjasama:</p>
          <p>{data?.pksDetailPartnership || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <Label label={'Sudah Diperiksa oleh Mitra'} status={''} />
        </div>
        <div>
          <p className="font-semibold">Nomor Surat BCF:</p>
          <p>{data?.pksLetterNumberReference || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Nomor Surat Mitra:</p>
          <p>{data?.pksPartnerLetterNumber || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Nama Pihak BCF:</p>
          <p>{data?.pksNameofBcf}</p>
        </div>
        <div>
          <p className="font-semibold">Nama Pihak Mitra:</p>
          <p>{data?.pksNameOfPartner}</p>
        </div>
        <div>
          <p className="font-semibold">Tanggal Tanda Tangan:</p>
          <p>{data?.pksSignatureDate}</p>
        </div>
        <div>
          <p className="font-semibold">Jangka Waktu:</p>
          <p>{data?.pksTimePeriod}</p>
        </div>
        <div>
          <p className="font-semibold">Tanggal Jatuh Tempo:</p>
          <p>{data?.pksDueDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Link Dokumen:</p>
          <a
            href={data?.pksDocumentUrl}
            target="_blank"
            className="text-[#0D4690] italic underline"
          >
            Link Dokumen PKS
          </a>
        </div>
        <div>
          <p className="font-semibold">Catatan Tambahan:</p>
          <p>{data?.pksNote}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Referensi Implementasi Agreement (IA) Terkait
        </h2>
        {data?.referenceIa && data.referenceIa.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-[#0D4690]">
                <tr>
                  {['Status Kerjasama', 'Tahun Implementasi', 'Aksi'].map(
                    (header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.referenceIa.map((value, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.iaPartnershipStatusName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.iaYearOfImplementations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        className="text-[#0D4690] underline cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/partnerships/implementation-agreements/${value.iaId}`
                          )
                        }
                      >
                        Lihat Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Tidak ada IA yang terhubung dengan PKS ini.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Referensi Term of Reference (ToR) Terkait
        </h2>
        {data?.referenceTor && data.referenceTor.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-[#0D4690]">
                <tr>
                  {[
                    'Status Kerjasama',
                    'Tanggal Tanda Tangan',
                    'Jangka Kerjasama',
                    'Tanggal Jatuh Tempo',
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
                {data.referenceTor.map((value, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.torPartnershipStatusName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.torSignatureDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.torTimePeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.torDueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        className="text-[#0D4690] underline cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/partnerships/tor/${value.torId}`)
                        }
                      >
                        Lihat Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Tidak ada ToR yang terhubung dengan PKS ini.
          </p>
        )}
      </div>
    </div>
  );
}
