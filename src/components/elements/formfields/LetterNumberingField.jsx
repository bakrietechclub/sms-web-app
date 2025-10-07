import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetSubClassifications } from '../../../states/features/letter/letterThunks';
import { selectSubClassifications } from '../../../states/features/letter/letterSelectors';

// === STATIC OPTIONS ===
const LETTER_CLASSES = [
  { id: 1, label: 'Administrasi' },
  { id: 2, label: 'Finance' },
];

const PROGRAM_OPTIONS = [
  { id: 1, label: 'LEAD' },
  { id: 2, label: 'CLP' },
  { id: 3, label: 'HOL' },
  { id: 4, label: 'BCF' },
];

const MONTHS = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  Mei: '05',
  Jun: '06',
  Jul: '07',
  Agu: '08',
  Sep: '09',
  Okt: '10',
  Nov: '11',
  Des: '12',
};

// === HELPERS ===
function getLetterNumberDate(month, year) {
  if (!month || !year) return '';
  return `${year}-${MONTHS[month]}-01`;
}

export default function LetterNumberingField() {
  const dispatch = useDispatch();
  const subClassifications = useSelector(selectSubClassifications);
  const { register, setValue, control } = useFormContext();

  // === WATCH FORM VALUES ===
  const { kelas, bulan, tahun } = useWatch({ control });

  // === UI STATE (LOCAL) ===
  const [dropdown, setDropdown] = useState({
    kelas: false,
    subKlasifikasi: false,
    bulan: false,
    program: false,
  });

  // === HANDLERS ===
  const toggleDropdown = (key) =>
    setDropdown((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSelectClass = (opt) => {
    setValue('kelas', opt.label);
    setValue('subKlasifikasi', '');
    toggleDropdown('kelas');
    dispatch(asyncGetSubClassifications({ id: opt.id }));
  };

  const handleSelectSubClass = (opt) => {
    setValue('subKlasifikasi', opt.label);
    setValue('partnershipLetterNumberSubClassificationId', opt.id);
    toggleDropdown('subKlasifikasi');
  };

  const handleSelectProgram = (opt) => {
    setValue('program', opt.label);
    setValue('masterSecondTierProgramId', opt.id);
    toggleDropdown('program');
  };

  const handleSelectMonth = (month) => {
    setValue('bulan', month);
    toggleDropdown('bulan');
    const date = getLetterNumberDate(month, tahun);
    if (date) setValue('letterNumberDate', date);
  };

  const handleChangeYear = (e) => {
    const y = e.target.value;
    setValue('tahun', y);
    const date = getLetterNumberDate(bulan, y);
    if (date) setValue('letterNumberDate', date);
  };

  // === EFFECTS ===
  // Reset subclassifications when class changes
  useEffect(() => {
    setValue('subKlasifikasi', '');
    setValue('partnershipLetterNumberSubClassificationId', '');
  }, [kelas]);

  return (
    <div className="flex flex-col gap-4">
      {/* === LABEL === */}
      <label className="font-medium text-base">
        Penomoran Surat <span className="text-red-500">*</span>
      </label>

      {/* === READONLY LETTER NUMBER === */}
      <input
        {...register('letterNumber')}
        placeholder="Nomor Surat (auto)"
        readOnly
        disabled
        className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 text-gray-500"
      />

      {/* === CLASS & SUBCLASS === */}
      <div className="grid grid-cols-2 gap-4">
        {/* === KELAS === */}
        <DropdownInput
          label="Kelas"
          value={kelas}
          options={LETTER_CLASSES}
          isOpen={dropdown.kelas}
          onToggle={() => toggleDropdown('kelas')}
          onSelect={handleSelectClass}
        />

        {/* === SUB KLASIFIKASI === */}
        <DropdownInput
          label="Sub Klasifikasi"
          value={useWatch({ control, name: 'subKlasifikasi' })}
          options={subClassifications}
          isOpen={dropdown.subKlasifikasi}
          disabled={!kelas}
          onToggle={() => toggleDropdown('subKlasifikasi')}
          onSelect={handleSelectSubClass}
        />
      </div>

      {/* === PROGRAM === */}
      <DropdownInput
        label="Program"
        value={useWatch({ control, name: 'program' })}
        options={PROGRAM_OPTIONS}
        isOpen={dropdown.program}
        onToggle={() => toggleDropdown('program')}
        onSelect={handleSelectProgram}
      />

      {/* === BULAN & TAHUN === */}
      <div className="grid grid-cols-2 gap-4">
        {/* === BULAN === */}
        <div className="relative">
          <input
            {...register('bulan')}
            placeholder="Bulan"
            readOnly
            value={bulan || ''}
            onClick={() => toggleDropdown('bulan')}
            className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
          />
          <ChevronIcon open={dropdown.bulan} />
          {dropdown.bulan && (
            <div className="w-full bg-white shadow-lg mt-1 p-2 grid grid-cols-3 gap-2">
              {Object.keys(MONTHS).map((m) => (
                <div
                  key={m}
                  onClick={() => handleSelectMonth(m)}
                  className={`text-center text-sm py-1 rounded cursor-pointer ${
                    bulan === m
                      ? 'bg-blue-900 text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === TAHUN === */}
        <input
          {...register('tahun')}
          placeholder="Tahun"
          className="w-full border border-gray-300 px-3 py-2 rounded"
          onChange={handleChangeYear}
        />
      </div>
    </div>
  );
}

// === SMALL SUBCOMPONENTS ===
function DropdownInput({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  disabled,
}) {
  return (
    <div>
      <div className="relative">
        <input
          placeholder={label}
          readOnly
          disabled={disabled}
          value={value || ''}
          onClick={!disabled ? onToggle : undefined}
          className={`w-full border px-3 py-2 rounded pr-8 ${
            disabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'border-gray-300 cursor-pointer'
          }`}
        />
        <ChevronIcon open={isOpen} />
      </div>
      {isOpen && !disabled && (
        <div className="w-full bg-white border rounded shadow-lg mt-1 z-10">
          {options?.map((opt) => (
            <div
              key={opt.id}
              onClick={() => onSelect(opt)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }) {
  const Icon = open ? ChevronDown : ChevronRight;
  return (
    <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none z-10">
      <Icon size={16} />
    </div>
  );
}
