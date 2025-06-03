import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const allProvinces = [
  "Nasional", "Aceh", "Bali", "Banten", "Bengkulu", "Daerah Istimewa Yogyakarta (DIY)", "DKI Jakarta",
  "Gorontalo", "Jambi", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Kalimantan Barat",
  "Kalimantan Selatan", "Kalimantan Tengah", "Kalimantan Timur", "Kalimantan Utara",
  "Kepulauan Bangka Belitung", "Kepulauan Riau", "Lampung", "Maluku",
  "Maluku Utara", "Nusa Tenggara Barat (NTB)", "Nusa Tenggara Timur (NTT)", "Papua",
  "Papua Barat", "Papua Barat Daya", "Papua Pegunungan", "Papua Selatan", "Papua Tengah",
  "Riau", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara",
  "Sulawesi Utara", "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara"
];

const lsdOptions = ["LEAD", "CLP", "HOL"];

const kebutuhanOptions = ["Tidak", "Surat Undangan Audiensi", "Surat Permohonan Kerjasama"]

export function AddModalUniv({ isOpen, onClose }) {
  const { register, handleSubmit, setValue } = useForm();
  const [provinsiOpen, setProvinsiOpen] = useState(false);
  const [showLSDDropdown, setShowLSDDropdown] = useState(false);
  const [selectedLSD, setSelectedLSD] = useState([]);
  const [tempSelectedLSD, setTempSelectedLSD] = useState([]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [showKebutuhanDropdown, setShowKebutuhanDropdown] = useState(false);
  const [selectedKebutuhan, setSelectedKebutuhan] = useState([]);
  const [tempSelectedKebutuhan, setTempSelectedKebutuhan] = useState([]);

  const dropdownRef = useRef(null);

  const handleLSDChange = (option) => {
  setTempSelectedLSD((prev) =>
    prev.includes(option)
      ? prev.filter((item) => item !== option)
      : [...prev, option]
  );
  };

  const handleKebutuhanChange = (option) => {
  setTempSelectedKebutuhan((prev) =>
    prev.includes(option)
      ? prev.filter((item) => item !== option)
      : [...prev, option]
  );
};

  const confirmLSD = () => {
  setSelectedLSD(tempSelectedLSD); 
  setValue("programlsd", tempSelectedLSD.join(", "));
  setShowLSDDropdown(false);
}; 

  const confirmKebutuhan = () => {
  setSelectedKebutuhan(tempSelectedKebutuhan);
  setValue("kebutuhan", tempSelectedKebutuhan.join(", "));
  setShowKebutuhanDropdown(false);
  };

  const closeAllDropdowns = () => {
    setProvinsiOpen(false);
    setShowLSDDropdown(false);
    setStatusOpen(false);
    setShowKebutuhanDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-40" onClick={onClose}></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] bg-white px-6 flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-xl font-bold">Form Tambah Mitra Universitas</h2>
            <button className="text-2xl text-gray-600 hover:text-black" onClick={onClose}>×</button>
          </div>

          <div className="px-6 py-4 overflow-y-auto" style={{ height: "calc(900px - 92px)" }}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" ref={dropdownRef}>

              <div>
                <label>Nama Instansi</label>
                <input {...register("namaInstansi")} placeholder="Masukkan nama instansi" className="w-full border border-gray-300 px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Provinsi</label>
                <div className="relative">
                  <input
                    {...register("provinsi")}
                    placeholder="Pilih provinsi"
                    readOnly
                    className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
                    onClick={() => setProvinsiOpen((prev) => !prev)}
                  />
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                    {provinsiOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
                {provinsiOpen && (
                  <div className="mt-2 border border-gray-300 rounded max-h-87 w-96 overflow-y-auto">
                    {allProvinces.map((prov) => (
                      <div
                        key={prov}
                        onClick={() => {
                          setValue("provinsi", prov);
                          setProvinsiOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {prov}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label>Profil</label>
                <input {...register("profil")}  placeholder="Masukkan profil" className="w-full border border-gray-300 px-3 py-2 rounded" />
              </div>

              <div>
                <label>Kontak</label>
                <div className="grid grid-cols-2 gap-2">
                  <input {...register("kontak.nama")} placeholder="Nama" className="border border-gray-300 px-3 py-2 rounded" />
                  <input {...register("kontak.nomor")} placeholder="62" className="border border-gray-300 px-3 py-2 rounded" />
                  <input {...register("kontak.jabatan")} placeholder="Jabatan" className="border border-gray-300 px-3 py-2 rounded" />
                  <input {...register("kontak.email")} placeholder="Email" className="border border-gray-300 px-3 py-2 rounded" />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Program LSD</label>
                <div className="relative">
                  <input
                    readOnly
                    {...register("programLSD")}
                    placeholder="Pilih program"
                    value={selectedLSD.join(", ")}
                    className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
                    onClick={() => setShowLSDDropdown((prev) => !prev)}
                  />
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                    {showLSDDropdown ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
                {showLSDDropdown && (
                  <div className="mt-2 border border-gray-300 rounded w-97">
                    <button
                      type="button"
                      onClick={confirmLSD}
                      className="text-blue-900 pl-70 text-sm py-1"
                    >
                      Konfirmasi
                    </button>
                    {lsdOptions.map((option) => (
                      <label key={option} className="block px-3 py-1 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={tempSelectedLSD.includes(option)}
                          onChange={() => handleLSDChange(option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Status</label>
                <div className="relative">
                  <input
                    {...register("status")}
                    placeholder="Pilih status"
                    readOnly
                    value={statusValue}
                    className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
                    onClick={() => setStatusOpen((prev) => !prev)}
                  />
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                    {statusOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
                {statusOpen && (
                  <div className="mt-2 p-2 border border-gray-300 rounded w-97">
                    {["Sudah dikontak", "Belum dikontak"].map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setStatusValue(option);
                          setValue("status", option);
                          setStatusOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            option === "Sudah dikontak"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Kebutuhan</label>
                <div className="relative">
                  <input
                    readOnly
                    {...register("kebutuhan")}
                    placeholder="Pilih kebutuhan"
                    value={selectedKebutuhan.join(", ")}
                    className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
                    onClick={() => setShowKebutuhanDropdown((prev) => !prev)}
                  />
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                    {showKebutuhanDropdown ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
                {showKebutuhanDropdown && (
                  <div className="mt-2 border border-gray-300 rounded w-97">
                    <button
                      type="button"
                      onClick={confirmKebutuhan}
                      className="text-blue-900  pl-70 text-sm py-1"
                    >
                      Konfirmasi
                    </button>                    
                    {kebutuhanOptions.map((option) => (
                      <label key={option} className="block px-3 py-2 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={tempSelectedKebutuhan.includes(option)}
                          onChange={() => handleKebutuhanChange(option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold">Program Analisis</label>

                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Strengths</label>
                  <input
                    {...register("analisis.strengths")}
                    placeholder="Strengths"
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Weakness</label>
                  <input
                    {...register("analisis.weakness")}
                    placeholder="weakness"
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Opportunities</label>
                  <input
                    {...register("analisis.opportunities")}
                    placeholder="Opportunities"
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <label className="w-32">Challenge</label>
                  <input
                    {...register("analisis.challenge")}
                  placeholder="Challenge"
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label>Link Dokumen</label>
                <input
                  {...register("linkDokumen")}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="https://.."
                />
              </div>

              <div className="text-right pt-4">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900"
                >
                  Simpan
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
