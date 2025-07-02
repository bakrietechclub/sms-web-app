import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import calendar from "../../../assets/icons/calendar.png";

const DatePickerField = ({ name = "tanggal", label = "Tanggal" }) => {
  const { register, setValue, watch } = useFormContext();
  const selectedDate = watch(name);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    setValue(name, date);
    setIsOpen(false);
  };

  return (
    <div className="w-132 flex flex-col">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          {...register(name)}
          value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="DD/MM/YYYY"
          readOnly
          className="w-full border border-gray-300 px-3 py-2 rounded cursor-pointer pr-10"
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
          <img src={calendar} alt="calendar icon" className="w-5 h-5 opacity-60" />
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 rounded-lg">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            locale={id}
            className="p-3 text-base "
            modifiersClassNames={{
              caption_label: "text-base text-gray-600 font-normal",
              selected: "bg-blue-900 text-white rounded-full",
              today: "font-bold",
              nav_button: "text-black",
              day: "rounded-full hover:bg-blue-100",
              weekday: "text-blue-600 font-medium text-xs",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
