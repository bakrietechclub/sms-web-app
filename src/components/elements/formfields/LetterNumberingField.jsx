import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetSubClassifications } from '../../../states/features/letter/letterThunks';
import { selectSubClassifications } from '../../../states/features/letter/letterSelectors';
import { LETTER_OPTIONS, PROGRAM_OPTIONS } from '../../../utils';

// === CONSTANTS ===
const MONTHS_MAP = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', Mei: '05', Jun: '06',
  Jul: '07', Agu: '08', Sep: '09', Okt: '10', Nov: '11', Des: '12',
};

const MONTH_NAMES = Object.keys(MONTHS_MAP);

// === HELPERS ===
const getFormattedDate = (monthName, year) => {
  if (!monthName || !year) return '';
  return `${year}-${MONTHS_MAP[monthName]}-01`;
};

// === COMPONENT: LetterNumberingField ===
export default function LetterNumberingField() {
  const dispatch = useDispatch();
  const subClassifications = useSelector(selectSubClassifications);
  const { register, setValue, control } = useFormContext();

  // Watch form values needed for logic/display
  // Watch form values needed for logic/display
  const { letterClass, month, year, subClassification, program } = useWatch({ control });

  // Local UI State for Dropdowns
  const [openDropdown, setOpenDropdown] = useState(null); // 'letterClass', 'subClassification', 'program', 'month' or null

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const closeDropdown = () => setOpenDropdown(null);

  // Initial Registration
  useEffect(() => {
    ['letterClass', 'subClassification', 'program', 'month', 'year'].forEach((field) => {
      register(field, { required: true });
    });
  }, [register]);

  // Reset Sub-Classification when Class changes
  useEffect(() => {
    setValue('subClassification', '', { shouldValidate: true });
    setValue('partnershipLetterNumberSubClassificationId', '');
  }, [letterClass, setValue]);

  // === HANDLERS ===
  const handleSelectClass = (option) => {
    setValue('letterClass', option.label, { shouldValidate: true });
    dispatch(asyncGetSubClassifications({ id: option.id }));
    closeDropdown();
  };

  const handleSelectSubClass = (option) => {
    setValue('subClassification', option.label, { shouldValidate: true });
    setValue('partnershipLetterNumberSubClassificationId', option.id);
    closeDropdown();
  };

  const handleSelectProgram = (option) => {
    setValue('program', option.label, { shouldValidate: true });
    setValue('masterSecondTierProgramId', option.id);
    closeDropdown();
  };

  const handleSelectMonth = (monthName) => {
    setValue('month', monthName, { shouldValidate: true });
    const date = getFormattedDate(monthName, year);
    if (date) setValue('letterNumberDate', date);
    closeDropdown();
  };

  const handleChangeYear = (e) => {
    const val = e.target.value;
    setValue('year', val, { shouldValidate: true });
    const date = getFormattedDate(month, val);
    if (date) setValue('letterNumberDate', date);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium text-base">
        Penomoran Surat <span className="text-red-500">*</span>
      </label>

      {/* Auto-generated Letter Number Display */}
      <input
        {...register('letterNumber')}
        placeholder="Nomor Surat (auto)"
        readOnly
        disabled
        className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 text-gray-500"
      />

      {/* Class & Sub-Class Selection */}
      <div className="grid grid-cols-2 gap-4">
        <DropdownField
          label="Kelas"
          value={letterClass}
          options={LETTER_OPTIONS}
          isOpen={openDropdown === 'letterClass'}
          onToggle={() => toggleDropdown('letterClass')}
          onSelect={handleSelectClass}
        />

        <DropdownField
          label="Sub Klasifikasi"
          value={subClassification}
          options={subClassifications}
          isOpen={openDropdown === 'subClassification'}
          disabled={!letterClass}
          onToggle={() => toggleDropdown('subClassification')}
          onSelect={handleSelectSubClass}
        />
      </div>

      {/* Program Selection */}
      <DropdownField
        label="Program"
        value={program}
        options={PROGRAM_OPTIONS}
        isOpen={openDropdown === 'program'}
        onToggle={() => toggleDropdown('program')}
        onSelect={handleSelectProgram}
      />

      {/* Month & Year Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            {...register('month')}
            placeholder="Bulan"
            readOnly
            value={month || ''}
            onClick={() => toggleDropdown('month')}
            className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
          />
          <ChevronIcon isOpen={openDropdown === 'month'} />

          {openDropdown === 'month' && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 p-2 grid grid-cols-3 gap-2 z-20 border rounded-md">
              {MONTH_NAMES.map((m) => (
                <div
                  key={m}
                  onClick={() => handleSelectMonth(m)}
                  className={`text-center text-sm py-1 rounded cursor-pointer transition-colors ${month === m ? 'bg-blue-900 text-white' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          {...register('year')}
          placeholder="Tahun"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleChangeYear}
        />
      </div>
    </div>
  );
}

// === REUSABLE SUB-COMPONENTS ===

function DropdownField({ label, value, options, isOpen, onToggle, onSelect, disabled }) {
  return (
    <div className="relative">
      <input
        placeholder={label}
        readOnly
        disabled={disabled}
        value={value || ''}
        onClick={!disabled ? onToggle : undefined}
        className={`w-full border px-3 py-2 rounded pr-8 transition-colors ${disabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
          : 'border-gray-300 cursor-pointer bg-white focus:ring-2 focus:ring-blue-500'
          }`}
      />
      <ChevronIcon isOpen={isOpen} />

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg mt-1 z-20 max-h-60 overflow-y-auto">
          {options?.length > 0 ? (
            options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => onSelect(opt)}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition-colors"
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">Tidak ada opsi</div>
          )}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ isOpen }) {
  const Icon = isOpen ? ChevronDown : ChevronRight;
  return (
    <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-500">
      <Icon size={16} />
    </div>
  );
}
