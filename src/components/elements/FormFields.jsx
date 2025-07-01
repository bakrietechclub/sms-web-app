import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export const TextField = ({ label, register, name, placeholder, className = "" }) => {
  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...register(name)}
        placeholder={placeholder}
        className={`w-full border border-gray-300 px-3 py-2 rounded ${className}`}
      />
    </div>
  );
};

export const SingleSelectDropdown = ({
  label,
  name,
  register,
  options = [],
  value,
  onSelect,
  placeholder = "Pilih opsi",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          readOnly
          {...register(name)}
          value={value}
          onClick={() => setIsOpen((prev) => !prev)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer ${className}`}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 border border-gray-300 rounded max-h-60 overflow-y-auto z-10 bg-white absolute w-full">
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

export const MultiSelectDropdown = ({
  label,
  name,
  register,
  selectedValues = [],
  onChange,
  options = [],
  placeholder = "Pilih opsi",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState([...selectedValues]);

  const handleOptionToggle = (option) => {
    setTempSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleConfirm = () => {
    onChange(tempSelected);
    setIsOpen(false);
  };

  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          readOnly
          {...register(name)}
          value={selectedValues.join(", ")}
          onClick={() => setIsOpen((prev) => !prev)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer ${className}`}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 border border-gray-300 rounded z-10 bg-white w-full absolute">
          <button
            type="button"
            onClick={handleConfirm}
            className="text-blue-900 text-sm py-1 px-3 float-right"
          >
            Konfirmasi
          </button>
          <div className="clear-both px-2 py-2 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="block px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempSelected.includes(option)}
                  onChange={() => handleOptionToggle(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ContactFields = ({ register }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block mb-1 font-medium">Nama Kontak</label>
        <input
          {...register("namaKontak")}
          type="text"
          placeholder="Masukkan nama"
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Jabatan</label>
        <input
          {...register("jabatanKontak")}
          type="text"
          placeholder="Masukkan jabatan"
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">No HP</label>
        <input
          {...register("noHpKontak")}
          type="tel"
          placeholder="Masukkan no HP"
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          {...register("emailKontak")}
          type="email"
          placeholder="Masukkan email"
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
    </div>
  );
};

export const SwotFields = ({ register }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block mb-1 font-medium">Strength</label>
        <textarea
          {...register("swot.strength")}
          placeholder="Kekuatan"
          rows={4}
          className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Weakness</label>
        <textarea
          {...register("swot.weakness")}
          placeholder="Kelemahan"
          rows={4}
          className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Opportunity</label>
        <textarea
          {...register("swot.opportunity")}
          placeholder="Peluang"
          rows={4}
          className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Threat</label>
        <textarea
          {...register("swot.threat")}
          placeholder="Ancaman"
          rows={4}
          className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
        />
      </div>
    </div>
  );
};



