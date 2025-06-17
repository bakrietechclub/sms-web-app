const TextField = ({
  label,
  name,
  register,
  placeholder,
  isRequired,
  className,
  defaultValue,
  disable,
}) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      {...register(name)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disable || false}
      className={"w-full border border-gray-300 px-3 py-2 rounded " + className}
    />
  </div>
);

export default TextField;
