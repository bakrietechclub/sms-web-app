import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddImplementationAgreement } from '../../states/features/partnerships/ia/iaThunks';
import { selectAllPksOptions } from '../../states/features/partnerships/pks/pksSelectors';
import { asyncGetPksOptions } from '../../states/features/partnerships/pks/pksThunks';
import Select from 'react-select';
import TextField from '../elements/formfields/TextField';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';
import RedirectTextField from '../elements/formfields/RedirectTextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { BATCH_OPTIONS, PROGRAM_OPTIONS, STATUS_OPTIONS } from '../../utils';
import AddModalLetterNumbering from './AddModalLetterNumbering';

export default function AddIaModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      partnershipPksId: null,
      partnershipStatusId: null, // Dikontak
      partnershipLetterNumberId: null,
      batchId: null,
      programId: null,
      iaYearOfImplementation: '',
      iaLetterNumberPartner: '',
      iaNameOfBcf: '',
      iaNameOfPartner: '',
      iaDocumentUrl: '',
    },
  });

  const [letterReferenceNumber, setLetterReferenceNumber] = useState('');
  const [openLetterModal, setOpenLetterModal] = useState(false);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddImplementationAgreement(data))
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
  const options = useSelector(selectAllPksOptions);

  const selectOptions = options.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(asyncGetPksOptions({ query, typeId: accessTypeId }));
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
            <h2 className="text-2xl font-semibold">Tambah Data IA</h2>
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
              PkS <span className="text-red-500">*</span>
            </label>
            <Select
              name="partnershipPksId"
              options={selectOptions}
              placeholder="Cari & pilih PkS"
              onInputChange={setQuery}
              onChange={(option) => {
                setSelected(option);
                setValue('partnershipPksId', option ? option.value : null);
              }}
              isClearable
              isSearchable
              value={selected}
            />
            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status SPK"
              options={STATUS_OPTIONS}
              register={register}
              setValue={setValue}
              isRequired
            />
            <TextField
              name="iaYearOfImplementation"
              label="Tahun Implementasi Kerjasama"
              placeholder="Masukkan tahun implementasi"
              register={register}
              isRequired
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <SingleSelectDropdown
                  name="programId"
                  label="Program Kerjasama"
                  options={PROGRAM_OPTIONS}
                  register={register}
                  setValue={setValue}
                  isRequired
                />
              </div>
              <div className="w-1/2">
                <SingleSelectDropdown
                  name="batchId"
                  label="Batch Program"
                  options={BATCH_OPTIONS}
                  register={register}
                  setValue={setValue}
                  isRequired
                />
              </div>
            </div>

            <RedirectTextField
              label="Nomor Surat BCF"
              value={letterReferenceNumber}
              onRedirect={handleRedirectToNomorSurat}
              isRequired
            />
            <TextField
              name="iaLetterNumberPartner"
              label="Nomor Surat Mitra"
              placeholder="Masukkan nomor surat mitra"
              register={register}
            />
            <TextField
              name="iaNameOfBcf"
              label="Nama Pihak BCF"
              placeholder="Masukkan nama pihak BCF"
              register={register}
            />
            <TextField
              name="iaNameOfPartner"
              label="Nama Pihak Mitra"
              placeholder="Masukkan nama pihak mitra"
              register={register}
            />
            <TextField
              name="iaDocumentUrl"
              label="Link File IA"
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
        partnershipLetterNumberTypeId={5}
      />
    </>
  );
}
