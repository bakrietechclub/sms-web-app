import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const MultiSelectDropdown = ({ label, name, options, register, setValue, isRequired = false }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tempSelected, setTempSelected] = useState([]);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleChange = (option) => {
    setTempSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const confirmSelection = () => {
    setSelected(tempSelected);
    setValue(name, tempSelected.join(", "));
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
          value={selected.join(", ")}
          placeholder={`Pilih ${label.toLowerCase()}`}
          {...register(name)}
          onClick={toggleDropdown}
          className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>
      {open && (
        <div className="flex mt-2 border border-gray-300 rounded w-120">
          <div className="flex-row">
          {options.map((option) => (
            <label key={option} className="block px-3 py-2 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={tempSelected.includes(option)}
                onChange={() => handleChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}</div>
          <div className="ml-auto pr-2 flex items-start">
          <button
            type="button"
            onClick={confirmSelection}
            className="text-blue-900 px-3 text-sm pt-2.5 cursor-pointer"
          >
            Konfirmasi
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;