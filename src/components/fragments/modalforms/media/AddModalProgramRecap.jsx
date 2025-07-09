import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import TextField from "../../../elements/formfields/TextField";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import DatePickerField from "../../../elements/formfields/DatePickerField";

const mediaScale = [
  "Internasional", "Nasional", "Regional", "Lokal"
]

const program = [
  "LEAD", "HOL", "CLP", "BCF", "SDI"
]

const publicationType = [ 
    "Online", "Televisi", "Media Cetak", "Radio"
];

const toneOfTheNews = [
    "Positif", "Negatif", "Netral"
]

export const AddModalProgramRecap = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dropdownRef = useRef(null);

  const [nomorSuratBcf, setNomorSuratBcf] = useState("");
  const [openLetterModal, setOpenLetterModal] = useState(false);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      nomorSuratBcf,
    };
    console.log("Form data:", finalData);
    onClose();
  };

  const handleRedirectToNomorSurat = () => {
    setOpenLetterModal(true);
  };

  const handleNomorSuratSuccess = (nomor) => {
    setNomorSuratBcf(nomor);
    setValue("nomorSuratBcf", nomor);
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
      <div className="fixed inset-0 z-40 bg-black opacity-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Data Pemberitaan</h2>
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
              defaultValue="Media Massa"
              disable={true}
              className="bg-gray-200 text-gray-500"
              register={register}
            />
            <TextField
              name="namaInstansi"
              label="Nama Instansi"
              placeholder="Masukkan nama instansi"
              register={register}
              isRequired
            />
            <TextField
              name="tierMedia"
              label="Tier Media"
              placeholder="Masukkan tier media"
              register={register}
              isRequired
            />
            <SingleSelectDropdown
              name="skalaMedia"
              label="Skala Media"
              options={mediaScale}
              register={register}
              setValue={setValue}
              isRequired
            />
            <SingleSelectDropdown
              name="program"
              label="Program"
              options={program}
              register={register}
              setValue={setValue}
              isRequired
            />
            <TextField
              name="namaKegiatan"
              label="Nama Kegiatan"
              placeholder="Masukkan nama kegiatan"
              register={register}
              isRequired
            />
            <TextField
              name="tahun"
              label="Tahun"
              placeholder="Masukkan tahun"
              register={register}
              isRequired
            />
            <DatePickerField
              name="tanggalTandaTangan"
              label="Tanggal Tanda Tangan"
              className="w-full"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="headlines"
              label="Headlines"
              placeholder="Masukkan headlines"
              register={register}
              isRequired
            />
            <SingleSelectDropdown
              name="tipePublikasi"
              label="Tipe Publikasi"
              options={publicationType}
              register={register}
              setValue={setValue}
              isRequired
            />
            <TextField
              name="linkPemberitaan"
              label="Link Pemberitaan"
              placeholder="https://.."
              register={register}
              isRequired
            />
            <SingleSelectDropdown
              name="tonePemberitaan"
              label="Tone Pemberitaan"
              options={toneOfTheNews}
              register={register}
              setValue={setValue}
              isRequired
            />
            <TextField
              name="ave"
              label="Ave"
              placeholder="Rp."
              register={register}
            />
            <TextField
              name="prFactor"
              label="PR Factor"
              placeholder="Masukkan PR factor"
              register={register}
            />
            <TextField
              name="prValue"
              label="PR Value"
              placeholder="RP."
              register={register}
            />
            <div className="text-right pt-4">
              <button
                type="submit"
                className="bg-[#0d4690] text-white px-6 py-2 rounded-lg hover:bg-[#0c3f82]"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      <AddModalProgramRecap
        isOpen={openLetterModal}
        onClose={() => setOpenLetterModal(false)}
        onSuccess={handleNomorSuratSuccess}
      />
    </>
  );
};
