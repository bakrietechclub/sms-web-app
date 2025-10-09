import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectPotentialsOptions } from '../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotentialOptions } from '../../states/features/research/potential/potentialThunks';
import TextField from '../elements/formfields/TextField';
import Select from 'react-select';
import { asyncAddGroup } from '../../states/features/group/groupThunks';

export default function AddCoorGroupModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      partnershipResearchId: null,
      groupUrl: '',
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState('45vh');

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddGroup(data))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setWrapperHeight('calc(88vh - 90px - 50px)');
    } else {
      setWrapperHeight('40vh');
    }
  }, [isDropdownOpen]);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const options = useSelector(selectPotentialsOptions);

  const selectOptions = options.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(asyncGetResearchPotentialOptions({ query, typeId: accessTypeId }));
  }, [dispatch, query]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] rounded-2xl shadow-xl overflow-hidden flex flex-col px-5 py-7"
          onClick={(e) => e.stopPropagation()}
          style={{ height: wrapperHeight }}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Grup Koordinasi</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4"
            style={{ height: `calc(${wrapperHeight} - 92px)` }}
          >
            <label className="block mb-1 font-medium">Data riset</label>
            <Select
              name="partnershipResearchId"
              options={selectOptions}
              placeholder="Cari & pilih nama instansi"
              onInputChange={setQuery} // agar search ke API
              onChange={(option) => {
                setSelected(option); // simpan option di state
                setValue('partnershipResearchId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selected}
            />
            <TextField
              name="groupUrl"
              label="Link Grup"
              placeholder="https://.."
              register={register}
            />

            <button
              type="submit"
              className="flex bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82] ml-auto mt-4"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
