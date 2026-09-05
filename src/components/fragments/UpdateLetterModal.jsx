import React, { useEffect, useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { X, Loader2 } from 'lucide-react';
import { asyncUpdateLetterById, asyncGetSubClassifications } from '../../states/features/letter/letterThunks';
import { asyncGetLetterTypes } from '../../states/features/classification/classificationThunks';
import { selectLetterTypes } from '../../states/features/classification/classificationSelectors';
import TextField from '../elements/formfields/TextField';
import LetterNumberingField from '../elements/formfields/LetterNumberingField';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';

import { PROGRAM_OPTIONS } from '../../utils';

// Bulan singkat dipakai LetterNumberingField untuk field "Bulan" -- disusun
// dari `letterNumberDate` (dd/mm/yyyy) supaya field itu tidak kosong saat
// edit, konsisten dengan MONTHS_MAP di LetterNumberingField.jsx.
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

export default function UpdateLetterModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);
  const letterTypes = useSelector(selectLetterTypes);

  const methods = useForm({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    reset,
  } = methods;

  // Jenis Surat -- ambil dari master data asli (md_ps_letter_number_type),
  // bukan daftar hardcode 6 item yang dulu dipakai di sini: data nyata
  // sudah punya 8 jenis ("Surat Rekomendasi", "Sertifikat" ikut ditambahkan
  // belakangan), jadi edit surat berjenis itu selalu tampil kosong karena
  // opsinya tidak ada di daftar hardcode tsb.
  //
  // Digerbang `isOpen`: parent (LetterNumberingDetail) me-mount modal ini
  // TEPAT SETELAH `loading` halaman detail berubah jadi false -- tanpa
  // gerbang ini, effect di sini langsung dispatch aksi ber-prefix 'letter/'
  // (asyncGetSubClassifications) yang menyalakan lagi `letter.loading`,
  // yang balik membuat halaman detail menampilkan skeleton -> meng-unmount
  // modal ini -> effect ini jalan lagi begitu di-mount ulang -> loop
  // selamanya, itulah sebabnya halaman detail nyangkut di skeleton terus.
  useEffect(() => {
    if (!isOpen) return;
    dispatch(asyncGetLetterTypes());
  }, [dispatch, isOpen]);

  const letterTypeOptions = (letterTypes || []).map((t) => ({
    id: t.id,
    label: t.name,
  }));

  useEffect(() => {
    if (isOpen && initialData) {
      const [day, month, year] = (initialData.letterNumberDate || '').split('/');
      const isoDate = day && month && year ? `${year}-${month}-${day}` : '';
      const monthName = month ? MONTH_NAMES[Number(month) - 1] : '';
      const programOption = PROGRAM_OPTIONS.find(
        (opt) => opt.id === initialData.masterSecondTierProgramId,
      );

      // Muat ulang daftar sub-klasifikasi milik Kelas surat ini SEBELUM
      // reset() -- LetterNumberingField membaca opsinya dari redux
      // (selectSubClassifications), bukan dari prop.
      if (initialData.partnershipLetterNumberClassificationId) {
        dispatch(
          asyncGetSubClassifications({
            id: initialData.partnershipLetterNumberClassificationId,
          }),
        );
      }

      reset({
        partnershipLetterNumberSubClassificationId:
          initialData.partnershipLetterNumberSubClassificationId,
        partnershipLetterNumberTypeId: initialData.partnershipLetterNumberTypeId,
        masterSecondTierProgramId: initialData.masterSecondTierProgramId,

        letterNumber: initialData.letterReferenceNumber,
        letterNumberDate: isoDate,
        letterNumberSubjectOfLetter:
          initialData.letterNumberSubjectOfLetter || '',

        // Field tampilan yang dibaca LetterNumberingField (lihat catatan
        // reset-on-mount di komponen itu -- transisi pertama sekarang
        // dilewati supaya nilai ini tidak langsung terhapus lagi).
        letterClass: initialData.classificationName || '',
        subClassification: initialData.subClassificationName || '',
        program: programOption?.label || '',
        month: monthName,
        year: year || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialData, reset]);

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const payload = {
      partnershipLetterNumberSubClassificationId:
        data.partnershipLetterNumberSubClassificationId,
      partnershipLetterNumberTypeId: data.partnershipLetterNumberTypeId,
      masterSecondTierProgramId: data.masterSecondTierProgramId,
      // Nomor referensi ("32/ADM-CLP/1/I/2025") bersifat immutable -- surat
      // ini sudah diregistrasi dengan nomor urut atomik, jadi dikirim balik
      // apa adanya (bukan field yang bisa diedit user) supaya kolom NOT
      // NULL ini tidak ikut ke-NULL-kan oleh update parsial.
      referenceNumber: initialData?.letterReferenceNumber,
      letterNumberDate: data.letterNumberDate,
      letterNumberSubjectOfLetter: data.letterNumberSubjectOfLetter,
    };

    dispatch(
      asyncUpdateLetterById({
        id: initialData.letterNumberId || initialData.id,
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
              Perbarui Data Nomor Surat
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
              ref={dropdownRef}
            >
              <SingleSelectDropdown
                name='partnershipLetterNumberTypeId'
                label='Jenis Surat'
                isRequired={true}
                options={letterTypeOptions}
                register={register}
                setValue={setValue}
                defaultValue={initialData?.partnershipLetterNumberTypeId}
              />

              <LetterNumberingField />

              <TextField
                name='letterNumberSubjectOfLetter'
                label='Tujuan dan Perihal Surat'
                placeholder='Masukkan Tujuan dan Perihal Surat'
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
          </FormProvider>
        </div>
      </div>
    </>
  );
}
