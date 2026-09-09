import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChevronDown, ChevronRight } from 'lucide-react';

/**
 * PENTING: tampilan field ini SELALU diturunkan dari nilai react-hook-form
 * (`useWatch`), BUKAN disimpan sebagai salinan di `useState` lokal seperti
 * versi lama. Versi lama menyimpan `selected` di state sendiri lalu
 * mensinkronkannya lewat `useEffect([defaultValue, options])` -- karena
 * `options` adalah array baru di setiap render induk, dan banyak field lain
 * di form yang sama TIDAK mengirim `defaultValue`, field ini jadi rawan balik
 * kosong/ke nilai lama begitu bagian LAIN dari form berubah (mis. field lain
 * dipilih, data async masuk) memicu re-render induk. Dengan `useWatch`, tidak
 * ada state kedua yang bisa desync dari form -- apa pun yang bikin induk
 * re-render, field ini tetap menampilkan nilai RHF yang sebenarnya.
 */
const SingleSelectDropdown = ({
  label,
  name,
  options = [],
  register: registerProp,
  setValue: setValueProp,
  control: controlProp,
  isRequired = false,
  disabled = false,
  placeholder,
  onClick,
}) => {
  const methods = useFormContext();
  const register = registerProp || methods?.register;
  const setValue = setValueProp || methods?.setValue;
  const control = controlProp || methods?.control;
  const errors = methods?.formState?.errors;
  const fieldError = errors?.[name];

  const [open, setOpen] = useState(false);
  const currentValue = useWatch({ control, name });
  const selectedOption = options.find((opt) => opt.id === currentValue) || null;

  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
    if (onClick) onClick();
  };

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
          disabled={disabled}
          value={selectedOption?.label || ''}
          placeholder={placeholder || `Pilih ${label?.toLowerCase()}`}
          {...register(name, { required: isRequired })}
          onClick={toggleDropdown}
          className={`w-full border px-3 py-2 rounded pr-8 ${
            fieldError ? 'border-red-400' : 'border-gray-300'
          } ${
            disabled
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'cursor-pointer'
          }`}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>
      {open && !disabled && (
        <div className="mt-2 border border-gray-300 rounded max-h-64 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 hover:bg-[#e7edf4] cursor-pointer hover:text-[#0c3f82]"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">Tidak ada opsi</div>
          )}
        </div>
      )}
      {fieldError && (
        <p className="mt-1 text-xs text-red-500">
          {fieldError.message || `${label} wajib diisi.`}
        </p>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
