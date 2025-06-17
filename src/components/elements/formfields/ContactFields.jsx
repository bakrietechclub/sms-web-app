const ContactFields = ({ register }) => (
  <div>
    <label className="block mb-1 font-medium">Kontak</label>
    <div className="grid grid-cols-2 gap-2">
      <input {...register("contact.name")} placeholder="Nama" className="border border-gray-300 px-3 py-2 rounded" />
      <input {...register("contact.number")} placeholder="62" className="border border-gray-300 px-3 py-2 rounded" />
      <input {...register("contact.position")} placeholder="Jabatan" className="border border-gray-300 px-3 py-2 rounded" />
      <input {...register("contact.email")} placeholder="Email" className="border border-gray-300 px-3 py-2 rounded" />
    </div>
  </div>
);

export default ContactFields;
