// src/components/fragments/modalforms/univ/AddModalUniv.jsx
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import TextField from "../../../elements/formfields/TextField";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";

const typeOfInstitution = ["Universitas", "Lembaga/Komunitas"];

const typeOfLetter = ["Surat Permohonan Kerjasama", "Surat Undangan Audiensi", "MoU (Nota Kesepahaman)", "PKS (Perjanjian Kerjasama)", 
                      "IA (Implementation Agreement)", "SPK (Surat Pernyataan Komitmen)"]

export const AddModalLetterNumberingUniv = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
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
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Tambah Data Penomoran Surat
            </h2>
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
            <SingleSelectDropdown 
             name="jenis instansi" 
             label="Jenis Instansi" 
             isRequired={true} 
             options={typeOfInstitution} 
             register={register} 
             setValue={setValue} 
            />
            <TextField
              name="namaInstansi"
              label="Nama Instansi"
              placeholder="Masukkan nama instansi"
              register={register}
              isRequired={true}
            />
            <TextField
              name="divisiInstansi"
              label="Divisi Instansi"
              placeholder="Masukkan nama divisi instansi"
              register={register}
              isRequired={true}
            />
            <SingleSelectDropdown 
             name="jenisSurat" 
             label="Jenis Surat" 
             isRequired={true} 
             options={typeOfLetter} 
             register={register} 
             setValue={setValue} 
            />
            <TextField
              name="tujuanPerihalSurat"
              label="Tujuan dan Perihal Surat"
              placeholder="Masukkan Nama Pihak BCF"
              register={register}
            />
            <div className="text-right pt-4">
              <button
                type="submit"
                className="bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82]"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
