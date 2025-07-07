import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import TextField from "../../../elements/formfields/TextField";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import SingleSelectDropdownBadge from "../../../elements/formfields/SingleSelectDropdownBadge";
import DatePickerField from "../../../elements/formfields/DatePickerField";

const cooperationProgram = [
  "LEAD", "HOL", "CLP", "BCF", "SDI"
]

const spkStatus = [
  "Dikontak",
  "Draft Sudah Dikirim Oleh Mitra",
  "Sudah Diperiksa Oleh Mitra",
  "Finalisasi Oleh Mitra",
  "Sudah Diperiksa Oleh BCF",
  "Finalisasi Oleh BCF",
  "Ditanda Tangani Oleh Mitra",
  "Ditanda Tangani Oleh BCF",
  "Sudah Dikirim Dokumen ke Mitra",
  "Selesai",
  "Perlu Follow Up",
  "Perlu Diperbarui",
  "Terminasi",
];

export const AddModalSpkINGO = ({ isOpen, onClose }) => {
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
            <h2 className="text-2xl font-semibold">Tambah Data SPK</h2>
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
            <SingleSelectDropdown
              name="programKerjasama"
              label="Program Kerjasama"
              options={cooperationProgram}
              register={register}
              setValue={setValue}
              isRequired
            />
            <TextField
              name="detailKerjasama"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
            />
            <SingleSelectDropdownBadge
              name="statusSpk"
              label="Status SPK"
              options={spkStatus}
              register={register}
              setValue={setValue}
              isRequired
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
            <DatePickerField
              name="tanggalTandaTangan"
              label="Tanggal Tanda Tangan"
              className="w-full"
              placeholder="Masukkan tanggal tanda tangan"
              register={register}
              setValue={setValue}
            />
            <TextField
              name="jangkaWaktu"
              label="Jangka Waktu"
              placeholder="Masukkan jangka waktu"
              register={register}
            />
            <TextField
              name="jatuhTempo"
              label="Jatuh Tempo"
              placeholder="Masukkan jatuh tempo"
              register={register}
            />
            <TextField
              name="linkFileSPK"
              label="Link File SPK"
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
    </>
  );
};
