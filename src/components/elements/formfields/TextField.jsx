const TextField = ({ label, name, register, placeholder, isRequired }) => (
  <div>
    <label className="block mb-1 font-medium">
        {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      {...register(name)}
      placeholder={placeholder}
      className="w-full border border-gray-300 px-3 py-2 rounded"
    />
  </div>
);

export default TextField;
