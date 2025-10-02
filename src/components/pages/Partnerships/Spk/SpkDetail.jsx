import React, { useEffect } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpkDetail } from '../../../../states/features/partnerships/spk/spkSelectors';
import { asyncGetSpkById } from '../../../../states/features/partnerships/spk/spkThunks';

export default function SpkDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetSpkById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectSpkDetail);

  return (
    <div>
      <Button
        className="text-[#0D4690] cursor-pointer flex"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold">Data Lengkap SPK</h1>
      <div className="flex justify-end">
        <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
          Perbarui
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Nama Universitas:</p>
          <p className="ml-2">{data?.instituteName}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi:</p>
          <p className="ml-2">{data?.instituteTypeName}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="ml-2">{data?.institutionDivision}</p>
        </div>
        <div>
          <p className="font-semibold">Status PKS:</p>
          <Label label={'CLP'} status="warning" />
        </div>
        <div>
          <p className="font-semibold">Detail Kerjasama:</p>
          <p className="ml-2">{data?.spkDetailPartnership}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Status:</p>
          <Label label={data?.spkPartnershipStatus} />
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Jatuh Tempo:</p>
          <p className="">{data?.spkDueDate}</p>
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Tanda Tangan:</p>
          <p className="">{data?.spkSignatureDate}</p>
        </div>
        <div className="">
          <p className="font-semibold">Link Dokumentasi:</p>
          <a
            href={data?.spkDocumentUrl}
            className="text-[#0D4690] italic underline"
          >
            {data?.spkDocumentUrl}
          </a>
        </div>
        <div className="">
          <p className="font-semibold">Jangka Waktu:</p>
          <p className="">{data?.spkTimePeriod}</p>
        </div>
      </div>
    </div>
  );
}
