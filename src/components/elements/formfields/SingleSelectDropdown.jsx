import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SingleSelectDropdown = ({
  label,
  name,
  options,
  register,
  setValue,
  isRequired = false,
  onClick,
  defaultValue,
  disabled = false,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (defaultValue && options) {
      const option = options.find((opt) => opt.id === defaultValue);
      if (option) {
        setSelected(option.label);
        return;
      }
    }
    // `options` berubah (mis. Batch difilter ulang setelah ganti Program)
    // dan pilihan lama tidak ada lagi di daftar baru -- bersihkan tampilan
    // supaya tidak menampilkan label batch yang sudah tidak relevan.
    setSelected('');
  }, [defaultValue, options]);

  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
    if (onClick) onClick();
  };

  const handleSelect = (value) => {
    setSelected(value.label);
    setValue(name, value.id, { shouldValidate: true });
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
          value={selected}
          placeholder={placeholder || `Pilih ${label.toLowerCase()}`}
          {...register(name, { required: isRequired })}
          onClick={toggleDropdown}
          className={`w-full border border-gray-300 font-normal px-3 py-2 rounded pr-8 ${
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
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 hover:bg-[#e7edf4] cursor-pointer hover:text-[#0c3f82]"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
