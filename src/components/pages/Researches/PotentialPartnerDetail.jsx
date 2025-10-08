import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetResearchPotentialById } from '../../../states/features/research/potential/potentialThunks';
import { selectPotentialDetail } from '../../../states/features/research/potential/potentialSelectors';

export default function PotentialPartnerDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector(selectPotentialDetail);

  useEffect(() => {
    dispatch(asyncGetResearchPotentialById({ id }));
  }, []);

  const [showDetail, setShowDetail] = useState(false);
  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div>
      <Button
        className={'text-[#0D4690] cursor-pointer flex'}
        onClick={() => {
          handleClickDetail();
        }}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold mt-4">
        Data Lengkap{' '}
        {data?.instituteName.toLowerCase().includes('universitas')
          ? 'Universitas'
          : 'Lembaga Sosial/Komunitas'}
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
        <div className="">
          <p className="font-semibold">Nama Lembaga/Komunitas:</p>
          <p className="ml-2">{data?.instituteName}</p>
        </div>
        <div className="">
          <p className="font-semibold">Program LSD:</p>
          <p className="ml-2">{data?.partnershipResearchProgram?.join(', ')}</p>
        </div>
        <div className="">
          <p className="ml-2">
            <p className="font-semibold">Region:</p>
            {data?.partnershipResearchProvincies?.map((value, key) => (
              <p className="ml-2">
                {value.provincieName} - {value.regencieName}
              </p>
            ))}
          </p>
        </div>
        <div className="">
          <p className="font-semibold">Status Audiensi:</p>
          <Label
            label={data?.contactStatus}
            status={
              data?.contactStatus === 'Sudah dikontak' ? 'success' : 'danger'
            }
          />
        </div>
        {data?.instituteName &&
          !data?.instituteName.toLowerCase().includes('universitas') && (
            <>
              <div className="">
                <p className="font-semibold">Cluster:</p>
                {/* <p className="ml-2">{selected.cluster}</p> */}
              </div>
              <div className="">
                <p className="font-semibold">Sub-cluster:</p>
                {/* <p className="ml-2">{selected.subCluster}</p> */}
              </div>
              <div className="">
                <p className="font-semibold">Peran:</p>
                {/* <p className="ml-2">{selected.role}</p> */}
              </div>
            </>
          )}
      </div>

      <p className="font-semibold mb-3">Kontak</p>
      <div className="border rounded-2xl p-6 mb-7 shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-4">Kontak</h2>
        <dl className="grid grid-cols-3 gap-y-4 text-sm">
          {/* Nama */}
          <dt className="font-medium text-gray-700">Nama</dt>
          <dd className="col-span-2">{data?.contactName || '-'}</dd>

          {/* Telepon */}
          <dt className="font-medium text-gray-700">No. Telepon</dt>
          <dd className="col-span-2 flex items-center gap-3">
            {data?.contactPhoneNumber || '-'}
            {data?.contactPhoneNumber && (
              <a
                href={`https://wa.me/${data?.contactPhoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Kirim Pesan
              </a>
            )}
          </dd>

          {/* Jabatan */}
          <dt className="font-medium text-gray-700">Jabatan</dt>
          <dd className="col-span-2">{data?.contactPosition || '-'}</dd>

          {/* Email */}
          <dt className="font-medium text-gray-700">Email</dt>
          <dd className="col-span-2 flex items-center gap-3">
            {data?.contactEmail || '-'}
            {data?.contactEmail && (
              <a
                href={`mailto:${data?.contactEmail}`}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Kirim Email
              </a>
            )}
          </dd>
        </dl>
      </div>

      <div className="grid grid-cols-1 gap-y-7 mb-7">
        <div className="">
          <p className="font-semibold">Profil:</p>
          {/* <p className="ml-2">{selected.profil}</p> */}
        </div>
        <div className="">
          <p className="font-semibold">Kebutuhan:</p>
          <p className="ml-2">{data?.partnershipResearchNeeds?.join(', ')}</p>
        </div>
      </div>
      <p className="font-semibold mb-3">Analisis Program</p>
      <div className="border rounded-2xl p-3 mb-7">
        <div className="mb-7">
          <p className="font-semibold">Strengths:</p>
          <p className="ml-2">{data?.analysisStrenghts}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Weakness:</p>
          <p className="ml-2">{data?.analysisWeakness}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Opportunities:</p>
          <p className="ml-2">{data?.analysisOpportunities}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Challenges:</p>
          <p className="ml-2">{data?.analysisChallenge}</p>
        </div>
      </div>
      <div className="">
        <p className="font-semibold">Link Dokumen:</p>
        <a
          href={`https://${data?.urlDocument}`}
          target="_blank"
          className="ml-2 underline text-[#0D4690]"
        >
          {data?.urlDocument}
        </a>
      </div>
    </div>
  );
}
