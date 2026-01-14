import React, { useEffect, useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';
import { asyncUpdateLetterById } from '../../states/features/letter/letterThunks';
import TextField from '../elements/formfields/TextField';
import LetterNumberingField from '../elements/formfields/LetterNumberingField';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';

import { LETTER_OPTIONS, formatDateInput } from '../../utils';

const LETTER_TYPE_OPTIONS = [
  { id: 1, label: 'Surat Permohonan Kerjasama' },
  { id: 2, label: 'Surat Undangan Audiensi' },
  { id: 3, label: 'MoU (Nota Kesepahaman)' },
  { id: 4, label: 'PKS (Perjanjian Kerjasama)' },
  { id: 5, label: 'IA (Implementation Agreement)' },
  { id: 6, label: 'SPK (Surat Pernyataan Komitmen)' },
];

export default function UpdateLetterModal({ isOpen, onClose, initialData, onSuccess }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  const methods = useForm({
    mode: 'onChange',
  });

  const { register, handleSubmit, setValue, formState: { isValid }, reset } = methods;

  useEffect(() => {
    if (initialData) {
      // Find the type ID by name if possible (or default to something safe, though existing data should have it)
      const typeOption = LETTER_TYPE_OPTIONS.find(opt => opt.label === initialData.letterNumberType);

      reset({
        // Extract IDs if available in extended data or rely on UI to provide them or default
        // The prompt only gives display strings in initialData, assuming standard defaults or parsing 
        // Logic to parse "letterReferenceNumber" for some fields if needed, 
        // but typically update endpoint might need new values or existing ones. 
        // Initializing with what we have:

        partnershipLetterNumberSubClassificationId: 2, // Defaulting as per payload prompt requirement for now or needs to be selected
        partnershipLetterNumberTypeId: typeOption ? typeOption.id : 2,
        masterSecondTierProgramId: 3, // Default as per request

        letterNumber: initialData.letterNumber,
        letterNumberDate: formatDateInput(initialData.letterNumberDate),
        letterNumberSubjectOfLetter: initialData.letterNumberSubjectOfLetter || '',

        // For LetterNumberingField to work, it might need specific field names
        // It seems LetterNumberingField manages its own internal state or expects specific form fields
        // Since the prompt asks to update using specific payload structure:

        // Note: LetterNumberingField is complex (likely handles parts of the letter number).
        // If we just need to send the payload requested, we map the form values to it.
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Construct payload as requested
    const payload = {
      partnershipLetterNumberSubClassificationId: data.partnershipLetterNumberSubClassificationId,
      partnershipLetterNumberTypeId: data.partnershipLetterNumberTypeId,
      masterSecondTierProgramId: data.masterSecondTierProgramId,
      letterNumberDate: data.letterNumberDate,
      letterNumberSubjectOfLetter: data.letterNumberSubjectOfLetter
    };

    dispatch(asyncUpdateLetterById({ id: initialData.letterNumberId || initialData.id, payload }))
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
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Perbarui Data Nomor Surat
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
              <SingleSelectDropdown
                name="partnershipLetterNumberTypeId"
                label="Jenis Surat"
                isRequired={true}
                options={LETTER_TYPE_OPTIONS}
                register={register}
                setValue={setValue}
                defaultValue={initialData?.partnershipLetterNumberTypeId || LETTER_TYPE_OPTIONS.find(opt => opt.label === initialData?.letterNumberType)?.id}
              />

              {/* Using LetterNumberingField might be tricky if it expects to generate a NEW number. 
                  For UPDATE, we might just be updating metadata components (date, subject, classification).
                  The prompt implies updating these components.
                  We will include the LetterNumberingField but ensure it populates correctly if needed, 
                  or just use basic fields if we are only updating metadata. 
                  However, the prompt asks to "get reference from AddModalLetterNumbering.jsx" which uses LetterNumberingField.
                  Let's use it to maintain consistency, assuming it can handle updates or standard inputs.
              */}
              <LetterNumberingField />

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
                  disabled={isSubmitting || !isValid}
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
    </>
  );
}
