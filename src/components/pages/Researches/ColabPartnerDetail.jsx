import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetResearchCollabById } from '../../../states/features/research/collab/collabThunks';
import { selectCollabDetail } from '../../../states/features/research/collab/collabSelectors';

export default function ColabPartnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectCollabDetail);

  useEffect(() => {
    dispatch(asyncGetResearchCollabById({ id }));
  }, [dispatch, id]);

  return (
    <div>
      <Button
        className={'text-[#0D4690] cursor-pointer flex'}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold mt-4">
        Data Lengkap Riset Kolaborasi Mitra
      </h1>
      <div className="flex justify-end">
        <Button
          className={
            'bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2'
          }
          // onClick={}
        >
          Perbarui
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">
            Nama{' '}
            {data?.institutionType?.toLowerCase().includes('universitas')
              ? 'Universitas'
              : 'Lembaga Sosial/Komunitas'}
            :
          </p>
          <p className="ml-2">{data?.institutionName}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi:</p>
          <p className="ml-2">{data?.institutionType}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="ml-2">-</p>
        </div>
        <div>
          <p className="font-semibold">Region:</p>
          <p className="ml-2">{data?.institutionRegion}</p>
        </div>
        <div>
          <p className="font-semibold">Program LSD:</p>
          <p className="ml-2">{data?.researchPrograms.join(', ')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">Status Kerjasama:</p>
          <Label label={data?.MoUstatus} status="success" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-7 mb-7">
        <div>
          <p className="font-semibold mb-2">Status MoU</p>
          <div className="grid grid-cols-2 ml-2 gap-y-2">
            <p className="font-semibold">Tanggal TTD</p>
            <p>: {data?.MoUSignatureDate}</p>
            <p className="font-semibold">Jatuh Tempo</p>
            <p>: {data?.MoUDueDate}</p>
            <p className="font-semibold">Link Dokumen</p>
            <p>
              :{' '}
              <a
                href={data?.MouDocumentUrl}
                className="text-[#0D4690] underline cursor-pointer"
              >
                Klik di sini
              </a>
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Status PKS</p>
          <div className="grid grid-cols-2 ml-2 gap-y-2">
            <p className="font-semibold">Tanggal TTD</p>
            <p>: {data?.PkSSignatureDate}</p>
            <p className="font-semibold">Jatuh Tempo</p>
            <p>: {data?.PkSDueDate}</p>
            <p className="font-semibold">Link Dokumen</p>
            <p>
              :{' '}
              <a
                href={data?.PkSDocumentUrl}
                className="text-[#0D4690] underline cursor-pointer"
              >
                Klik di sini
              </a>
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold">Kontak:</p>
          <a href="#" className="text-[#0D4690] underline cursor-pointer ml-2">
            Lihat Detail Kontak
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 mb-7">
        <div>
          <p className="font-semibold">Kebutuhan:</p>
          <p className="ml-2"></p>
        </div>
        <div>
          <p className="font-semibold">Program LSD Rencana Kolaborasi:</p>
          <p className="ml-2">{data?.researchPrograms?.join(', ')}</p>
        </div>
        <div>
          <p className="font-semibold">Detail Rencana Kolaborasi:</p>
          <p className="ml-2">{data?.detail}</p>
        </div>
      </div>
      <p className="font-semibold mb-3">Analisis Program</p>
      <div className="border rounded-2xl p-3 mb-7">
        <div className="mb-7">
          <p className="font-semibold">Strengths:</p>
          <p className="ml-2">{data?.strengths}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Weakness:</p>
          <p className="ml-2">{data?.weakness}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Opportunities:</p>
          <p className="ml-2">{data?.opportunities}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Challenges:</p>
          <p className="ml-2">{data?.challenge}</p>
        </div>
      </div>
    </div>
  );
}
