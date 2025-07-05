import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import TextField from "../../../elements/formfields/TextField";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import RedirectTextField from "../../../elements/formfields/RedirectTextField";
import { AddModalLetterNumberingUniv } from "../../../fragments/modalforms/univ/AddModalLetterNumberingUniv";

const cooperationProgram = ["LEAD", "HOL", "CLP", "BCF",];

const batchProgram = [
  "Batch 1: Jul-Des 2020",
  "Batch 2: Jan-Jun 2021",
  "Batch 3: Jul-Des 2021",
  "Batch 4: Jan-Jun 2022",
  "Batch 5: Jul-Des 2022",
  "Batch 6: Jan-Jun 2023",
  "Batch 7: Jul-Des 2023",
  "Batch 8: Jan-Jun 2024",
  "Batch 9: Jul-Des 2024",
  "Batch 10: Jan-Jun 2025",
];

export const AddModalIaINGO = ({ isOpen, onClose }) => {
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
            <h2 className="text-2xl font-semibold">Tambah Data IA</h2>
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
              isRequired
            />
            <TextField
              name="divisiInstansi"
              label="Divisi Instansi"
              placeholder="Masukkan nama divisi instansi"
              register={register}
            />
            <TextField
              name="statusKerjasama"
              label="Status Kerjasama"
              placeholder="Status Kerjasama"
              register={register}
            />
            <TextField
              name="tahunImplementasiKerjasama"
              label="Tahun Implementasi Kerjasama"
              placeholder="Masukkan tahun implementasi"
              register={register}
              isRequired
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <SingleSelectDropdown
                  name="programKerjasama"
                  label="Program Kerjasama"
                  options={cooperationProgram}
                  register={register}
                  setValue={setValue}
                  isRequired
                />
              </div>
              <div className="w-1/2">
                <SingleSelectDropdown
                  name="batchProgram"
                  label="Batch Program"
                  options={batchProgram}
                  register={register}
                  setValue={setValue}
                  isRequired
                />
              </div>
            </div>

            <RedirectTextField
              label="Nomor Surat BCF"
              value={nomorSuratBcf}
              onRedirect={handleRedirectToNomorSurat}
              isRequired
            />
            <TextField
              name="nomorSuratMitra"
              label="Nomor Surat Mitra"
              placeholder="Masukkan nomor surat mitra"
              register={register}
            />
            <TextField
              name="namaPihakBcf"
              label="Nama Pihak BCF"
              placeholder="Masukkan nama pihak BCF"
              register={register}
            />
            <TextField
              name="namaPihakMitra"
              label="Nama Pihak Mitra"
              placeholder="Masukkan nama pihak mitra"
              register={register}
            />
            <TextField
              name="linkFileIa"
              label="Link File IA"
              placeholder="https://.."
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

      <AddModalLetterNumberingUniv
        isOpen={openLetterModal}
        onClose={() => setOpenLetterModal(false)}
        onSuccess={handleNomorSuratSuccess}
      />
    </>
  );
};
