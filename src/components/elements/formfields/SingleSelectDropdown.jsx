import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const SingleSelectDropdown = ({ label, name, options, register, setValue }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (value) => {
    setSelected(value);
    setValue(name, value);
    setOpen(false);
  };

  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          readOnly
          value={selected}
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
        <div className="mt-2 border border-gray-300 rounded max-h-64 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown;