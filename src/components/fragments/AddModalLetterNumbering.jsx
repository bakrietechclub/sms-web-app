import React, { useEffect, useRef } from 'react';
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

export default function AddModalLetterNumbering({
  isOpen,
  onClose,
  onSuccess,
  partnershipLetterNumberTypeId = null,
  isInheritance = true,
}) {
  const dispatch = useDispatch();

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
    },
  });
  const { register, handleSubmit, setValue } = methods;
  const dropdownRef = useRef(null);

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    try {
      const result = await dispatch(asyncAddLetter(data)).unwrap();
      onSuccess(result);
      onClose();
    } catch (error) {
      console.error(error);
    }
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
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Tambah Data Penomoran Surat
            </h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
              style={{ height: 'calc(900px - 92px)' }}
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

              <div className="text-right pt-4">
                <button
                  type="submit"
                  className="bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
