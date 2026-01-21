import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';

import TextField from '../elements/formfields/TextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { Button } from '../elements/Button';
import { STATUS_OPTIONS } from '../../utils';
import { asyncUpdateImplementationAgreementById } from '../../states/features/partnerships/ia/iaThunks';

export default function UpdateIaModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      // Map status label to ID if only label is provided
      const statusId =
        initialData.partnershipStatusId ||
        STATUS_OPTIONS.find(
          (opt) => opt.label === initialData?.iaPartnershipStatusName,
        )?.id ||
        1;

      reset({
        partnershipStatusId: statusId,
        iaYearOfImplementation: initialData.iaYearOfImplementations || '',
        iaLetterNumberPartner: initialData.iaLetterNumberPartner || '',
        iaNameOfBcf: initialData.iaNameOfBcf || '',
        iaNameOfPartner: initialData.iaNameOfPartner || '',
        iaDocumentUrl: initialData.iaDocumentUrl || '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      iaYearOfImplementation: String(data.iaYearOfImplementation), // Ensure string format
    };

    dispatch(
      asyncUpdateImplementationAgreementById({
        id: initialData.id || initialData.implementationAgreementsId,
        payload,
      }),
    )
      .unwrap()
      .then(() => {
        onSuccess?.();
        onClose();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
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
          className='bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='px-5 py-4 flex items-center justify-between border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Perbarui Data IA
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg'
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <TextField
                name='iaYearOfImplementation'
                label='Tahun Implementasi Kerjasama'
                placeholder='Masukkan tahun implementasi'
                register={register}
                isRequired={true}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Harus berupa angka',
                  },
                }}
              />
              <SingleSelectDropdownBadge
                name='partnershipStatusId'
                label='Status IA'
                options={STATUS_OPTIONS}
                register={register}
                setValue={setValue}
                isRequired
                defaultValue={
                  initialData?.partnershipStatusId ||
                  STATUS_OPTIONS.find(
                    (opt) => opt.label === initialData?.iaPartnershipStatusName,
                  )?.id
                }
              />
            </div>

            <TextField
              name='iaLetterNumberPartner'
              label='Nomor Surat Mitra'
              placeholder='Masukkan nomor surat mitra'
              register={register}
              isRequired={true}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <TextField
                name='iaNameOfBcf'
                label='Nama Pihak BCF'
                placeholder='Masukkan nama pihak BCF'
                register={register}
                isRequired={true}
              />
              <TextField
                name='iaNameOfPartner'
                label='Nama Pihak Mitra'
                placeholder='Masukkan nama pihak mitra'
                register={register}
                isRequired={true}
              />
            </div>

            <TextField
              name='iaDocumentUrl'
              label='Link File IA'
              placeholder='https://..'
              register={register}
              isRequired={true}
            />

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
                className='px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className='animate-spin' />
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
