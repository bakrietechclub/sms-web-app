import React, { useEffect } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetTorById } from '../../../../states/features/partnerships/tor/torThunks';
import { selectTorDetail } from '../../../../states/features/partnerships/tor/torSelectors';

export default function TorDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetTorById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectTorDetail);

  return (
    <div>
      <Button
        className="text-[#0D4690] cursor-pointer flex"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold my-4">Data Lengkap ToR</h1>
      <div className="flex justify-end">
        <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
          Perbarui
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Nama Universitas:</p>
          <p className="ml-2">{data?.instituteName || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi:</p>
          <p className="ml-2">{data?.instituteTypeName || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="ml-2">{data?.institutionDivision || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Detail Kerjasama:</p>
          <p className="ml-2">{data?.torDetailPartnership}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Status:</p>
          <Label label={data?.torPartnershipStatus} />
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Jatuh Tempo:</p>
          <p className="">{data?.torDueDate}</p>
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Tanda Tangan:</p>
          <p className="">{data?.torSignatureDate}</p>
        </div>
        <div className="">
          <p className="font-semibold">Link Dokumentasi:</p>
          <a
            href={data?.torDocumentUrl}
            className="text-[#0D4690] italic underline"
          >
            {data?.torDocumentUrl}
          </a>
        </div>
        <div className="">
          <p className="font-semibold">Jangka Waktu:</p>
          <p className="">{data?.torTimePeriod}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Referensi Surat Perjanjian Kerjasama (SPK) Terkait
        </h2>
        {data?.referenceSpk && data.referenceSpk.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-[#0D4690]">
                <tr>
                  {[
                    'Status Kerjasama',
                    'Tanggal Tanda Tangan',
                    'Jangka Kerjasama',
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
                {data?.referenceSpk?.map((value, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.spkStatusName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.spkSignatureDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.spkTimePeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {value.spkDueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        className="text-[#0D4690] underline cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/partnerships/spk/${value.spkId}`)
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
            Tidak ada SPK yang terhubung dengan ToR ini.
          </p>
        )}
      </div>
    </div>
  );
}
