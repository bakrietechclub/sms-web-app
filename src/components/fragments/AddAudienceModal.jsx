import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import DatePickerField from '../elements/formfields/DatePickerField';
import TimePickerField from '../elements/formfields/TimePickerField';
import TextField from '../elements/formfields/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { selectPotentialsOptions } from '../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotentialOptions } from '../../states/features/research/potential/potentialThunks';
import Select from 'react-select';
import { asyncAddAudience } from '../../states/features/audience/audienceThunks';
import { X, Loader2 } from 'lucide-react';

export default function AddAudienceModal({ accessTypeId, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(null);

  const { register, handleSubmit, setValue, watch, formState: { isValid } } = useForm({
    mode: 'onChange'
  });

  const options = useSelector(selectPotentialsOptions);

  useEffect(() => {
    dispatch(asyncGetResearchPotentialOptions({ query, typeId: accessTypeId }));
  }, [dispatch, query, accessTypeId]);

  const selectOptions = options.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  // Register Select field for validation
  useEffect(() => {
    register('partnershipResearchId', { required: true });
  }, [register]);

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    try {
      await dispatch(asyncAddAudience({ ...data, query, typeId: accessTypeId })).unwrap();
      onClose();
    } catch (err) {
      console.error(err);
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
          className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Form Data Audiensi
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
            className="px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Riset Potensial <span className="text-red-500">*</span>
              </label>
              <Select
                name="partnershipResearchId"
                options={selectOptions}
                placeholder="Cari & pilih nama Riset Potensial"
                onInputChange={setQuery}
                onChange={(option) => {
                  setSelectedOptions(option);
                  setValue('partnershipResearchId', option ? option.value : null, { shouldValidate: true });
                }}
                isClearable
                isSearchable
                value={selectedOptions}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DatePickerField
                name="audiencesDate"
                label="Tanggal Audiensi"
                register={register}
                setValue={setValue}
                watch={watch}
                required={true}
              />
              <TimePickerField
                name="audiencesTime"
                label="Jam Audiensi"
                register={register}
                setValue={setValue}
                watch={watch}
                required={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SingleSelectDropdownBadge
                name="audiencesType"
                label="Jenis Audiensi"
                options={[
                  { id: 'Online', label: 'Online' },
                  { id: 'Offline', label: 'Offline' },
                ]}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <SingleSelectDropdownBadge
                name="audiencesStatus"
                label="Status Audiensi"
                options={[
                  { id: 'Belum Audiensi', label: 'Belum Audiensi' },
                  { id: 'Re-Audiensi', label: 'Re-Audiensi' },
                  { id: 'Selesai', label: 'Selesai' },
                ]}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <TextField
              name="audiencesLocation"
              label="Tempat Audiensi"
              placeholder="Masukkan link/alamat"
              register={register}
              isRequired={true}
            />

            <TextField
              name="documentUrl"
              label="Link Dokumentasi"
              placeholder="https://.."
              register={register}
              isRequired={true}
            />

            <TextField
              name="audiencesNote"
              label="Catatan Tambahan"
              placeholder="Masukkan catatan tambahan"
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
