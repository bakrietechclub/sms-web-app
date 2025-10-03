import { useState } from 'react';
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
};

const SingleSelectDropdownBadge = ({
  label,
  name,
  options,
  register,
  setValue,
  isRequired,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setValue(name, option.id);
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
          value={selected ? selected.label : ''}
          placeholder={`Pilih ${label.toLowerCase()}`}
          {...register(name)}
          onClick={toggleDropdown}
          className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer text-base"
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>
      {open && (
        <div className="mt-2 border border-gray-300 rounded max-h-64 overflow-y-auto bg-white shadow-sm z-10 relative flex flex-col gap-2 p-2">
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
  );
};

export default SingleSelectDropdownBadge;
