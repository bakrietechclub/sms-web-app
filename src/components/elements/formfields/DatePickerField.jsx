import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePickerField = ({ name = "tanggal", label = "Tanggal" }) => {
  const { register, setValue, watch } = useFormContext();
  const selectedDate = watch(name);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    setValue(name, date);
    setIsOpen(false);
  };

  return (
    <div className="w-120 flex flex-col">
      <label className="block mb-1 font-medium">Tanggal</label>
      <input
        {...register(name)}
        value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
        onClick={() => setIsOpen(!isOpen)}
        placeholder="DD/MM/YYYY"
        readOnly
        className="w-full border border-gray-300 px-3 py-2 rounded cursor-pointer"
      />

      {isOpen && (
        <div className="mt-2 rounded-lg">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            locale={id}
            className="p-3"
            modifiersClassNames={{
              selected: "bg-blue-700 text-white rounded-full",
              today: "font-bold",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
