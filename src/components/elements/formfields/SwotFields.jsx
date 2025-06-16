const SwotFields = ({ register }) => (
  <div>
    <label className="block mb-2 font-semibold">Program Analisis</label>

    {[
      { label: "Strengths", name: "analisis.strengths" },
      { label: "Weakness", name: "analisis.weakness" },
      { label: "Opportunities", name: "analisis.opportunities" },
      { label: "Challenge", name: "analisis.challenge" },
    ].map(({ label, name }) => (
      <div key={name} className="flex items-center gap-2 mb-2">
        <label className="w-32">{label}</label>
        <input
          {...register(name)}
          placeholder={label}
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
      </div>
    ))}
  </div>
);

export default SwotFields;
