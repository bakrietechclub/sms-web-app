import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

import TextField from "../../../elements/formfields/TextField";

export const AddModalCoorGroupINGO = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const dropdownRef = useRef(null);
  const onSubmit = (data) => {
    console.log("Form data:", data);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document.activeElement.blur(); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] max-h-[65vh] rounded-2xl shadow-xl overflow-hidden flex flex-col px-5 py-7"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Grup Koordinasi</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
            style={{ height: "calc(900px - 92px)" }}
            ref={dropdownRef}
          >
            <TextField
              name="jenisInstansi"
              label="Jenis Instansi"
              placeholder="Lembaga Internasional"
              defaultValue="Lembaga Internasional"
              disable={true}
              className="bg-gray-200 text-gray-500"
              register={register}
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
