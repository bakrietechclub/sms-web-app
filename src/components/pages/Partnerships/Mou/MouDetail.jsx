import React, { useEffect } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetMouById } from '../../../../states/features/partnerships/mou/mouThunks';
import { selectMouDetail } from '../../../../states/features/partnerships/mou/mouSelectors';

export default function MouDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const data = useSelector(selectMouDetail);

  useEffect(() => {
    dispatch(asyncGetMouById({ id }));
  }, [dispatch, id]);

  return (
    <div>
      <Button
        className={'text-[#0D4690] cursor-pointer flex items-center gap-1'}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} /> Kembali
      </Button>

      <h1 className="text-2xl font-semibold my-4">Data Lengkap MoU</h1>

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
          <p className="font-semibold">Nama Instansi:</p>
          <p>{data?.instituteName || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi:</p>
          <p>{data?.jenis || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p>{data?.division || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Program Kerjasama:</p>
          <p>-</p>
        </div>
        <div>
          <p className="font-semibold">Detail Kerjasama:</p>
          <p>{data?.mouPartnershipDetail || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <Label label={data?.statusPartnership} status={''} />
        </div>
        <div>
          <p className="font-semibold">Nomor Surat BCF:</p>
          <p>-</p>
        </div>
        <div>
          <p className="font-semibold">Nomor Surat Mitra:</p>
          <p>{data?.mouPartnerLetterNumber || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Nama Pihak BCF:</p>
          <p>{data?.mouBcfName || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Nama Pihak Mitra:</p>
          <p>{data?.mouPartnerName || '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Tanggal Tanda Tangan:</p>
          <p>{data?.mouSignatureDate}</p>
        </div>
        <div>
          <p className="font-semibold">Jangka Waktu:</p>
          <p>{data?.mouTimePeriod ? `${data.mouTimePeriod} tahun` : '-'}</p>
        </div>
        <div>
          <p className="font-semibold">Tanggal Jatuh Tempo:</p>
          <p>{data?.mouDueDate}</p>
        </div>
      </div>

      {/* Dokumen & catatan */}
      <div className="grid grid-cols-1 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Link Dokumen:</p>
          {data?.mouDocumentUrl ? (
            <a
              href={data.mouDocumentUrl}
              className="text-[#0D4690] italic underline"
              target="_blank"
              rel="noreferrer"
            >
              {data.mouDocumentUrl}
            </a>
          ) : (
            <p>-</p>
          )}
        </div>
        <div>
          <p className="font-semibold">Catatan Tambahan:</p>
          <p>{data?.mouNote || '-'}</p>
        </div>
      </div>

      {/* Reference PKS */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Referensi PKS Terkait
        </h2>
        {data?.referencePks && data.referencePks.length > 0 ? (
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
                {data.referencePks.map((pks, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {pks.typePartnership}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {pks.pksSignatureDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {pks.pksTimePeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {pks.pksDueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        className="text-[#0D4690] underline cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/partnerships/pks/${pks.pksId}`)
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
            Tidak ada PKS yang terhubung dengan MoU ini.
          </p>
        )}
      </div>
    </div>
  );
}
