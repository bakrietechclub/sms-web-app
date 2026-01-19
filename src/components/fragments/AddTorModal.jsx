import React, { useEffect, useState, useRef } from 'react';
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
import { X, Loader2 } from 'lucide-react';
import { calculateDueDate } from '../../utils/dateHelpers';

export default function AddTorModal({ isOpen, onClose, accessTypeId }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { isValid } } = useForm({
    mode: 'onChange',
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

  // Register optional Select fields
  useEffect(() => {
    register('partnershipIaId');
    register('partnershipPksId');
  }, [register]);

  // Auto-calculate torDueDate based on torSignatureDate + torTimePeriod (in years)
  const torSignatureDate = watch('torSignatureDate');
  const torTimePeriod = watch('torTimePeriod');

  useEffect(() => {
    const dueDate = calculateDueDate(torSignatureDate, torTimePeriod);
    if (dueDate) {
      setValue('torDueDate', dueDate, { shouldValidate: true });
    }
  }, [torSignatureDate, torTimePeriod, setValue]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    dispatch(asyncAddTor({ ...data, typeId: accessTypeId }))
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
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
    dispatch(
      asyncGetImplementationAgreementsOptions({
        query: query.ia,
        typeId: accessTypeId,
      })
    );
  }, [dispatch, query.ia]);

  useEffect(() => {
    dispatch(asyncGetPksOptions({ query: query.pks, typeId: accessTypeId }));
  }, [dispatch, query.pks]);

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
              Tambah Data TOR
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
                  IA (Opsional)
                </label>
                <Select
                  name="partnershipIaId"
                  options={formattedIaOptions}
                  placeholder="Cari & pilih IA"
                  onInputChange={(val) =>
                    setQuery((prev) => ({ ...prev, ia: val }))
                  }
                  onChange={(option) => {
                    setSelectedIA(option);
                    setValue('partnershipIaId', option ? option.value : null, { shouldValidate: true });
                  }}
                  isClearable
                  isSearchable
                  value={selectedIA}
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PkS (Opsional)
                </label>
                <Select
                  name="partnershipPksId"
                  options={formattedPksOptions}
                  placeholder="Cari & pilih PkS"
                  onInputChange={(val) =>
                    setQuery((prev) => ({ ...prev, pks: val }))
                  }
                  onChange={(option) => {
                    setSelectedPkS(option);
                    setValue('partnershipPksId', option ? option.value : null, { shouldValidate: true });
                  }}
                  isClearable
                  isSearchable
                  value={selectedPkS}
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
            </div>

            <TextField
              name="torDetailPartnership"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
              isRequired={true}
            />

            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status TOR"
              options={STATUS_OPTIONS}
              register={register}
              setValue={setValue}
              isRequired={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextField
                name="torNameofBcf"
                label="Nama Pihak BCF"
                placeholder="Masukkan nama pihak BCF"
                register={register}
                isRequired={true}
              />
              <TextField
                name="torNameOfPartner"
                label="Nama Pihak Mitra"
                placeholder="Masukkan nama pihak mitra"
                register={register}
                isRequired={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <DatePickerField
                name="torSignatureDate"
                label="Tanggal Tanda Tangan"
                className="w-full"
                placeholder="Masukkan tanggal"
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <TextField
                name="torTimePeriod"
                label="Jangka Waktu (Tahun)"
                placeholder="Masukkan jangka waktu"
                register={register}
                isRequired={true}
              />
              <DatePickerField
                name="torDueDate"
                label="Jatuh Tempo"
                className="w-full"
                placeholder="Masukkan jatuh tempo"
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <TextField
              name="torDocumentUrl"
              label="Link File TOR"
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
    </>
  );
}
