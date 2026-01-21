import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { asyncUpdateGroupById } from '../../states/features/group/groupThunks';
import TextField from '../elements/formfields/TextField';
import { X, Loader2 } from 'lucide-react';

export default function UpdateCoorGroupModal({ isOpen, onClose, initialData, onSuccess }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      groupUrl: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('groupUrl', initialData.groupUrl || '');
    }
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await dispatch(asyncUpdateGroupById({ id: initialData.groupId, groupUrl: data.groupUrl })).unwrap()
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
          className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Perbarui Grup Koordinasi
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 py-4 space-y-3"
          >
            <TextField
              name="groupUrl"
              label="Link Grup"
              placeholder="https://.."
              register={register}
              isRequired={true}
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
        </div>
      </div>
    </>
  );
}
