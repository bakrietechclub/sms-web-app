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
        className={'text-[#0D4690] cursor-pointer flex'}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Kembali
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
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div className="">
          <p className="font-semibold">Nama Instansi:</p>
          <p className="">{data?.mouPartnerName}</p>
        </div>
        <div className="">
          <p className="font-semibold">Jenis Instansi</p>
          <p className="">{data?.jenis}</p>
        </div>
        <div className="">
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="">{data?.division}</p>
        </div>
        <div className="">
          <p className="font-semibold">Program Kerjasama:</p>
          <p className="">-</p>
        </div>
        <div className="">
          <p className="font-semibold">Detail Kerjasama:</p>
          <p className="">{data?.mouPartnershipDetail}</p>
        </div>
        <div className="">
          <p className="font-semibold">Status:</p>
          <p className="">
            <Label label={data?.statusPartnership} status={''} />
          </p>
        </div>
        <div className="">
          <p className="font-semibold">Nomor Surat BCF:</p>
          <p className="">{data?.mouPartnerLetterNumber}</p>
        </div>
        <div className="">
          <p className="font-semibold">Nomor Surat Mitra:</p>
          <p className="">-</p>
        </div>
        <div className="">
          <p className="font-semibold">Nama Pihak BCF:</p>
          <p className="">{data?.mouBcfName}</p>
        </div>
        <div className="">
          <p className="font-semibold">Nama Pihak Mitra:</p>
          <p className="">{data?.mouPartnerName}</p>
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Tanda Tangan:</p>
          <p className="">{data?.mouSignatureDate}</p>
        </div>
        <div className="">
          <p className="font-semibold">Jangka Waktu:</p>
          <p className="">{data?.mouTimePeriod}</p>
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Jatuh Tempo:</p>
          <p className="">{data?.mouDueDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-5 mb-5">
        <div className="">
          <p className="font-semibold">Link Dokumen:</p>
          <a
            href={data?.mouDocumentUrl}
            className="text-[#0D4690] italic underline"
            target="_blank"
          >
            {data?.mouDocumentUrl}
          </a>
        </div>
        <div className="">
          <p className="font-semibold">Catatan Tambahan:</p>
          <p className="">{data?.mouNote}</p>
        </div>
      </div>
    </div>
  );
}
