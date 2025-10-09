import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAudienceDetail } from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudienceById } from '../../../states/features/audience/audienceThunks';
import { Label } from '../../elements/Label';

export default function AudiencesDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const data = useSelector(selectAudienceDetail);

  console.log(data);

  useEffect(() => {
    dispatch(asyncGetAudienceById({ id }));
  }, [id]);

  return (
    <div>
      <Button
        className="text-[#0D4690] cursor-pointer flex"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold mt-4">Data Lengkap Audiensi</h1>
      <div className="grid grid-cols-2 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">Nama Instansi:</p>
          <p className="ml-2">{data?.instituteName}</p>
        </div>
        <div>
          <p className="font-semibold">Tanggal:</p>
          <p className="ml-2">{data?.audiencesDate}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi:</p>
          <p className="ml-2">{data?.instituteDivision}</p>
        </div>
        <div>
          <p className="font-semibold">Jam:</p>
          <p className="ml-2">{data?.audiencesTime}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">Jenis Audiensi:</p>
          <Label
            label={data?.audiencesType ? 'Online' : 'Offline'}
            status={data?.audiencesType === 'Online' ? 'info' : 'white'}
          />
        </div>
        <div>
          <p className="font-semibold">Status Audiensi:</p>
          <Label
            label={data?.audiencesStatus}
            status={
              data?.audiencesStatus === 'Re-audiensi'
                ? 'warning'
                : data?.audiencesStatus === 'Selesai'
                ? 'success'
                : 'danger'
            }
          />
        </div>
      </div>
      <div className="mb-7">
        <p className="font-semibold">Tempat Audiensi:</p>
        <p className="ml-2">{data?.audiencesLocation}</p>
      </div>
      <div className="mb-7">
        <p className="font-semibold">Link Dokumentasi:</p>
        <a
          href={data?.documentUrl}
          className="ml-2 text-[#0D4690] italic underline"
        >
          {data?.documentUrl}
        </a>
      </div>
      <div className="mb-7">
        <p className="font-semibold">Catatan Tambahan:</p>
        <p className="ml-2">{data?.audiencesNote}</p>
      </div>
    </div>
  );
}
