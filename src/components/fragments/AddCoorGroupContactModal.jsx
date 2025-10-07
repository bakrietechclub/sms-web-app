import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '../elements/formfields/TextField';
import { useForm } from 'react-hook-form';
import { asyncAddContact } from '../../states/features/group/contact/contactThunks';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';

export default function AddCoorGroupContactModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      groupId: id,
      contactFullName: '',
      contactPosition: '',
      contactPhoneNumber: '',
      contactEmail: '',
      contactStatusJoined: null,
      contactStatusActive: null,
    },
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddContact(data))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] rounded-2xl shadow-xl overflow-hidden flex flex-col px-5 py-7"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Tambah Kontak Grup Koordinasi
            </h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4"
          >
            <TextField
              name="contactFullName"
              label="Nama"
              placeholder="Masukkan Nama"
              register={register}
            />

            <TextField
              name="contactPosition"
              label="Jabatan"
              placeholder="Masukkan Jabatan"
              register={register}
            />

            <TextField
              name="contactPhoneNumber"
              label="No. Handphone"
              placeholder="Masukkan No. Handphone"
              register={register}
            />

            <TextField
              name="contactEmail"
              label="Email"
              placeholder="Masukkan Email"
              register={register}
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <SingleSelectDropdownBadge
                  name="contactStatusJoined"
                  label="Pilih Status"
                  options={[
                    { id: 1, label: 'Join Grup' },
                    { id: 0, label: 'Belum Join Grup' },
                  ]}
                  register={register}
                  setValue={setValue}
                />
              </div>

              <div className="flex-1">
                <SingleSelectDropdownBadge
                  name="contactStatusActive"
                  label="Pilih Status Aktif"
                  options={[
                    { id: 1, label: 'Aktif' },
                    { id: 0, label: 'Tidak Aktif' },
                  ]}
                  register={register}
                  setValue={setValue}
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82] ml-auto mt-4"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
