import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectMousOptions } from '../../states/features/partnerships/mou/mouSelectors';
import { asyncGetMouOptions } from '../../states/features/partnerships/mou/mouThunks';
import AddModalLetterNumbering from './AddModalLetterNumbering';
import TextField from '../elements/formfields/TextField';
import DatePickerField from '../elements/formfields/DatePickerField';
import RedirectTextField from '../elements/formfields/RedirectTextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import Select from 'react-select';
import { asyncAddPks } from '../../states/features/partnerships/pks/pksThunks';
import { STATUS_OPTIONS } from '../../utils';

export default function AddPksModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      partnershipMouId: null,
      partnershipStatusId: 1,
      partnershipLetterNumberId: null,
      pksInstituteDivision: '',
      pksDetailPartnership: '',
      pksPartnerLetterNumber: '',
      pksNameOfPartner: '',
      pksNameofBcf: '',
      pksSignatureDate: '',
      pksTimePeriod: 5,
      pksDueDate: '',
      pksDocumentUrl: '',
      pksNote: '',
    },
  });

  const [letterReferenceNumber, setLetterReferenceNumber] = useState('');
  const [openLetterModal, setOpenLetterModal] = useState(false);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddPks(data))
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
  const options = useSelector(selectMousOptions);

  const selectOptions = options.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(asyncGetMouOptions({ query, typeId: accessTypeId }));
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
            <h2 className="text-2xl font-semibold">Tambah Data PKS</h2>
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
            <label className="block mb-1 font-medium">MoU</label>
            <Select
              name="partnershipMouId"
              options={selectOptions}
              placeholder="Cari & pilih MoU"
              onInputChange={setQuery}
              onChange={(option) => {
                setSelected(option);
                setValue('partnershipMouId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selected}
            />
            <TextField
              name="pksInstituteDivision"
              label="Divisi"
              placeholder="Masukkan divisi"
              register={register}
            />
            <TextField
              name="pksDetailPartnership"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
            />
            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status PkS"
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
              name="pksPartnerLetterNumber"
              label="Nomor Surat Mitra"
              placeholder="Masukkan nomor surat mitra"
              register={register}
            />
            <TextField
              name="pksNameofBcf"
              label="Nama Pihak BCF"
              placeholder="Masukkan nama pihak BCF"
              register={register}
            />
            <TextField
              name="pksNameOfPartner"
              label="Nama Pihak Mitra"
              placeholder="Masukkan nama pihak mitra"
              register={register}
            />
            <DatePickerField
              name="pksSignatureDate"
              label="Tanggal Tanda Tangan"
              className="w-full"
              placeholder="Masukkan tanggal tanda tangan"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="pksTimePeriod"
              label="Jangka Waktu"
              placeholder="Masukkan jangka waktu"
              register={register}
            />
            <DatePickerField
              name="pksDueDate"
              label="Jatuh Tempo"
              className="w-full"
              placeholder="Masukkan jatuh tempo"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="pksDocumentUrl"
              label="Link File MoU"
              placeholder="https://.."
              register={register}
            />
            <TextField
              name="pksNote"
              label="Catatan Tambahan"
              placeholder="Masukkan catatan tambahan"
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

      {/* ⬇️ Modal AddNomorSurat */}
      <AddModalLetterNumbering
        isOpen={openLetterModal}
        onClose={() => setOpenLetterModal(false)}
        onSuccess={handleNomorSuratSuccess}
        partnershipLetterNumberTypeId={4}
      />
    </>
  );
}
