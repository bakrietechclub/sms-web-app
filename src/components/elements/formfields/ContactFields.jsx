const ContactFields = ({ register, isRequired }) => (
  <div>
    <label className="block mb-1 font-medium">
      Kontak {isRequired && <span className="text-red-500">*</span>}
    </label>
    <div className="grid grid-cols-2 gap-2">
      <input
        {...register('contactName', { required: isRequired })}
        placeholder="Nama"
        className="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        {...register('contactPhoneNumber', { required: isRequired })}
        placeholder="62"
        className="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        {...register('contactPosition', { required: isRequired })}
        placeholder="Jabatan"
        className="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        {...register('contactEmail', { required: isRequired })}
        placeholder="Email"
        className="border border-gray-300 px-3 py-2 rounded"
      />
    </div>
  </div>
);

export default ContactFields;
