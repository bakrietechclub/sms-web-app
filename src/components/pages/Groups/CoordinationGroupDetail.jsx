import React, { useEffect, useState } from 'react';
import { Button } from '../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../elements/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroupDetail } from '../../../states/features/group/groupSelectors';
import { asyncGetGroupById } from '../../../states/features/group/groupThunks';
import AddCoorGroupContactModal from '../../fragments/AddCoorGroupContactModal';

export default function CoordinationGroupDetail() {
  const dispatch = useDispatch();
  const nagigate = useNavigate();

  const { id } = useParams();
  const data = useSelector(selectGroupDetail);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(asyncGetGroupById({ id }));
  }, [dispatch, id]);

  return (
    <div>
      <Button
        className={'text-[#0D4690] cursor-pointer flex'}
        onClick={() => nagigate(-1)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold mt-4">
        Data Lengkap Grup Koordinasi
      </h1>
      <div className="flex justify-end">
        <Button className="bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2">
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
          <p className="ml-2">{data?.parnershipResearchType}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="ml-2">{data?.division}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">Link Grup:</p>
          <a
            href={data?.groupUrl}
            className="ml-2 text-[#0D4690] italic underline"
          >
            {data?.groupUrl}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-7 mb-7">
        <div>
          <p className="font-semibold">Kontak</p>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => setOpenModal(true)}
            className="bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
          >
            Tambah Kontak
          </Button>
        </div>
      </div>

      <table className="table-auto text-center w-full">
        <thead className="text-[#0D4690] bg-[#E7EDF4]">
          <tr className="h-10 text-base font-semibold">
            <th className="rounded-tl-xl">No.</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>No. Hp</th>
            <th>Email</th>
            <th>Status</th>
            <th>Status Aktif</th>
            <th className="rounded-tr-xl">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-base border-l border-r border-[#E7EDF4]">
          {data?.contacts?.map((item, index) => (
            <tr key={index} className="border-b border-[#E7EDF4] h-10">
              <td className="py-3">{index + 1}</td>
              <td>{item?.contactName}</td>
              <td>{item?.contactPosition}</td>
              <td className="text-[#0d4690]">{item?.contactPhoneNumber}</td>
              <td className="text-[#0d4690]">{item?.contactEmail}</td>
              <td>
                <Label
                  label={
                    item?.contactStatusJoined ? 'Join Grup' : 'Belum Join Grup'
                  }
                  status={item?.contactStatusJoined ? 'success' : 'danger'}
                />
              </td>
              <td>
                <Label
                  label={item?.contactStatusActive ? 'Aktif' : 'Tidak Aktif'}
                  status={item?.contactStatusActive ? 'success' : 'danger'}
                />
              </td>
              <td className="text-[#0D4690] underline">
                <a>Edit Data</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddCoorGroupContactModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
