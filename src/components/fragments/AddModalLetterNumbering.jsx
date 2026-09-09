import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import TextField from '../elements/formfields/TextField';
import LetterNumberingField from '../elements/formfields/LetterNumberingField';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddLetter,
  asyncGetLastLetterNumber,
} from '../../states/features/letter/letterThunks';
import { selectLastletterNumber } from '../../states/features/letter/letterSelectors';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';
import { X, Loader2 } from 'lucide-react';
import { asyncGetLetterTypes } from '../../states/features/classification/classificationThunks';
import { selectLetterTypes } from '../../states/features/classification/classificationSelectors';

/**
 * `variant` cuma mengatur CHROME (ukuran panel, ketebalan scrim, shadow) --
 * murni soal "modal ini dipanggil di atas modal lain atau berdiri sendiri":
 *   - 'stacked' (default): dipanggil DARI DALAM form lain (Tambah
 *     MoU/PKS/IA/SPK, lewat LetterNumberPickerField). Scrim tipis (10%)
 *     karena overlay 40% milik modal induk sudah menggelapkan halaman --
 *     menambah lapisan gelap lagi di atasnya cuma menumpuk kegelapan tanpa
 *     menambah kejelasan. Panel dibuat ringkas (max-w-lg), bukan selebar
 *     form induk.
 *   - 'page': dipanggil langsung dari halaman Penomoran Surat, berdiri
 *     sendiri seperti modal Tambah/Perbarui lainnya di app ini (max-w-4xl,
 *     scrim 40%).
 *
 * `lockedTypeId` murni soal "siapa yang menentukan Jenis Surat" -- kalau
 * diisi, form ini dipanggil dari alur yang SUDAH TAHU jenis suratnya (mis.
 * form MoU selalu menerbitkan surat berjenis "Surat Permohonan Kerjasama"),
 * jadi field Jenis Surat dikunci & di-prefill. Kalau kosong (null), user
 * memilih sendiri lewat dropdown -- itulah kasus halaman Penomoran Surat.
 *
 * Dua konsep ini SENGAJA dipisah (dulu digabung jadi satu boolean
 * `isInheritance`) supaya tidak ada kombinasi yang tidak masuk akal, mis.
 * panel besar+scrim tebal tapi Jenis Surat terkunci, atau sebaliknya.
 */
