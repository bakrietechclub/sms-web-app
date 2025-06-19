import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";

const DatePickerField = ({ label, name, register, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setValue(name, date);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          type="text"
          readOnly
          {...register(name)}
          value={selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : ""}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Pilih tanggal"
          className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer bg-white"
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>

      {isOpen && (
        <div className="mt-2">
          <input
            type="date"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
