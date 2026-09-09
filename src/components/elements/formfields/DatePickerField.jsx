import { useState } from 'react';
import { format, parseISO, isValid as isValidDate } from 'date-fns';
import { id } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useFormContext, useWatch } from 'react-hook-form';
import calendar from '../../../assets/icons/calendar.png';

/**
 * Tanggal terpilih SELALU dibaca dari react-hook-form lewat `useWatch`
 * (string 'yyyy-MM-dd'), bukan dari `useState` lokal yang cuma diisi lewat
 * klik user dan sebelumnya "disinkronkan" lewat prop `value`/`watch` yang di
 * banyak pemanggil TIDAK PERNAH dikirim -- itulah sebabnya field seperti
 * "Jatuh Tempo" bisa tampil kosong lagi padahal `setValue()` sudah dipanggil
 * dari luar (auto-kalkulasi): tulisan ke DOM sempat terlihat sesaat, lalu
 * render React berikutnya menimpanya balik ke state lokal yang tidak pernah
 * ikut diperbarui.
 *
 * `readOnly`: dipakai untuk field turunan (mis. Jatuh Tempo = Tanggal Tanda
 * Tangan + Jangka Waktu) -- tampil terkunci, tidak bisa dibuka kalender-nya,
 * karena nilainya memang tidak seharusnya diedit manual (akan tertimpa lagi
 * begitu salah satu sumbernya berubah).
 */
const DatePickerField = ({
  name = 'date',
  label = 'Date',
  register: registerProp,
  setValue: setValueProp,
  control: controlProp,
  onChange,
  placeholder = 'DD/MM/YYYY',
  className = '',
  isRequired,
  required = false, // alias lama -- beberapa pemanggil masih pakai ini
  disabled = false,
  readOnly = false,
  helperText,
}) => {
  const methods = useFormContext();
  const register = registerProp || methods?.register;
  const setValue = setValueProp || methods?.setValue;
  const control = controlProp || methods?.control;
  const errors = methods?.formState?.errors;
  const fieldError = errors?.[name];
  const requiredFlag = isRequired ?? required;
  const isLocked = disabled || readOnly;

  const [isOpen, setIsOpen] = useState(false);
  const rawValue = useWatch({ control, name });
  const parsedDate = rawValue ? parseISO(rawValue) : null;
  const selectedDate = parsedDate && isValidDate(parsedDate) ? parsedDate : undefined;

  const handleSelect = (date) => {
    const formatted = date ? format(date, 'yyyy-MM-dd') : '';
    setValue(name, formatted, { shouldValidate: true });
    if (onChange && date) {
      onChange(formatted);
    }
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!isLocked) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label className="block mb-1 font-medium">
        {label}
        {requiredFlag && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          {...register(name, { required: requiredFlag })}
          value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          onClick={handleInputClick}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={`w-full border px-3 py-2 rounded pr-10 ${
            fieldError ? 'border-red-400' : 'border-gray-300'
          } ${
            isLocked ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'cursor-pointer'
          }`}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
          <img
            src={calendar}
            alt="calendar icon"
            className="w-5 h-5 opacity-60"
          />
        </div>

        {isOpen && !isLocked && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-max">
            <DayPicker
              mode="single"
              selected={selectedDate}
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
      {helperText && <p className="mt-1 text-xs text-gray-400">{helperText}</p>}
      {fieldError && (
        <p className="mt-1 text-xs text-red-500">
          {fieldError.message || `${label} wajib diisi.`}
        </p>
      )}
    </div>
  );
};

export default DatePickerField;
