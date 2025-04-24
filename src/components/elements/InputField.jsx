export const InputField = ({
  id,
  label,
  placeholder,
  type,
  icon: Icon,
  onIconClick,
  value,
  onChange,
  className,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-black text-sm font-medium mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none ${className}`}
      />
      {Icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute right-3 top-3 text-gray-500"
        >
          <Icon size={20} />
        </button>
      )}
    </div>
  </div>
);
