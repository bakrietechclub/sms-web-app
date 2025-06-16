const ContactFields = ({ register }) => (
  <div>
    <label className="block mb-1 font-medium">Kontak</label>
    <div className="grid grid-cols-2 gap-2">
      <input {...register("kontak.nama")} placeholder="Nama" className="border border-gray-300 px-3 py-2 rounded" />
      <input {...register("kontak.nomor")} placeholder="62" className="border border-gray-300 px-3 py-2 rounded" />
      <input {...register("kontak.jabatan")} placeholder="Jabatan" className="border border-gray-300 px-3 py-2 rounded" />
      <input {...register("kontak.email")} placeholder="Email" className="border border-gray-300 px-3 py-2 rounded" />
    </div>
  </div>
);

export default ContactFields;
