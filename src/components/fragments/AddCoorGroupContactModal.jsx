import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '../elements/formfields/TextField';
import { useForm } from 'react-hook-form';
import { asyncAddContact } from '../../states/features/group/contact/contactThunks';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { X, Loader2 } from 'lucide-react';

export default function AddCoorGroupContactModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
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

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    try {
      await dispatch(asyncAddContact(data)).unwrap();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 z-40 bg-black opacity-40'
        onClick={onClose}
      />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className='bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='px-5 py-4 flex items-center justify-between border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Tambah Kontak Grup Koordinasi
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg'
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto'
          >
            <TextField
              name='contactFullName'
              label='Nama'
              placeholder='Masukkan Nama'
              register={register}
              isRequired={true}
            />

            <TextField
              name='contactPosition'
              label='Jabatan'
              placeholder='Masukkan Jabatan'
              register={register}
              isRequired={true}
            />

            <TextField
              name='contactPhoneNumber'
              label='No. Handphone'
              placeholder='Masukkan No. Handphone'
              register={register}
              isRequired={true}
            />

            <TextField
              name='contactEmail'
              label='Email'
              placeholder='Masukkan Email'
              register={register}
              isRequired={true}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <SingleSelectDropdownBadge
                name='contactStatusJoined'
                label='Pilih Status'
                options={[
                  { id: 1, label: 'Join Grup' },
                  { id: 0, label: 'Belum Join Grup' },
                ]}
                register={register}
                setValue={setValue}
                isRequired={true}
              />

              <SingleSelectDropdownBadge
                name='contactStatusActive'
                label='Pilih Status Aktif'
                options={[
                  { id: 1, label: 'Aktif' },
                  { id: 0, label: 'Tidak Aktif' },
                ]}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            {/* Footer with Buttons */}
            <div className='flex justify-end gap-3 pt-2 border-t border-gray-200 mt-4'>
              <button
                type='button'
                onClick={onClose}
                disabled={isSubmitting}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Batal
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !isValid}
                className='px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center'
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={16}
                      className='animate-spin'
                    />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
