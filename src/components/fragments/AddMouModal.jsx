import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../elements/formfields/TextField';
import RedirectTextField from '../elements/formfields/RedirectTextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { selectPotentialsOptions } from '../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotentialOptions } from '../../states/features/research/potential/potentialThunks';
import Select from 'react-select';
import DatePickerField from '../elements/formfields/DatePickerField';
import AddModalLetterNumbering from './AddModalLetterNumbering';
import { STATUS_OPTIONS } from '../../utils';
import { asyncAddMou } from '../../states/features/partnerships/mou/mouThunks';

export default function AddMouModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      partnershipLetterNumberId: 1,
      partnershipResearchId: 8,
      partnershipStatusId: 1,
      mouPartnershipDetail: '',
      mouPartnerLetterNumber: '',
      mouPartnerName: '',
      mouBcfName: '',
      mouSignatureDate: '',
      mouTimePeriod: 5,
      mouDueDate: '',
      mouDocumentUrl: '',
      mouNote: '',
    },
  });

  const [letterReferenceNumber, setLetterReferenceNumber] = useState('');
  const [openLetterModal, setOpenLetterModal] = useState(false);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddMou({ ...data, query, typeId: accessTypeId }))
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document.activeElement.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Data MoU</h2>
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
            <label className="block mb-1 font-medium">
              Data Riset Potensial
            </label>
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
              name="mouPartnershipDetail"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
            />
            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status MoU"
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
              name="mouPartnerLetterNumber"
              label="Nomor Surat Mitra"
              placeholder="Masukkan nomor surat mitra"
              register={register}
            />
            <TextField
              name="mouBcfName"
              label="Nama Pihak BCF"
              placeholder="Masukkan nama pihak BCF"
              register={register}
            />
            <TextField
              name="mouPartnerName"
              label="Nama Pihak Mitra"
              placeholder="Masukkan nama pihak mitra"
              register={register}
            />
            <DatePickerField
              name="mouSignatureDate"
              label="Tanggal Tanda Tangan"
              className="w-full"
              placeholder="Masukkan tanggal tanda tangan"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="mouTimePeriod"
              label="Jangka Waktu"
              placeholder="Masukkan jangka waktu"
              register={register}
            />
            <DatePickerField
              name="mouDueDate"
              label="Jatuh Tempo"
              className="w-full"
              placeholder="Masukkan jatuh tempo"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="mouDocumentUrl"
              label="Link File MoU"
              placeholder="https://.."
              register={register}
            />
            <TextField
              name="mouNote"
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
        partnershipLetterNumberTypeId={3}
      />
    </>
  );
}
