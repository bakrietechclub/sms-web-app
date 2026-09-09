import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';

import CreatableSelect from 'react-select/creatable';
import TextField from '../elements/formfields/TextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import DatePickerField from '../elements/formfields/DatePickerField';
import { STATUS_OPTIONS, formatDateInput } from '../../utils';
import { calculateDueDate } from '../../utils/dateHelpers';
import { asyncUpdatePksById } from '../../states/features/partnerships/pks/pksThunks';
import { getInstitutionDivisionOptions } from '../../utils/api/institutions';

export default function UpdatePksModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    mode: 'onChange',
  });
  const { register, handleSubmit, setValue, watch, reset } = methods;

  useEffect(() => {
    if (initialData) {
      // Map status label to ID if only label is provided
      const statusId =
        initialData.partnershipStatusId ||
        STATUS_OPTIONS.find(
          (opt) => opt.label === initialData.statusPartnership,
        )?.id ||
        1;

      reset({
        partnershipStatusId: statusId,
        pksInstituteDivision: initialData.pksInstituteDivision || '',
        pksDetailPartnership: initialData.pksDetailPartnership || '',
        pksPartnerLetterNumber: initialData.pksPartnerLetterNumber || '',
        pksNameOfPartner: initialData.pksNameOfPartner || '',
        pksNameofBcf: initialData.pksNameofBcf || '',
        pksSignatureDate: formatDateInput(initialData.pksSignatureDate) || '',
        pksTimePeriod: initialData.pksTimePeriod || 5, // Default
        pksDueDate: formatDateInput(initialData.pksDueDate) || '',
        pksDocumentUrl: initialData.pksDocumentUrl || '',
        pksNote: initialData.pksNote || '',
      });
    }
  }, [initialData, reset]);

  // Opsi "Divisi / Fakultas" mengikuti instansi PKS ini (institusinya sudah
  // tetap sejak dibuat -- tidak seperti AddPksModal, di sini tidak ada
  // pemilihan MoU ulang). Kalau instansinya universitas -> jurusan, kalau
  // bukan -> Divisi CLP. Lihat catatan lengkap di
  // MasterInstitutionsRepositoryMySQL.readDivisionOptionsById.
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [isDivisionLoading, setIsDivisionLoading] = useState(false);

  useEffect(() => {
    if (!initialData?.institutionId) {
      setDivisionOptions([]);
      return;
    }
    let isCancelled = false;
    setIsDivisionLoading(true);
    getInstitutionDivisionOptions({ id: initialData.institutionId })
      .then((data) => {
        if (!isCancelled) setDivisionOptions(data || []);
      })
      .catch(() => {
        if (!isCancelled) setDivisionOptions([]);
      })
      .finally(() => {
        if (!isCancelled) setIsDivisionLoading(false);
      });
    return () => {
      isCancelled = true;
    };
  }, [initialData?.institutionId]);

  // Registrasi manual diperlukan supaya `isValid` tetap benar saat mode
  // Select aktif -- TextField mendaftarkan field-nya sendiri lewat
  // `register(...)` di dalam komponennya, tapi Select di sini cuma
  // memanggil `setValue`, yang TIDAK mendaftarkan aturan validasi.
  useEffect(() => {
    register('pksInstituteDivision', { required: true });
  }, [register]);

  const divisionSelectOptions = divisionOptions.map((item) => ({
    value: item.label,
    label: item.label,
  }));
  const currentDivision = watch('pksInstituteDivision');
  const currentDivisionOption = currentDivision
    ? { value: currentDivision, label: currentDivision }
    : null;
  // Sama seperti AddPksModal.jsx: boleh diketik bebas, tapi diberi tahu
  // kalau tidak cocok dengan yang sudah tercatat resmi di instansi ini.
  const isUnknownDivision =
    currentDivision &&
    divisionOptions.length > 0 &&
    !divisionOptions.some(
      (item) => item.label.trim().toLowerCase() === currentDivision.trim().toLowerCase(),
    );

  // Auto-calculate pksDueDate based on pksSignatureDate + pksTimePeriod (in years)
  const pksSignatureDate = watch('pksSignatureDate');
  const pksTimePeriod = watch('pksTimePeriod');

  useEffect(() => {
    if (pksSignatureDate && pksTimePeriod) {
      const dueDate = calculateDueDate(pksSignatureDate, pksTimePeriod);
      if (dueDate) {
        setValue('pksDueDate', formatDateInput(dueDate), {
          shouldValidate: true,
        });
      }
    }
  }, [pksSignatureDate, pksTimePeriod, setValue]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      pksTimePeriod: Number(data.pksTimePeriod),
    };

    dispatch(
      asyncUpdatePksById({ id: initialData.pksId || initialData.id, payload }),
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
              Perbarui Data PKS
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg'
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </div>

          <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div>
                <label className='block mb-2 font-medium text-gray-700'>
                  Divisi / Fakultas <span className='text-red-500'>*</span>
                </label>
                <CreatableSelect
                  name='pksInstituteDivision'
                  options={divisionSelectOptions}
                  placeholder={isDivisionLoading ? 'Memuat opsi...' : 'Cari, pilih, atau ketik divisi/jurusan baru'}
                  formatCreateLabel={(input) => `Pakai "${input}" (belum tercatat)`}
                  isLoading={isDivisionLoading}
                  isClearable
                  isSearchable
                  value={currentDivisionOption}
                  onChange={(option) =>
                    setValue('pksInstituteDivision', option ? option.value : '', {
                      shouldValidate: true,
                    })
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: '42px',
                      borderColor: isUnknownDivision ? '#fbbf24' : '#d1d5db',
                      '&:hover': { borderColor: isUnknownDivision ? '#f59e0b' : '#9ca3af' },
                    }),
                  }}
                />
                {isUnknownDivision && (
                  <p className='text-xs text-amber-600 mt-1 flex items-start gap-1'>
                    <span>⚠</span>
                    <span>
                      &quot;{currentDivision}&quot; belum tercatat sebagai jurusan/Divisi resmi
                      instansi ini. Tetap bisa disimpan -- cek dulu ejaannya kalau ini seharusnya
                      salah satu yang sudah ada di daftar.
                    </span>
                  </p>
                )}
              </div>
              <TextField
                name='pksDetailPartnership'
                label='Detail Kerjasama'
                placeholder='Masukkan detail kerjasama'
                register={register}
                isRequired={true}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <SingleSelectDropdownBadge
                name='partnershipStatusId'
                label='Status PkS'
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
                name='pksPartnerLetterNumber'
                label='Nomor Surat Mitra'
                placeholder='Masukkan nomor surat mitra'
                register={register}
                isRequired={true}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <TextField
                name='pksNameofBcf'
                label='Nama Pihak BCF'
                placeholder='Masukkan nama pihak BCF'
                register={register}
                isRequired={true}
              />
              <TextField
                name='pksNameOfPartner'
                label='Nama Pihak Mitra'
                placeholder='Masukkan nama pihak mitra'
                register={register}
                isRequired={true}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              <DatePickerField
                name='pksSignatureDate'
                label='Tanggal Tanda Tangan'
                className='w-full'
                placeholder='Masukkan tanggal'
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <TextField
                name='pksTimePeriod'
                label='Jangka Waktu (Tahun)'
                placeholder='Masukkan jangka waktu'
                register={register}
                isRequired={true}
                type='number'
              />
              <DatePickerField
                name='pksDueDate'
                label='Jatuh Tempo'
                className='w-full'
                register={register}
                setValue={setValue}
                isRequired={true}
                readOnly
                helperText='Dihitung otomatis dari Tanggal Tanda Tangan + Jangka Waktu'
              />
            </div>

            <TextField
              name='pksDocumentUrl'
              label='Link File MoU'
              placeholder='https://..'
              register={register}
              isRequired={true}
            />
            <TextField
              name='pksNote'
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
                disabled={isSubmitting}
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
          </FormProvider>
        </div>
      </div>
    </>
  );
}
