import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronDown, ChevronRight } from "lucide-react";

// OPTIONS FOR LETTER CLASS, SUB-CLASSIFICATION, PROGRAM, AND MONTH
const letterClassOptions = ["Administrasi", "Finance"];
const subClassOptions = {
  Administrasi: [
    "Pemberitahuan/Undangan/Persetujuan",
    "Penawaran",
    "Kontrak Eksternal/Internal",
  ],
  Finance: ["Pesanan Pembelian", "Faktur/Invoice", "Kwitansi"],
};
const programOptions = ["LEAD", "HOL", "CLP", "BCF"];
const months = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const LetterNumberingField = () => {
  const { register, setValue, watch } = useFormContext();

  // WATCH FOR SELECTED VALUES FROM THE FORM
  const selectedClass = watch("kelas");
  const selectedSubClass = watch("subKlasifikasi");
  const selectedMonth = watch("bulan");
  const selectedProgram = watch("program");

  // STATE TO CONTROL OPEN/CLOSE STATE OF DROPDOWNS
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isSubClassDropdownOpen, setIsSubClassDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);

  // HANDLER FUNCTIONS TO UPDATE FORM FIELDS
  const handleSelectClass = (val) => {
    setValue("kelas", val);
    setValue("subKlasifikasi", "");
    setIsClassDropdownOpen(false);
  };

  const handleSelectSubClass = (val) => {
    setValue("subKlasifikasi", val);
    setIsSubClassDropdownOpen(false);
  };

  const handleSelectProgram = (val) => {
    setValue("program", val);
    setIsProgramDropdownOpen(false);
  };

  const handleSelectMonth = (val) => {
    setValue("bulan", val);
    setIsMonthDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN LABEL FOR LETTER NUMBERING */}
      <label className="font-medium text-base">
        Penomoran Surat <span className="text-red-500">*</span>
      </label>

      {/* READONLY FIELD FOR LETTER NUMBERING */}
      <input
        {...register("nomorSurat")}
        placeholder="Penomoran Surat"
        readOnly
        disabled
        className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 text-gray-500"
      />

      {/* INPUT GROUP FOR ALL FIELDS */}
      <div className="grid grid-cols-2 gap-4">
        {/* CLASS FIELD */}
        <div>
          <div className="relative">
            <input
              {...register("kelas")}
              placeholder="Kelas"
              readOnly
              value={selectedClass || ""}
              onClick={() => setIsClassDropdownOpen((prev) => !prev)}
              className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
            />
            {/* CHEVRON ICON FOR DROPDOWN */}
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none z-10">
              {isClassDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </div>
          {/* CLASS DROPDOWN LIST */}
          {isClassDropdownOpen && (
            <div className="w-full bg-white border rounded shadow-lg mt-1">
              {letterClassOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelectClass(opt)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUB-CLASSIFICATION FIELD */}
        <div>
          <div className="relative">
            <input
              {...register("subKlasifikasi")}
              placeholder="Sub Klasifikasi"
              readOnly
              disabled={!selectedClass}
              value={selectedSubClass || ""}
              onClick={() => {
                if (selectedClass) setIsSubClassDropdownOpen((prev) => !prev);
              }}
              className={`w-full border px-3 py-2 rounded pr-8 ${
                !selectedClass
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "border-gray-300 cursor-pointer"
              }`}
            />
            {/* CHEVRON ICON FOR SUBCLASS DROPDOWN */}
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none z-10">
              {isSubClassDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </div>
          {/* SUBCLASS DROPDOWN LIST */}
          {isSubClassDropdownOpen && selectedClass && (
            <div className="w-full bg-white border rounded shadow-lg mt-1">
              {subClassOptions[selectedClass].map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelectSubClass(opt)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PROGRAM FIELD */}
      <div>
        <div className="relative">
          <input
            {...register("program")}
            placeholder="Program"
            readOnly
            value={selectedProgram || ""}
            onClick={() => setIsProgramDropdownOpen((prev) => !prev)}
            className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
          />
          {/* CHEVRON ICON FOR PROGRAM DROPDOWN */}
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none z-10">
            {isProgramDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
        {/* PROGRAM DROPDOWN LIST */}
        {isProgramDropdownOpen && (
          <div className="w-full bg-white border rounded shadow-lg mt-1">
            {programOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => handleSelectProgram(opt)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ROW FOR MONTH & YEAR */}
      <div className="grid grid-cols-2 gap-4 relative">
        {/* MONTH FIELD */}
        <div className="relative overflow-visible">
          <div className="relative">
            <input
              {...register("bulan")}
              placeholder="Bulan"
              readOnly
              value={selectedMonth || ""}
              onClick={() => setIsMonthDropdownOpen((prev) => !prev)}
              className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
            />
            {/* CHEVRON ICON FOR MONTH DROPDOWN */}
            <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none z-20">
              {isMonthDropdownOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </div>
          {/* MONTH DROPDOWN LIST */}
          {isMonthDropdownOpen && (
            <div className="w-full bg-white shadow-lg mt-1 p-2 grid grid-cols-3 gap-2">
              {months.map((month) => (
                <div
                  key={month}
                  onClick={() => handleSelectMonth(month)}
                  className={`text-center text-sm py-1 rounded cursor-pointer ${
                    selectedMonth === month
                      ? "bg-blue-900 text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* YEAR FIELD */}
        <div className={`relative ${isMonthDropdownOpen ? 'mt-20' : ''}`}>
          <input
            {...register("tahun")}
            placeholder="Tahun"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default LetterNumberingField;
