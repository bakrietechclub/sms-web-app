const SwotFields = ({ register, label, isRequired }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>

    {[
      { label: 'Strengths', name: 'strengths' },
      { label: 'Weakness', name: 'weakness' },
      { label: 'Opportunities', name: 'opportunities' },
      { label: 'Challenge', name: 'challenges' },
    ].map(({ label, name }) => (
      <div key={name} className="flex items-center gap-2 mb-2">
        <label className="w-32">{label}</label>
        <input
          {...register(name, { required: isRequired })}
          placeholder={label}
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
      </div>
    ))}
  </div>
);

export default SwotFields;
