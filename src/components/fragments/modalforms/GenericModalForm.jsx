import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export function GenericModalForm({ isOpen, onClose, onSubmit, fields, title }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [dropdownState, setDropdownState] = useState({});
  const [tempMultiSelect, setTempMultiSelect] = useState({});

  const dropdownRefs = useRef({});

  useEffect(() => {
    function handleClickOutside(event) {
      for (const key in dropdownRefs.current) {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
          setDropdownState((prev) => ({ ...prev, [key]: false }));
          // Reset tempMultiSelect for dropdowns that are multi-select and not confirmed yet
          if (tempMultiSelect[key]) {
            setTempMultiSelect((prev) => ({ ...prev, [key]: prev[key] || [] }));
          }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tempMultiSelect]);

  if (!isOpen) return null;

  const toggleDropdown = (key) => {
    setDropdownState((prev) => ({ ...prev, [key]: !prev[key] }));
    // initialize temp multi select if multi-select dropdown
    if (fields.find(f => f.name === key && f.type === "multiselect") && !tempMultiSelect[key]) {
      setTempMultiSelect((prev) => ({ ...prev, [key]: watch(key) ? watch(key).split(", ") : [] }));
    }
  };

  const handleMultiSelectChange = (fieldName, option) => {
    setTempMultiSelect((prev) => {
      const selected = prev[fieldName] || [];
      if (selected.includes(option)) {
        return { ...prev, [fieldName]: selected.filter((o) => o !== option) };
      } else {
        return { ...prev, [fieldName]: [...selected, option] };
      }
    });
  };

  const confirmMultiSelect = (fieldName) => {
    const selected = tempMultiSelect[fieldName] || [];
    setValue(fieldName, selected.join(", "));
    setDropdownState((prev) => ({ ...prev, [fieldName]: false }));
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-40" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          style={{ maxHeight: "900px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] bg-white px-6 flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-xl font-bold">{title || "Form"}</h2>
            <button className="text-2xl text-gray-600 hover:text-black" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="px-6 py-4 overflow-y-auto" style={{ height: "calc(900px - 92px)" }}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {fields.map(({ label, name, type, placeholder, options }, i) => {
                if (type === "text") {
                  return (
                    <div key={name}>
                      <label>{label}</label>
                      <input
                        {...register(name)}
                        placeholder={placeholder}
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                      />
                    </div>
                  );
                }

                if (type === "single-select") {
                  return (
                    <div key={name}>
                      <label className="block mb-1 font-medium">{label}</label>
                      <div className="relative" ref={(el) => (dropdownRefs.current[name] = el)}>
                        <input
                          {...register(name)}
                          placeholder={placeholder}
                          readOnly
                          value={watch(name) || ""}
                          className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
                          onClick={() => toggleDropdown(name)}
                        />
                        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                          {dropdownState[name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {dropdownState[name] && (
                          <div className="mt-2 border border-gray-300 rounded max-h-72 overflow-y-auto bg-white z-20 absolute w-full">
                            {options.map((option) => (
                              <div
                                key={option}
                                onClick={() => {
                                  setValue(name, option);
                                  setDropdownState((prev) => ({ ...prev, [name]: false }));
                                }}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                if (type === "multiselect") {
                  return (
                    <div key={name}>
                      <label className="block mb-1 font-medium">{label}</label>
                      <div className="relative" ref={(el) => (dropdownRefs.current[name] = el)}>
                        <input
                          readOnly
                          {...register(name)}
                          placeholder={placeholder}
                          value={watch(name) || ""}
                          className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
                          onClick={() => toggleDropdown(name)}
                        />
                        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                          {dropdownState[name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {dropdownState[name] && (
                          <div className="mt-2 border border-gray-300 rounded w-full bg-white max-h-72 overflow-y-auto absolute z-20">
                            <button
                              type="button"
                              onClick={() => confirmMultiSelect(name)}
                              className="text-blue-900 pl-4 text-sm py-1"
                            >
                              Konfirmasi
                            </button>
                            {options.map((option) => (
                              <label key={option} className="block px-3 py-1 hover:bg-gray-100 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={tempMultiSelect[name]?.includes(option) || false}
                                  onChange={() => handleMultiSelectChange(name, option)}
                                  className="mr-2"
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                if (type === "contact-group") {
                  return (
                    <div key={name}>
                      <label>{label}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {options.map(({ label: lbl, name: n }) => (
                          <input
                            key={n}
                            {...register(`${name}.${n}`)}
                            placeholder={lbl}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}

              <div className="text-right pt-4">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
