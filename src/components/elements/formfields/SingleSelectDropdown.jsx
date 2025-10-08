import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SingleSelectDropdown = ({
  label,
  name,
  options,
  register,
  setValue,
  isRequired = false,
  onClick,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    if (onClick) onClick();
  };

  const handleSelect = (value) => {
    setSelected(value.label);
    setValue(name, value.id);
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
          value={selected}
          placeholder={`Pilih ${label.toLowerCase()}`}
          {...register(name)}
          onClick={toggleDropdown}
          className="w-full border border-gray-300 font-normal px-3 py-2 rounded pr-8 cursor-pointer"
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>
      {open && (
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
