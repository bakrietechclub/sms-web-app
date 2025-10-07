import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import calendar from '../../../assets/icons/calendar.png';

const DatePickerField = ({
  name = 'date',
  label = 'Date',
  value,
  register,
  setValue,
  onChange,
  placeholder = 'DD/MM/YYYY',
  className = '',
  required = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const handleSelect = (date) => {
    setLocalValue(date);
    const formatted = date ? format(date, 'yyyy-MM-dd') : '';
    if (setValue) {
      setValue(name, formatted);
    }
    if (onChange && date) {
      onChange(formatted);
    }
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`w-132 flex flex-col ${className}`}>
      <label className="block mb-1 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          {...register(name)}
          value={localValue ? format(localValue, 'yyyy-MM-dd') : ''}
          onClick={handleInputClick}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={`w-full border border-gray-300 px-3 py-2 rounded cursor-pointer pr-10 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
          <img
            src={calendar}
            alt="calendar icon"
            className="w-5 h-5 opacity-60"
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <DayPicker
            mode="single"
            selected={localValue}
            onSelect={handleSelect}
            locale={id}
            className="p-3 text-base"
            modifiersClassNames={{
              caption_label: 'text-base text-gray-600 font-normal',
              selected: 'bg-blue-900 text-white rounded-full',
              today: 'font-bold',
              nav_button: 'text-black',
              day: 'rounded-full hover:bg-blue-100',
              weekday: 'text-blue-600 font-medium text-xs',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;
