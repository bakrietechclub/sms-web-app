import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SingleSelectDropdown from "../../../elements/formfields/SingleSelectDropdown";
import TextField from "../../../elements/formfields/TextField";
import { UnivAudience } from "../../../../data/data_univ";

export const AddModalCoorGroupUniv = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState("45vh");

  const onSubmit = (data) => {
    console.log("Form data:", data);
    onClose();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setWrapperHeight("calc(88vh - 90px - 50px)"); 
    } else {
      setWrapperHeight("40vh");
    }
  }, [isDropdownOpen]);

  const options = UnivAudience.map((item) => (item.name));

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] rounded-2xl shadow-xl overflow-hidden flex flex-col px-5 py-7"
          onClick={(e) => e.stopPropagation()}
          style={{ height: wrapperHeight }}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tambah Grup Koordinasi</h2>
            <button onClick={onClose} className="text-2xl">×</button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4"
            style={{ height: `calc(${wrapperHeight} - 92px)` }}
          >
            <SingleSelectDropdown
              name="jenisGrup"
              label="Data riset kolaborasi"
              options={options}
              register={register}
              setValue={setValue}
              onClick={handleDropdownToggle}
            />
            <TextField
              name="linkGrup"
              label="Link Grup"
              placeholder="https://.."
              register={register}
            />

            <button
              type="submit"
              className="flex bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82] ml-auto mt-4"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
