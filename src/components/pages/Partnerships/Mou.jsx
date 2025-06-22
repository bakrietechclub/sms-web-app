import { Pagination } from "../../fragments/Pagination";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../elements/Button";
import { Label } from "../../elements/Label";

import { useSelector } from "react-redux";
import { UnivMouPks } from "../../../data/data_univ";
import { MediaMouPks } from "../../../data/data_media";
import { INGOMouPks } from "../../../data/data_ingo";

export const Mou = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivMouPks;
  } else if (stakeholder === "media") {
    dataRaw = MediaMouPks;
  } else {
    dataRaw = INGOMouPks;
  }

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const headers = [
    "No.",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Jenis Kerjasama",
    "Jangka Kerjasama",
    "Jatuh Tempo",
    "Tahun Tanda Tangan",
    "Aksi",
  ];

  const [selected, setSelected] = useState({
    name: "",
    jenis: "",
    division: "",
    colabType: "",
    duration: "",
    dueDate: "",
    signYear: "",
  });

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200">{value.duration}</td>
      <td className="border-b border-gray-200">{value.dueDate}</td>
      <td className="border-b border-gray-200">{value.signYear}</td>
      <td className="px-6 py-3 border-b border-gray-200">
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            handleClick();
            setSelected(value);
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  if (!showDetail) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Tabel MoU</h1>
        <div className="w-full">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            onAddClick={(opt) => handleAdd(opt)}
            filters={[
              {
                label: "Jenis Instansi",
                options: [
                  { label: "Universitas", value: "universitas" },
                  { label: "Lembaga Sosial", value: "lembaga sosial" },
                ],
              },
            ]}
            onFilterSet={() => console.log("Filter diset")}
            searchWidth="w-1/4"
          />
        </div>
        <div className="w-full overflow-hidden h-fit">
          <FreezeTable
            headers={headers}
            data={dataRaw}
            renderRow={renderRow}
            renderRowFreeze={renderRowFreeze}
            freezeCol={4}
          />
        </div>
        <Pagination />
      </div>
    );
  } else {
    return (
      <div>
        <Button
          className={"text-[#0D4690] cursor-pointer flex"}
          onClick={() => {
            handleClick();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap MoU / PKS</h1>
        <div className="flex justify-end">
          <Button
            className={
              "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
            }
          >
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div className="">
            <p className="font-semibold">Nama Instansi:</p>
            <p className="">{selected.name}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jenis Instansi</p>
            <p className="">{selected.jenis}</p>
          </div>
          <div className="">
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="">{selected.division}</p>
          </div>
          <div className="">
            <p className="font-semibold">Program Kerjasama:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Detail Kerjasama:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Status:</p>
            <p className="">
              <Label label={"Sudah Diperiksa oleh Mitra"} status={""} />
            </p>
          </div>
          <div className="">
            <p className="font-semibold">Nomor Surat BCF:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Nomor Surat Mitra:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Nama Pihak BCF:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Nama Pihak Mitra:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Tanggal Tanda Tangan:</p>
            <p className="">{selected.signYear}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jangka Waktu:</p>
            <p className="">{selected.duration}</p>
          </div>
          <div className="">
            <p className="font-semibold">Tanggal Jatuh Tempo:</p>
            <p className="">{selected.dueDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-5 mb-5">
          <div className="">
            <p className="font-semibold">Link Dokumen:</p>
            <a href="#" className="text-[#0D4690] italic underline">
              Link Dokumen MoU
            </a>
          </div>
          <div className="">
            <p className="font-semibold">Catatan Tambahan:</p>
            <p className="">-</p>
          </div>
        </div>
      </div>
    );
  }
};
