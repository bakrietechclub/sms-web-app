import React, { useEffect } from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncGetImplementationAgreementById } from '../../../../states/features/partnerships/ia/iaThunks';
import { selectIADetail } from '../../../../states/features/partnerships/ia/iaSelectors';

export default function IaDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetImplementationAgreementById({ id }));
  }, [dispatch, id]);

  const data = useSelector(selectIADetail);

  return (
    <div>
      <Button
        className={'text-[#0D4690] cursor-pointer flex'}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold mt-4">Data Lengkap IA</h1>
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
          <p className="font-semibold">Nama Instansi:</p>
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
          <p className="font-semibold">Status Kerjasama:</p>
          <Label label={data?.iaPartnershipStatusName} status="success" />
        </div>
        <div>
          <p className="font-semibold">Tahun Implementasi Kerjasama:</p>
          <p className="ml-2">{data?.iaYearOfImplementations}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">Program Kerjasama:</p>
          <p className="ml-2">{data?.programName}</p>
        </div>
        <div>
          <p className="font-semibold">Batch Program:</p>
          <p className="ml-2">{data?.batchName}</p>
        </div>
        <div>
          <p className="font-semibold">Nomor Surat BCF:</p>
          <p>{data?.LetterReferenceNumber}</p>
        </div>
        <div>
          <p className="font-semibold">Nomor Surat Mitra:</p>
          <p>{data?.iaLetterNumberPartner}</p>
        </div>
        <div>
          <p className="font-semibold">Nama Pihak BCF:</p>
          <p>{data?.iaNameOfBcf}</p>
        </div>
        <div>
          <p className="font-semibold">Nama Pihak Mitra:</p>
          <p>{data?.iaNameOfPartner}</p>
        </div>
        <div>
          <p className="font-semibold">Link File IA:</p>
          <a
            href={data?.iaDocumentUrl}
            className="text-[#0d4690] underline cursor-pointer"
          >
            {data?.iaDocumentUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
