import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChevronDown, ChevronRight } from 'lucide-react';

const badgeColorMap = {
  'Sudah dikontak': 'bg-green-100 text-green-800',
  Selesai: 'bg-green-100 text-green-800',
  'Belum dikontak': 'bg-red-100 text-red-800',
  'Belum Audiensi': 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  'Re-Audiensi': 'bg-yellow-100 text-yellow-800',
  'Dalam Proses': 'bg-blue-100 text-blue-800',
  Online: 'bg-[#e7fafe] text-[#0dcaf0]',
  Offline: 'bg-gray-100 text-gray-800',
  'Join Grup': 'bg-green-100 text-green-800',
  'Belum Join Grup': 'bg-red-100 text-red-800',
  Aktif: 'bg-green-100 text-green-800',
  'Tidak Aktif': 'bg-red-100 text-red-800',
};

// Sama seperti SingleSelectDropdown: nilai terpilih SELALU dibaca lewat
// `useWatch`, tidak lagi disimpan sebagai state lokal terpisah yang gampang
// desync dari react-hook-form saat form re-render karena hal lain.
const SingleSelectDropdownBadge = ({
  label,
  name,
  options = [],
  register: registerProp,
  setValue: setValueProp,
  control: controlProp,
  isRequired,
}) => {
  const methods = useFormContext();
  const register = registerProp || methods?.register;
  const setValue = setValueProp || methods?.setValue;
  const control = controlProp || methods?.control;
  const errors = methods?.formState?.errors;
  const fieldError = errors?.[name];

  const [open, setOpen] = useState(false);
  const currentValue = useWatch({ control, name });
  const selectedOption = options.find((o) => o.id === currentValue) || null;

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    setValue(name, option.id, { shouldValidate: true });
    setOpen(false);
  };

  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          readOnly
          value={selectedOption ? selectedOption.label : ''}
          placeholder={`Pilih ${label.toLowerCase()}`}
          {...register(name, { required: isRequired })}
          onClick={toggleDropdown}
          className={`w-full border px-3 py-2 rounded pr-8 cursor-pointer text-base ${
            fieldError ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        {open && (
          <div className="absolute top-full left-0 w-full mt-1 border border-gray-300 rounded max-h-64 overflow-y-auto bg-white shadow-lg z-50 flex flex-col gap-2 p-2">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`text-sm px-3 py-1 rounded-full cursor-pointer w-fit
            ${badgeColorMap[option.label] || 'bg-gray-200 text-gray-800'}
            hover:ring-2 hover:ring-offset-1 hover:ring-blue-400`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {fieldError && (
        <p className="mt-1 text-xs text-red-500">
          {fieldError.message || `${label} wajib diisi.`}
        </p>
      )}
    </div>
  );
};

export default SingleSelectDropdownBadge;
