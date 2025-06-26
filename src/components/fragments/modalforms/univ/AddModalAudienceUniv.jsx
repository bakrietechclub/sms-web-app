import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useRef } from "react";
import TextField from "../../../elements/formfields/TextField";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import DatePickerField from "../../../elements/formfields/DatePickerField";
import TimePickerField from "../../../elements/formfields/TimePickerField";
import SingleSelectDropdownBadge from "../../../elements/formfields/SingleSelectDropdownBadge";

const lsdOptions = ["LEAD", "CLP", "HOL"];
const kebutuhanOptions = [
  "Tidak",
  "Surat Undangan Audiensi",
  "Surat Permohonan Kerjasama",
];
const statusOptions = ["Sudah dikontak", "Belum dikontak"];

export const AddModalAudienceUniv = ({ isOpen, onClose }) => {
  const methods = useForm();
  const { register, handleSubmit, setValue } = methods;
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
            <h2 className="text-2xl font-semibold">Form Data Audiensi</h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
              style={{ height: "calc(900px - 92px)" }}
              ref={dropdownRef}
            >
              <SingleSelectDropdown
                name="dataRisetPotensial"
                label="Data Riset Potensial"
                options={["Belum Audiensi", "Re-Audiensi", "Selesai"]}
                register={register}
                setValue={setValue}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <DatePickerField name="tanggalAudiensi" label="Tanggal Audiensi" />
                </div>
                <div className="flex-1">
                  <TimePickerField name="jamAudiensi" label="Jam Audiensi" setValue={setValue} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <SingleSelectDropdownBadge
                    name="jenisAudiensi"
                    label="Jenis Audiensi"
                    options={["Online", "Offline"]}
                    register={register}
                    setValue={setValue}
                  />
                </div>
                <div className="flex-1">
                  <SingleSelectDropdownBadge
                    name="statusAudiensi"
                    label="Status Audiensi"
                    options={["Belum Audiensi", "Re-Audiensi", "Selesai"]}
                    register={register}
                    setValue={setValue}
                  />
                </div>
              </div>
              <TextField
                name="tempatAudiensi"
                label="Tempat Audiensi"
                placeholder="Masukkan link/alamat"
                register={register}
              />
              <TextField
                name="linkDokumentasi"
                label="Link Dokumentasi"
                placeholder="https://.."
                register={register}
              />
              <TextField
                name="catatanTambahan"
                label="Catatan Tambahan"
                placeholder="Masukkan catatan tambahan"
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
          </FormProvider>
        </div>
      </div>
    </>
  );
};
