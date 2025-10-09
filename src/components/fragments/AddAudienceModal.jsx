import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';
import DatePickerField from '../elements/formfields/DatePickerField';
import TimePickerField from '../elements/formfields/TimePickerField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import TextField from '../elements/formfields/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { selectPotentialsOptions } from '../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotentialOptions } from '../../states/features/research/potential/potentialThunks';
import Select from 'react-select';
import { asyncAddAudience } from '../../states/features/audience/audienceThunks';

export default function AddAudienceModal({ accessTypeId, isOpen, onClose }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, watch } = useForm();
  const dropdownRef = useRef(null);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddAudience(data))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  const [query, setQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(null);
  const options = useSelector(selectPotentialsOptions);

  useEffect(() => {
    dispatch(asyncGetResearchPotentialOptions({ query, typeId: accessTypeId }));
  }, [dispatch, query]);

  const selectOptions = options.map((item) => ({
    value: item.id,
    label: item.label,
  }));

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
            <h2 className="text-2xl font-semibold">Form Data Audiensi</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
            style={{ height: 'calc(900px - 92px)' }}
            ref={dropdownRef}
          >
            <label className="block mb-1 font-medium">Riset Potensial</label>
            <Select
              name="partnershipResearchId"
              options={selectOptions}
              placeholder="Cari & pilih nama Riset Potensial"
              onInputChange={setQuery} // agar search ke API
              onChange={(option) => {
                setSelectedOptions(option); // simpan option di state
                setValue('partnershipResearchId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selectedOptions}
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <DatePickerField
                  name="audiencesDate"
                  label="Tanggal Audiensi"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              </div>
              <div className="flex-1">
                <TimePickerField
                  name="audiencesTime"
                  label="Jam Audiensi"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <SingleSelectDropdownBadge
                  name="audiencesType"
                  label="Jenis Audiensi"
                  options={[
                    { id: 'Online', label: 'Online' },
                    { id: 'Offline', label: 'Offline' },
                  ]}
                  register={register}
                  setValue={setValue}
                />
              </div>
              <div className="flex-1">
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
                />
              </div>
            </div>
            <TextField
              name="audiencesLocation"
              label="Tempat Audiensi"
              placeholder="Masukkan link/alamat"
              register={register}
            />
            <TextField
              name="documentUrl"
              label="Link Dokumentasi"
              placeholder="https://.."
              register={register}
            />
            <TextField
              name="audiencesNote"
              label="Catatan Tambahan"
              placeholder="Masukkan catatan tambahan"
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
        </div>
      </div>
    </>
  );
}
