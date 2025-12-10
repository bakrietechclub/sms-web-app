import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MultiSelectDropdown = ({
  label,
  name,
  options,
  register,
  setValue,
  isRequired = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tempSelected, setTempSelected] = useState([]);

  useEffect(() => {
    const initialValue = register(name).value;
    if (initialValue && typeof initialValue === 'string') {
      const initialSelected = initialValue
        .split(', ')
        .filter((item) => item !== '');
      setSelected(initialSelected);
      setTempSelected(initialSelected);
    }
  }, [name, register]);

  const toggleDropdown = () => {
    if (!open) {
      setTempSelected(selected);
    }
    setOpen((prev) => !prev);
  };

  const handleChange = (option) => {
    setTempSelected((prev) =>
      prev.includes(option.id)
        ? prev.filter((item) => item !== option.id)
        : [...prev, option.id]
    );
  };

  const confirmSelection = () => {
    setSelected(tempSelected);
    setValue(name, tempSelected);
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
          value={options
            .filter((option) => selected.includes(option.id))
            .map((option) => option.label)
            .join(', ')}
          placeholder={`Pilih ${label.toLowerCase()}`}
          {...register(name, { required: isRequired })}
          onClick={toggleDropdown}
          className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>
      {open && (
        <div
          className="
            z-20 mt-2
            border border-gray-300 rounded shadow-lg bg-white
            w-full
            max-h-60 overflow-y-auto
            left-0 right-0
          "
        >
          <div className="sticky top-0 bg-white p-2 flex justify-end">
            <button
              type="button"
              onClick={confirmSelection}
              className="text-[#0D4690] hover:text-[#395476] font-medium py-1.5 px-4 text-sm transition-colors duration-200 cursor-pointer"
            >
              Konfirmasi
            </button>
          </div>

          <div className="flex flex-col">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempSelected.includes(option.id)}
                  onChange={() => handleChange(option)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div
                  className={`
                    flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200 ease-in-out flex-shrink-0
                    ${tempSelected.includes(option.id)
                      ? 'bg-[#E89229] border-[#E89229]'
                      : 'bg-white border-gray-300'
                    }
                  `}
                >
                  {tempSelected.includes(option.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </div>
                <span className="ml-2 select-none">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
