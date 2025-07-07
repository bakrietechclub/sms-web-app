import { useState } from "react";

const months = [
  "Jan", "Feb", "Mar",
  "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep",
  "Okt", "Nov", "Des"
];

const MonthDropdown = ({ label, name, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          readOnly
          value={value}
          placeholder="Pilih bulan"
          onClick={() => setOpen(!open)}
          className="w-full border border-gray-300 px-3 py-2 rounded cursor-pointer"
        />
        {open && (
          <div className="absolute mt-1 z-10 bg-white border rounded p-2 grid grid-cols-3 gap-2 shadow-md">
            {months.map((month) => (
              <div
                key={month}
                onClick={() => {
                  onChange(month);
                  setOpen(false);
                }}
                className="text-center px-2 py-1 hover:bg-gray-200 rounded cursor-pointer"
              >
                {month}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthDropdown;
