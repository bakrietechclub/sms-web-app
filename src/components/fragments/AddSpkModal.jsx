import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddSpk } from '../../states/features/partnerships/spk/spkThunks';
import { selectAllTorsOptions } from '../../states/features/partnerships/tor/torSelectors';
import { asyncGetTorOptions } from '../../states/features/partnerships/tor/torThunks';
import Select from 'react-select';
import { STATUS_OPTIONS } from '../../utils';
import AddModalLetterNumbering from './AddModalLetterNumbering';
import RedirectTextField from '../elements/formfields/RedirectTextField';
import TextField from '../elements/formfields/TextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import DatePickerField from '../elements/formfields/DatePickerField';

export default function AddSpkModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      partnershipTorId: null, // Optional = NULL
      partnershipStatusId: null, // Dikontak
      partnershipLetterNumberId: null,
      spkDetailPartnership: '',
      spkNameOfPartner: '',
      spkNameofBcf: '',
      spkSignatureDate: '',
      spkTimePeriod: 5,
      spkDueDate: '',
    },
  });

  const [letterReferenceNumber, setLetterReferenceNumber] = useState('');
  const [openLetterModal, setOpenLetterModal] = useState(false);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddSpk(data))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  const handleRedirectToNomorSurat = () => {
    setOpenLetterModal(true);
  };

  const handleNomorSuratSuccess = ({
    letterNumberId,
    letterReferenceNumber,
  }) => {
    setLetterReferenceNumber(letterReferenceNumber);
    setValue('partnershipLetterNumberId', letterNumberId);
  };

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const options = useSelector(selectAllTorsOptions);

  const selectOptions = options.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(asyncGetTorOptions({ query, typeId: accessTypeId }));
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
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Data SPK</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
            style={{ height: 'calc(900px - 92px)' }}
          >
            <label className="block mb-1 font-medium">
              ToR <span className="text-red-500">*</span>
            </label>
            <Select
              name="partnershipTorId"
              options={selectOptions}
              placeholder="Cari & pilih ToR"
              onInputChange={setQuery}
              onChange={(option) => {
                setSelected(option);
                setValue('partnershipTorId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selected}
            />
            <TextField
              name="spkDetailPartnership"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
            />
            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status SPK"
              options={STATUS_OPTIONS}
              register={register}
              setValue={setValue}
              isRequired
            />
            <RedirectTextField
              label="Nomor Surat BCF"
              value={letterReferenceNumber}
              onRedirect={handleRedirectToNomorSurat}
              isRequired
            />
            <TextField
              name="spkNameofBcf"
              label="Nama Pihak BCF"
              placeholder="Masukkan nama pihak BCF"
              register={register}
            />
            <TextField
              name="spkNameOfPartner"
              label="Nama Pihak Mitra"
              placeholder="Masukkan nama pihak mitra"
              register={register}
            />
            <DatePickerField
              name="spkSignatureDate"
              label="Tanggal Tanda Tangan"
              className="w-full"
              placeholder="Masukkan tanggal tanda tangan"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="spkTimePeriod"
              label="Jangka Waktu"
              placeholder="Masukkan jangka waktu"
              register={register}
            />
            <DatePickerField
              name="spkDueDate"
              label="Tanggal Jatuh Tempo"
              className="w-full"
              placeholder="Masukkan tanggal jatuh tempo"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="spkDocumentUrl"
              label="Link File SPK"
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

      <AddModalLetterNumbering
        isOpen={openLetterModal}
        onClose={() => setOpenLetterModal(false)}
        onSuccess={handleNomorSuratSuccess}
        partnershipLetterNumberTypeId={6}
      />
    </>
  );
}
