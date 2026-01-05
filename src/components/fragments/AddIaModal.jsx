import React, { useEffect, useState, useRef } from 'react';
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
import { X, Loader2 } from 'lucide-react';

export default function AddIaModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { isValid } } = useForm({
    mode: 'onChange',
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

  // Register Select field for validation
  useEffect(() => {
    register('partnershipPksId', { required: true });
  }, [register]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    dispatch(asyncAddImplementationAgreement({ ...data, typeId: accessTypeId }))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
  };

  const handleRedirectToNomorSurat = () => {
    setOpenLetterModal(true);
  };

  const handleNomorSuratSuccess = ({
    letterNumberId,
    letterReferenceNumber,
  }) => {
    setLetterReferenceNumber(letterReferenceNumber);
    setValue('partnershipLetterNumberId', letterNumberId, { shouldValidate: true });
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document.activeElement.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Tambah Data IA
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto"
            ref={dropdownRef}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PkS <span className="text-red-500">*</span>
                </label>
                <Select
                  name="partnershipPksId"
                  options={selectOptions}
                  placeholder="Cari & pilih PkS"
                  onInputChange={setQuery}
                  onChange={(option) => {
                    setSelected(option);
                    setValue('partnershipPksId', option ? option.value : null, { shouldValidate: true });
                  }}
                  isClearable
                  isSearchable
                  value={selected}
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
              <TextField
                name="iaYearOfImplementation"
                label="Tahun Implementasi Kerjasama"
                placeholder="Masukkan tahun implementasi"
                register={register}
                isRequired={true}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Harus berupa angka",
                  },
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SingleSelectDropdown
                name="programId"
                label="Program Kerjasama"
                options={PROGRAM_OPTIONS}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <SingleSelectDropdown
                name="batchId"
                label="Batch Program"
                options={BATCH_OPTIONS}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SingleSelectDropdownBadge
                name="partnershipStatusId"
                label="Status SPK"
                options={STATUS_OPTIONS}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <RedirectTextField
                label="Nomor Surat BCF"
                value={letterReferenceNumber}
                onRedirect={handleRedirectToNomorSurat}
                isRequired={true}
              />
            </div>

            <TextField
              name="iaLetterNumberPartner"
              label="Nomor Surat Mitra"
              placeholder="Masukkan nomor surat mitra"
              register={register}
              isRequired={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextField
                name="iaNameOfBcf"
                label="Nama Pihak BCF"
                placeholder="Masukkan nama pihak BCF"
                register={register}
                isRequired={true}
              />
              <TextField
                name="iaNameOfPartner"
                label="Nama Pihak Mitra"
                placeholder="Masukkan nama pihak mitra"
                register={register}
                isRequired={true}
              />
            </div>

            <TextField
              name="iaDocumentUrl"
              label="Link File IA"
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

      <AddModalLetterNumbering
        isOpen={openLetterModal}
        onClose={() => setOpenLetterModal(false)}
        onSuccess={handleNomorSuratSuccess}
        partnershipLetterNumberTypeId={5}
      />
    </>
  );
}
