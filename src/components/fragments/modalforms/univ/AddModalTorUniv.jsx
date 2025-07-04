import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import TextField from "../../../elements/formfields/TextField";
import ContactFields from "../../../elements/formfields/ContactFields";
import SwotFields from "../../../elements/formfields/SwotFields";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import MultiSelectDropdown from "../../../elements/formfields/MultiSelectDropdown";
import SingleSelectDropdownBadge from "../../../elements/formfields/SingleSelectDropdownBadge";

const allProvinces = [
  "Nasional",
  "Aceh",
  "Bali",
  "Banten",
  "Bengkulu",
  "Daerah Istimewa Yogyakarta (DIY)",
  "DKI Jakarta",
  "Gorontalo",
  "Jambi",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Kalimantan Barat",
  "Kalimantan Selatan",
  "Kalimantan Tengah",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
  "Lampung",
  "Maluku",
  "Maluku Utara",
  "Nusa Tenggara Barat (NTB)",
  "Nusa Tenggara Timur (NTT)",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua Pegunungan",
  "Papua Selatan",
  "Papua Tengah",
  "Riau",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tengah",
  "Sulawesi Tenggara",
  "Sulawesi Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Sumatera Utara",
];

const lsdOptions = ["LEAD", "CLP", "HOL"];
const kebutuhanOptions = [
  "Tidak",
  "Surat Undangan Audiensi",
  "Surat Permohonan Kerjasama",
];
const statusOptions = ["Sudah dikontak", "Belum dikontak"];

export const AddModalTorUniv = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const dropdownRef = useRef(null);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document.activeElement.blur(); // close any open dropdown
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
              Form Tambah Mitra Universitas
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
            <TextField
              name="namaInstansi"
              label="Nama Instansi"
              placeholder="Masukkan nama instansi"
              register={register}
            />
            <SingleSelectDropdown
              name="provinsi"
              label="Provinsi"
              options={allProvinces}
              register={register}
              setValue={setValue}
            />
            <TextField
              name="profil"
              label="Profil"
              placeholder="Masukkan profil"
              register={register}
            />
            <ContactFields register={register} />
            <MultiSelectDropdown
              name="programLSD"
              label="Program LSD"
              options={lsdOptions}
              register={register}
              setValue={setValue}
            />
            <SingleSelectDropdownBadge
              name="status"
              label="Status"
              options={statusOptions}
              register={register}
              setValue={setValue}
            />
            <MultiSelectDropdown
              name="kebutuhan"
              label="Kebutuhan"
              options={kebutuhanOptions}
              register={register}
              setValue={setValue}
            />
            <SwotFields label="Program Analisis" register={register} />
            <TextField
              name="linkDokumen"
              label="Link Dokumen"
              placeholder="https://.."
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
