const ContactFields = ({ register }) => (
  <div>
    <label className="block mb-1 font-medium">Kontak</label>
    <div className="grid grid-cols-2 gap-2">
      <input
        {...register('contactName')}
        placeholder="Nama"
        className="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        {...register('contactPhoneNumber')}
        placeholder="62"
        className="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        {...register('contactPosition')}
        placeholder="Jabatan"
        className="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        {...register('contactEmail')}
        placeholder="Email"
        className="border border-gray-300 px-3 py-2 rounded"
      />
    </div>
  </div>
);

export default ContactFields;
