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
import { X, Loader2 } from 'lucide-react';
import { calculateDueDate } from '../../utils/dateHelpers';

export default function AddPksModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
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

  // Register Select field for validation
  useEffect(() => {
    register('partnershipMouId', { required: true });
  }, [register]);

  // Auto-calculate pksDueDate based on pksSignatureDate + pksTimePeriod (in years)
  const pksSignatureDate = watch('pksSignatureDate');
  const pksTimePeriod = watch('pksTimePeriod');

  useEffect(() => {
    const dueDate = calculateDueDate(pksSignatureDate, pksTimePeriod);
    if (dueDate) {
      setValue('pksDueDate', dueDate, { shouldValidate: true });
    }
  }, [pksSignatureDate, pksTimePeriod, setValue]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    dispatch(asyncAddPks({ ...data, typeId: accessTypeId }))
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
    setValue('partnershipLetterNumberId', letterNumberId, {
      shouldValidate: true,
    });
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
        className='fixed inset-0 z-40 bg-black opacity-40'
        onClick={onClose}
      />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className='bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='px-5 py-4 flex items-center justify-between border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Tambah Data PKS
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg'
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto'
            ref={dropdownRef}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  MoU <span className='text-red-500'>*</span>
                </label>
                <Select
                  name='partnershipMouId'
                  options={selectOptions}
                  placeholder='Cari & pilih MoU'
                  onInputChange={setQuery}
                  onChange={(option) => {
                    setSelected(option);
                    setValue('partnershipMouId', option ? option.value : null, {
                      shouldValidate: true,
                    });
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
                name='pksInstituteDivision'
                label='Divisi / Fakultas'
                placeholder='Masukkan divisi'
                register={register}
                isRequired={true}
              />
            </div>

            <TextField
              name='pksDetailPartnership'
              label='Detail Kerjasama'
              placeholder='Masukkan detail kerjasama'
              register={register}
              isRequired={true}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <SingleSelectDropdownBadge
                name='partnershipStatusId'
                label='Status PkS'
                options={STATUS_OPTIONS}
                register={register}
                setValue={setValue}
                isRequired
              />
              <RedirectTextField
                label='Nomor Surat BCF'
                value={letterReferenceNumber}
                onRedirect={handleRedirectToNomorSurat}
                isRequired
              />
            </div>

            <TextField
              name='pksPartnerLetterNumber'
              label='Nomor Surat Mitra'
              placeholder='Masukkan nomor surat mitra'
              register={register}
              isRequired={true}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <TextField
                name='pksNameofBcf'
                label='Nama Pihak BCF'
                placeholder='Masukkan nama pihak BCF'
                register={register}
                isRequired={true}
              />
              <TextField
                name='pksNameOfPartner'
                label='Nama Pihak Mitra'
                placeholder='Masukkan nama pihak mitra'
                register={register}
                isRequired={true}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              <DatePickerField
                name='pksSignatureDate'
                label='Tanggal Tanda Tangan'
                className='w-full'
                placeholder='Masukkan tanggal'
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <TextField
                name='pksTimePeriod'
                label='Jangka Waktu (Tahun)'
                placeholder='Masukkan jangka waktu'
                register={register}
                isRequired={true}
              />
              <DatePickerField
                name='pksDueDate'
                label='Jatuh Tempo'
                className='w-full'
                placeholder='Masukkan jatuh tempo'
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <TextField
              name='pksDocumentUrl'
              label='Link File MoU'
              placeholder='https://..'
              register={register}
              isRequired={true}
            />
            <TextField
              name='pksNote'
              label='Catatan Tambahan'
              placeholder='Masukkan catatan tambahan'
              register={register}
              isRequired={false}
            />

            {/* Footer with Buttons */}
            <div className='flex justify-end gap-3 pt-2 border-t border-gray-200 mt-4'>
              <button
                type='button'
                onClick={onClose}
                disabled={isSubmitting}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Batal
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !isValid}
                className='px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center'
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={16}
                      className='animate-spin'
                    />
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
