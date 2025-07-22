import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useRef } from "react";
import TextField from "../../../../elements/formfields/TextField";
import LetterNumberingField from "../../../../elements/formfields/LetterNumberingField";

export const AddLetterNumberingPks = ({ isOpen, onClose }) => {
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
        className="fixed inset-0 z-40 bg-black opacity-0"
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

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
              style={{ height: "calc(900px - 92px)" }}
              ref={dropdownRef}
            >
            <TextField
              name="pks"
              label="Jenis Surat"
              defaultValue="PKS (Perjanjian Kerjasama)"
              disable={true}
              className="bg-gray-200 text-gray-500"
              register={register}
            />
              <LetterNumberingField />
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
          </FormProvider>
        </div>
      </div>
    </>
  );
};
