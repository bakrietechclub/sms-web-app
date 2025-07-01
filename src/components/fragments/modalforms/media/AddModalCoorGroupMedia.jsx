import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import TextField from "../../../elements/formfields/TextField";

export const AddModalCoorGroupMedia = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Untuk mengetahui apakah dropdown terbuka
  const [wrapperHeight, setWrapperHeight] = useState("65vh"); // Menyimpan tinggi wrapper modal

  const onSubmit = (data) => {
    console.log("Form data:", data);
    onClose();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown
  };

  useEffect(() => {
    // Ketika dropdown terbuka, wrapper modal akan memanjang
    if (isDropdownOpen) {
      setWrapperHeight("calc(100vh - 92px)"); // Full height modal minus header
    } else {
      setWrapperHeight("65vh"); // Kembali ke default height
    }
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] rounded-2xl shadow-xl overflow-hidden flex flex-col px-5 py-7"
          onClick={(e) => e.stopPropagation()}
          style={{ height: wrapperHeight }} // Wrapper modal yang menyesuaikan
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Grup Koordinasi</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4"
            style={{ height: `calc(${wrapperHeight} - 92px)` }} // Menyesuaikan tinggi form
          >
            <SingleSelectDropdown
              name="jenisInstansi"
              label="Jenis Instansi"
              options={[
                "Pemerintah Pusat",
                "Pemerintah Daerah",
                "Dunia Usaha",
                "Media Massa",
              ]}
              register={register}
              setValue={setValue}
              onClick={handleDropdownToggle} // Toggle dropdown
            />
            <TextField
              name="namaInstansi"
              label="Nama Instansi"
              placeholder="Masukkan nama instansi"
              register={register}
            />
            <TextField
              name="divisiInstansi"
              label="Divisi Instansi"
              placeholder="Masukkan divisi instansi"
              register={register}
            />
            <TextField
              name="linkGrup"
              label="Link Grup"
              placeholder="https://.."
              register={register}
            />

            <button
              type="submit"
              className="flex bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82] ml-auto"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