export default function AddModalLetterNumbering({
  isOpen,
  onClose,
  onSuccess,
  lockedTypeId = null,
  variant = 'stacked',
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isStacked = variant === 'stacked';
  const firstFieldRef = useRef(null);

  useEffect(() => {
    dispatch(asyncGetLastLetterNumber());
    // Jenis Surat diambil dinamis dari master data (dikelola di halaman
    // Klasifikasi Penomoran Surat), bukan daftar tetap — supaya jenis baru
    // (mis. Surat Rekomendasi, Sertifikat) langsung muncul tanpa ubah kode.
    dispatch(asyncGetLetterTypes());
  }, [dispatch]);

  const lastLetterNumber = useSelector(selectLastletterNumber);
  const rawLetterTypes = useSelector(selectLetterTypes);

  const letterTypeOptions = rawLetterTypes.map((item) => ({
    id: item.id,
    label: item.name,
  }));

  const getLetterTypeName = (id) => {
    const found = letterTypeOptions.find((item) => item.id === id);
    return found ? found.label : '';
  };

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      partnershipLetterNumberSubClassificationId: null, // Administrasi - Pemberitahuan/Undangan/Persetujuan
      partnershipLetterNumberTypeId: lockedTypeId,
      partnershipLetterNumberTypeName: lockedTypeId
        ? getLetterTypeName(lockedTypeId)
        : null,
      masterSecondTierProgramId: 1, // CLP
      letterNumber: null,
      letterNumberDate: '',
      letterNumberSubjectOfLetter: '',
      // SELALU 'DRAFT' -- nomor surat baru dianggap USED oleh back-end
      // (`markAsUsed`, dipanggil AddMouUseCase dkk) tepat saat benar-benar
      // ditautkan ke dokumen. Mengirim 'USED' dari sini (perilaku lama untuk
      // mode standalone) membuat nomor itu mati sebelum sempat dipakai --
      // markAsUsed menolak baris yang statusnya sudah USED.
      letterNumberStatus: 'DRAFT',
    },
  });
  const { register, handleSubmit, setValue } = methods;
  const dropdownRef = useRef(null);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    dispatch(asyncAddLetter(data))
      .unwrap()
      .then((result) => {
        onSuccess(result);
        onClose();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (lastLetterNumber?.nextNumber) {
      setValue('letterNumber', lastLetterNumber.nextNumber);
    }
  }, [lastLetterNumber, setValue]);

  // Nama Jenis Surat (mode lockedTypeId) dihitung dari daftar dinamis, yang
  // saat form pertama kali dibuat mungkin belum selesai di-fetch — isi ulang
  // begitu datanya tersedia supaya tidak tampil kosong.
  useEffect(() => {
    if (lockedTypeId && rawLetterTypes.length > 0) {
      setValue(
        'partnershipLetterNumberTypeName',
        getLetterTypeName(lockedTypeId),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawLetterTypes, lockedTypeId, setValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document.activeElement.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Esc menutup dialog ini SAJA -- listener dipasang lokal (bukan di modal
  // induk), dan hanya aktif selagi dialog ini terbuka, supaya tidak ikut
  // menutup form MoU/PKS/IA/SPK di baliknya saat variant='stacked'.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fokus awal ke field pertama begitu dialog terbuka -- praktik dasar
  // aksesibilitas modal (fokus tidak boleh "hilang" ke body).
  useEffect(() => {
    if (isOpen) firstFieldRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  // Di-render lewat portal ke document.body, BUKAN di tempat komponen ini
  // dipanggil di pohon React -- WAJIB saat variant='stacked', karena
  // pemanggilnya (LetterNumberPickerField) duduk di DALAM <form> milik modal
  // induk (Tambah MoU/PKS/IA/SPK). Tanpa portal, <form> modal ini akan jadi
  // DESCENDANT DOM dari <form> induk (form bersarang, invalid HTML) --
  // browser lalu salah mengartikan submit tombol "Simpan" di sini, jatuh ke
  // submit native (reload halaman dengan field ter-serialize sebagai query
  // string, mis. "/pks?month=Jan&year=2026&..."), bukan lewat
  // handleSubmit(onSubmit) React seperti seharusnya.
  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black ${isStacked ? 'opacity-10' : 'opacity-40'}`}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-letter-number-title"
          className={`bg-white w-full ${isStacked ? 'max-w-lg' : 'max-w-4xl'} rounded-xl ${isStacked ? 'shadow-2xl ring-1 ring-black/5' : 'shadow-xl'} overflow-hidden flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <h2
              id="add-letter-number-title"
              className="text-xl font-semibold text-gray-800"
            >
              Tambah Data Penomoran Surat
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto"
              ref={dropdownRef}
            >
              {lockedTypeId ? (
                <TextField
                  name="partnershipLetterNumberTypeName"
                  label="Jenis Surat"
                  disable={true}
                  className="bg-gray-200 text-gray-500"
                  register={register}
                />
              ) : (
                <SingleSelectDropdown
                  name="partnershipLetterNumberTypeId"
                  label="Jenis Surat"
                  isRequired={true}
                  options={letterTypeOptions}
                  register={register}
                  setValue={setValue}
                />
              )}

              <LetterNumberingField autoFocusRef={firstFieldRef} />
              <TextField
                name="letterNumberSubjectOfLetter"
                label="Tujuan dan Perihal Surat"
                placeholder="Masukkan Tujuan dan Perihal Surat"
                register={register}
                isRequired={false}
              />

              {/* Footer with Buttons */}
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-200 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
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
    </>,
    document.body,
  );
}
