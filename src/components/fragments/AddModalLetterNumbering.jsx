import React, { useEffect, useRef, useState } from 'react';
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

export default function AddModalLetterNumbering({
  isOpen,
  onClose,
  onSuccess,
  partnershipLetterNumberTypeId = null,
  isInheritance = true,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(asyncGetLastLetterNumber());
  }, []);

  const lastLetterNumber = useSelector(selectLastletterNumber);

  const letterTypeOptions = [
    { id: 1, label: 'Surat Permohonan Kerjasama' },
    { id: 2, label: 'Surat Undangan Audiensi' },
    { id: 3, label: 'MoU (Nota Kesepahaman)' },
    { id: 4, label: 'PKS (Perjanjian Kerjasama)' },
    { id: 5, label: 'IA (Implementation Agreement)' },
    { id: 6, label: 'SPK (Surat Pernyataan Komitmen)' },
  ];

  const getLetterTypeName = (id) => {
    const found = letterTypeOptions.find((item) => item.id === id);
    return found ? found.label : '';
  };

  const methods = useForm({
    defaultValues: {
      partnershipLetterNumberSubClassificationId: null, // Administrasi - Pemberitahuan/Undangan/Persetujuan
      partnershipLetterNumberTypeId, // Surat Permohonan Kerjasama
      partnershipLetterNumberTypeName: isInheritance
        ? getLetterTypeName(partnershipLetterNumberTypeId)
        : null,
      masterSecondTierProgramId: 1, // CLP
      letterNumber: null,
      letterNumberDate: '',
      letterNumberSubjectOfLetter: '',
      letterNumberStatus: isInheritance ? 'DRAFT' : 'USED',
    },
  });
  const { register, handleSubmit, setValue } = methods;
  const dropdownRef = useRef(null);

  const onSubmit = (data) => {
    console.log('Form data:', data);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document.activeElement.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              {isInheritance ? (
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

              <LetterNumberingField />
              <TextField
                name="letterNumberSubjectOfLetter"
                label="Tujuan dan Perihal Surat"
                placeholder="Masukkan Nama Pihak BCF"
                register={register}
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
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
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