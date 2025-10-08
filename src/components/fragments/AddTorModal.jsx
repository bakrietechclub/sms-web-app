import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddTor } from '../../states/features/partnerships/tor/torThunks';
import { selectAllPksOptions } from '../../states/features/partnerships/pks/pksSelectors';
import { selectAllIAsOptions } from '../../states/features/partnerships/ia/iaSelectors';
import { asyncGetPksOptions } from '../../states/features/partnerships/pks/pksThunks';
import { asyncGetImplementationAgreementsOptions } from '../../states/features/partnerships/ia/iaThunks';
import Select from 'react-select';
import TextField from '../elements/formfields/TextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { STATUS_OPTIONS } from '../../utils';
import DatePickerField from '../elements/formfields/DatePickerField';

export default function AddTorModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      partnershipIaId: null, // Optional
      partnershipPksId: null, // Optional
      partnershipStatusId: 1, // Dikontak
      torDetailPartnership: '',
      torNameOfPartner: '',
      torNameofBcf: '',
      torSignatureDate: '',
      torTimePeriod: 5,
      torDueDate: '',
      torDocumentUrl: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddTor(data))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  const [query, setQuery] = useState({ ia: '', pks: '' });
  const [selectedIA, setSelectedIA] = useState(null);
  const [selectedPkS, setSelectedPkS] = useState(null);
  const iaOptions = useSelector(selectAllIAsOptions);
  const pksOptions = useSelector(selectAllPksOptions);

  const formattedIaOptions = iaOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  const formattedPksOptions = pksOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(asyncGetImplementationAgreementsOptions({ query: query.ia }));
  }, [dispatch, query.ia]);

  useEffect(() => {
    dispatch(asyncGetPksOptions({ query: query.pks }));
  }, [dispatch, query.pks]);

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
            <h2 className="text-2xl font-semibold">Tambah Data TOR</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
            style={{ height: 'calc(900px - 92px)' }}
          >
            <label className="block mb-1 font-medium">IA (Opsional)</label>
            <Select
              name="partnershipIaId"
              options={formattedIaOptions}
              placeholder="Cari & pilih IA"
              onInputChange={(val) =>
                setQuery((prev) => ({ ...prev, ia: val }))
              }
              onChange={(option) => {
                setSelectedIA(option);
                setValue('partnershipIaId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selectedIA}
            />
            <label className="block mb-1 font-medium">PkS (Opsional)</label>
            <Select
              name="partnershipPksId"
              options={formattedPksOptions}
              placeholder="Cari & pilih PkS"
              onInputChange={(val) =>
                setQuery((prev) => ({ ...prev, pks: val }))
              }
              onChange={(option) => {
                setSelectedPkS(option);
                setValue('partnershipPksId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selectedPkS}
            />
            <TextField
              name="torDetailPartnership"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
            />
            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status TOR"
              options={STATUS_OPTIONS}
              register={register}
              setValue={setValue}
              isRequired
            />
            <TextField
              name="torNameofBcf"
              label="Nama Pihak BCF"
              placeholder="Masukkan nama pihak BCF"
              register={register}
            />
            <TextField
              name="torNameOfPartner"
              label="Nama Pihak Mitra"
              placeholder="Masukkan nama pihak mitra"
              register={register}
            />
            <DatePickerField
              name="torSignatureDate"
              label="Tanggal Tanda Tangan"
              className="w-full"
              placeholder="Masukkan tanggal tanda tangan"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="torTimePeriod"
              label="Jangka Waktu"
              placeholder="Masukkan jangka waktu"
              register={register}
            />
            <DatePickerField
              name="torDueDate"
              label="Jatuh Tempo"
              className="w-full"
              placeholder="Masukkan tanggal jatuh tempo"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="torDocumentUrl"
              label="Link File TOR"
              placeholder="https://.."
              register={register}
            />
            <div className="text-right pt-4">
              <button
                type="submit"
                className="bg-[#0d4690] text-white px-6 py-2 rounded-lg hover:bg-[#0c3f82]"
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
