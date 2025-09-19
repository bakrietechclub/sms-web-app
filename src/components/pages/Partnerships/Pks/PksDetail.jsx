import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../elements/Button';
import { Label } from '../../../elements/Label';
import { ChevronLeft } from 'lucide-react';
import { asyncGetPksById } from '../../../../states/features/partnerships/pks/pksThunks';
import { selectPksDetail } from '../../../../states/features/partnerships/pks/pksSelectors';

export default function PksDetail() {
  const nagigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetPksById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectPksDetail);

  console.log(data);

  return (
    <div>
      <Button
        className="text-[#0D4690] cursor-pointer flex"
        onClick={() => nagigate(-1)}
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
          <p>-</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <Label label={'Sudah Diperiksa oleh Mitra'} status={''} />
        </div>
        <div>
          <p className="font-semibold">Nomor Surat BCF:</p>
          <p>{data?.pksPartnerLetterNumber}</p>
        </div>
        <div>
          <p className="font-semibold">Nomor Surat Mitra:</p>
          <p>-</p>
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
    </div>
  );
}
