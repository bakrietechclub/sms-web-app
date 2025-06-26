const CustomCheckbox = ({
  label,
  id,
  name,
  defaultChecked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleCheckboxChange = (event) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState, id, name); // Panggil onChange prop jika ada
    }
  };

  return (
    <div className="flex items-center mb-4">
      {/* Checkbox asli yang disembunyikan */}
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="absolute opacity-0 w-0 h-0 cursor-pointer" // Sembunyikan secara visual
      />

      {/* Label dengan kotak kustom */}
      <label
        htmlFor={id}
        className="relative flex items-center cursor-pointer text-gray-700 text-base"
      >
        {/* Kotak kustom */}
        <div
          className={`
            w-5 h-5 rounded-md border-2 transition-all duration-200 ease-in-out
            ${
              isChecked
                ? "bg-blue-600 border-blue-600" // Warna saat dicentang: background biru, border biru
                : "bg-white border-gray-300" // Warna saat tidak dicentang: background putih, border abu-abu
            }
            flex items-center justify-center
          `}
        >
          {/* Tanda centang (jika dicentang) */}
          {isChecked && (
            <svg
              className="w-3 h-3 text-white" // Warna centang: putih
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3" // Ketebalan garis centang
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </div>
        {/* Teks label */}
        <span className="ml-2 select-none">{label}</span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
