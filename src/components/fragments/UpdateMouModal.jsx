import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { X, Loader2 } from 'lucide-react';
import Select from 'react-select';

import TextField from '../elements/formfields/TextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import DatePickerField from '../elements/formfields/DatePickerField';
import { Button } from '../elements/Button';
import { STATUS_OPTIONS, formatDateInput } from '../../utils';
import { calculateDueDate } from '../../utils/dateHelpers';
import { asyncUpdateMouById } from '../../states/features/partnerships/mou/mouThunks';
import { asyncGetInstitutionsOptions } from '../../states/features/institution/institutionThunks';
import { selectInstitutionsOptions } from '../../states/features/institution/institutionSelectors';

export default function UpdateMouModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
  accessTypeId,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  // Instansi mitra bisa diperbaiki/diganti dari sini -- ini satu-satunya
  // jalan UI untuk melengkapi MoU lama yang belum punya instansi (lihat
  // migrasi 003 & badge "Instansi belum diisi" di daftar/detail MoU).
  useEffect(() => {
    register('institutionId', { required: true });
  }, [register]);

  useEffect(() => {
    if (isOpen && initialData) {
      // Map status label to ID if only label is provided
      const statusId =
        initialData.partnershipStatusId ||
        STATUS_OPTIONS.find(
          (opt) => opt.label === initialData.statusPartnership,
        )?.id ||
        1;

      reset({
        partnershipStatusId: statusId,
        institutionId: initialData.instituteId || null,
        mouPartnershipDetail: initialData.mouPartnershipDetail || '',
        mouPartnerLetterNumber: initialData.mouPartnerLetterNumber || '',
        mouPartnerName: initialData.mouPartnerName || '',
        mouBcfName: initialData.mouBcfName || '',
        mouSignatureDate: formatDateInput(initialData.mouSignatureDate) || '',
        mouTimePeriod: initialData.mouTimePeriod || 5, // Default to 5 if missing?
        mouDueDate: formatDateInput(initialData.mouDueDate) || '',
        mouDocumentUrl: initialData.mouDocumentUrl || '',
        mouNote: initialData.mouNote || '',
      });
    }
  }, [isOpen, initialData, reset]);

  // Auto-calculate mouDueDate based on mouSignatureDate + mouTimePeriod (in years)
  const mouSignatureDate = watch('mouSignatureDate');
  const mouTimePeriod = watch('mouTimePeriod');

  useEffect(() => {
    if (mouSignatureDate && mouTimePeriod) {
      const dueDate = calculateDueDate(mouSignatureDate, mouTimePeriod);
      if (dueDate) {
        setValue('mouDueDate', formatDateInput(dueDate), {
          shouldValidate: true,
        });
      }
    }
  }, [mouSignatureDate, mouTimePeriod, setValue]);

  // Dropdown Instansi -- digerbang `isOpen` supaya tidak dispatch/fetch
  // saat modal ini cuma di-mount tapi belum dibuka (pola yang sama dengan
  // catatan di UpdateLetterModal.jsx: efek yang jalan saat modal masih
  // tertutup bisa memicu loading state yang tidak semestinya).
  const [institutionQuery, setInstitutionQuery] = useState('');
  const institutionOptions = useSelector(selectInstitutionsOptions);
  const institutionSelectOptions = institutionOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));
  const selectedInstitutionId = watch('institutionId');
  const selectedInstitutionOption =
    institutionSelectOptions.find(
      (opt) => String(opt.value) === String(selectedInstitutionId),
    ) ||
    (initialData?.instituteId && initialData?.instituteName
      ? { value: initialData.instituteId, label: initialData.instituteName }
      : null);

  useEffect(() => {
    if (!isOpen) return;
    dispatch(
      asyncGetInstitutionsOptions({ query: institutionQuery, typeId: accessTypeId }),
    );
  }, [dispatch, isOpen, institutionQuery, accessTypeId]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      mouTimePeriod: Number(data.mouTimePeriod),
    };

    dispatch(asyncUpdateMouById({ id: initialData.mouId, payload }))
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
              Perbarui Data MoU
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
            <div>
              <label className='block mb-2 font-medium text-gray-700'>
                Nama Instansi <span className='text-red-500'>*</span>
              </label>
              <Select
                name='institutionId'
                options={institutionSelectOptions}
                placeholder='Cari & pilih nama instansi'
                onInputChange={setInstitutionQuery}
                onChange={(option) => {
                  setValue('institutionId', option ? option.value : null, {
                    shouldValidate: true,
                  });
                }}
                isClearable
                isSearchable
                value={selectedInstitutionOption}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '42px',
                    borderColor: '#d1d5db',
                    '&:hover': {
                      borderColor: '#9ca3af',
                    },
                  }),
                }}
              />
              {!initialData?.instituteName && (
                <p className='mt-1 text-xs text-[#B9660A]'>
                  MoU ini belum punya instansi mitra -- pilih instansinya di
                  atas untuk melengkapi.
                </p>
              )}
            </div>

            <TextField
              name='mouPartnershipDetail'
              label='Detail Kerjasama'
              placeholder='Masukkan detail kerjasama'
              register={register}
              isRequired={true}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <SingleSelectDropdownBadge
                name='partnershipStatusId'
                label='Status MoU'
                options={STATUS_OPTIONS}
                register={register}
                setValue={setValue}
                isRequired
                defaultValue={
                  initialData?.partnershipStatusId ||
                  STATUS_OPTIONS.find(
                    (opt) => opt.label === initialData?.statusPartnership,
                  )?.id
                }
              />
              <TextField
                name='mouPartnerLetterNumber'
                label='Nomor Surat Mitra'
                placeholder='Masukkan nomor surat mitra'
                register={register}
                isRequired={true}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <TextField
                name='mouBcfName'
                label='Nama Pihak BCF'
                placeholder='Masukkan nama pihak BCF'
                register={register}
                isRequired={true}
              />
              <TextField
                name='mouPartnerName'
                label='Nama Pihak Mitra'
                placeholder='Masukkan nama pihak mitra'
                register={register}
                isRequired={true}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              <DatePickerField
                name='mouSignatureDate'
                label='Tanggal Tanda Tangan'
                className='w-full'
                placeholder='Masukkan tanggal'
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <TextField
                name='mouTimePeriod'
                label='Jangka Waktu (Tahun)'
                placeholder='Masukkan jangka waktu'
                register={register}
                isRequired={true}
                type='number'
              />
              <DatePickerField
                name='mouDueDate'
                label='Jatuh Tempo'
                className='w-full'
                placeholder='Masukkan jatuh tempo'
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <TextField
              name='mouDocumentUrl'
              label='Link File MoU'
              placeholder='https://..'
              register={register}
              isRequired={true}
            />

            <TextField
              name='mouNote'
              label='Catatan Tambahan'
              placeholder='Masukkan catatan tambahan'
              register={register}
              isRequired={false}
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
