import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';
import TextField from '../elements/formfields/TextField';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';
import {
  asyncAddClassification,
  asyncUpdateClassificationById,
  asyncAddSubClassification,
  asyncUpdateSubClassificationById,
  asyncAddLetterType,
  asyncUpdateLetterTypeById,
} from '../../states/features/classification/classificationThunks';

const KIND_LABEL = {
  classification: 'Klasifikasi',
  subClassification: 'Sub-Klasifikasi',
  type: 'Jenis Surat',
};

export default function ClassificationFormModal({
  isOpen,
  onClose,
  kind, // 'classification' | 'subClassification' | 'type'
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  classificationOptions = [],
  // Saat diisi (dipakai dari halaman detail Klasifikasi), dropdown "Klasifikasi
  // Induk" disembunyikan dan nilainya dikunci ke klasifikasi ini.
  fixedClassificationId = null,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'edit' && initialData) {
      setValue('name', initialData.name);
      if (kind === 'classification') {
        setValue('code', initialData.code);
      }
      if (kind === 'subClassification') {
        setValue('subCode', initialData.sub_code);
        setValue(
          'classificationId',
          initialData.id_partnership_letter_number_classification,
        );
      }
    }
  }, [isOpen, mode, initialData, kind, setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (kind === 'classification') {
        const payload = { name: data.name, code: data.code };
        if (mode === 'add') {
          await dispatch(asyncAddClassification(payload)).unwrap();
        } else {
          await dispatch(
            asyncUpdateClassificationById({ id: initialData.id, payload }),
          ).unwrap();
        }
      } else if (kind === 'subClassification') {
        const payload = {
          classificationId: fixedClassificationId ?? Number(data.classificationId),
          name: data.name,
          subCode: data.subCode,
        };
        if (mode === 'add') {
          await dispatch(asyncAddSubClassification(payload)).unwrap();
        } else {
          await dispatch(
            asyncUpdateSubClassificationById({ id: initialData.id, payload }),
          ).unwrap();
        }
      } else if (kind === 'type') {
        const payload = { name: data.name };
        if (mode === 'add') {
          await dispatch(asyncAddLetterType(payload)).unwrap();
        } else {
          await dispatch(
            asyncUpdateLetterTypeById({ id: initialData.id, payload }),
          ).unwrap();
        }
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className='fixed inset-0 z-40 bg-black opacity-40'
        onClick={onClose}
      />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className='bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='px-5 py-4 flex items-center justify-between border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-800'>
              {mode === 'add' ? 'Tambah' : 'Perbarui'} {KIND_LABEL[kind]}
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
            className='px-5 py-4 space-y-3'
          >
            {kind === 'subClassification' && !fixedClassificationId && (
              <SingleSelectDropdown
                name='classificationId'
                label='Klasifikasi Induk'
                options={classificationOptions}
                register={register}
                setValue={setValue}
                isRequired
                defaultValue={
                  mode === 'edit'
                    ? initialData?.id_partnership_letter_number_classification
                    : undefined
                }
              />
            )}

            <TextField
              name='name'
              label='Nama'
              placeholder={`Nama ${KIND_LABEL[kind].toLowerCase()}`}
              register={register}
              isRequired
            />

            {kind === 'classification' && (
              <TextField
                name='code'
                label='Kode (mis. ADM/FIN)'
                placeholder='ADM'
                register={register}
                isRequired
              />
            )}

            {kind === 'subClassification' && (
              <TextField
                name='subCode'
                label='Kode Sub (sub_code, mis. 1/2/K/Q)'
                placeholder='1'
                register={register}
                isRequired
              />
            )}

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
