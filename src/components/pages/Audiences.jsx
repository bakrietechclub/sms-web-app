import { Label } from "../elements/Label";
import { Button } from "../elements/Button";
import { Table } from "../fragments/Table";
import { TableToolbar } from "../fragments/TableToolbar";
import { Pagination } from "../fragments/Pagination";
import { useState } from "react";
import { useSelector } from "react-redux";

import { UnivAudience } from "../../data/data_univ";
import { MediaAudience } from "../../data/data_media";
import { INGOAudience } from "../../data/data_ingo";

import { ChevronLeft } from "lucide-react";

export const Audiences = () => {
  const stekholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stekholder === "universitas") {
    dataRaw = UnivAudience;
  } else if (stekholder === "media") {
    dataRaw = MediaAudience;
  } else {
    dataRaw = INGOAudience;
  }

  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const [selected, setSelected] = useState({
    name: "",
    type: "",
    tanggal: "",
    jam: "",
    audiensi: false,
    status: "belum",
    division: "",
    place: "",
    link: "",
    note: "",
  });

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Tanggal",
    "Jam",
    "Jenis",
    "Status",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.type}</td>
      <td>{value.tanggal}</td>
      <td>{value.jam}</td>
      <td>
        <Label
          label={value.audiensi ? "Online" : "Offline"}
          status={value.audiensi ? "info" : "white"}
        />
      </td>
      <td>
        <Label
          label={
            value.status === "re-audiensi"
              ? "Re-Audiensi"
              : value.status === "selesai"
              ? "Selesai"
              : "Belum Audiensi"
          }
          status={
            value.status === "re-audiensi"
              ? "warning"
              : value.status === "selesai"
              ? "success"
              : "danger"
          }
        />
      </td>
      <td>
        <Button
          onClick={() => {
            handleClick();
            setSelected(value);
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  if (!showDetail) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Tabel Data Audiensi</h1>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={() => {
            openModalA();
          }}
          filters={[
            {
              label: "Status",
              options: [
                { label: "Belum Audiensi", value: "belum audiensi" },
                { label: "Re-audiensi", value: "re-audiensi" },
                { label: "Selesai", value: "selesai" },
              ],
            },
          ]}
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/4"
        />
        <Table headers={headers} data={dataRaw} renderRow={renderRow} />
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
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap Audiensi</h1>
        <div className="flex justify-end">
          <Button
            className={
              "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
            }
          >
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Nama Instansi:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div className="">
            <p className="font-semibold">Tanggal:</p>
            <p className="ml-2">{selected.tanggal}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jenis Instansi:</p>
            <p className="ml-2">{selected.type}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jam:</p>
            <p className="ml-2">{selected.jam}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 mb-7">
          <div className="">
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="ml-2">{selected.division}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Jenis Audiensi:</p>
            <Label
              label={selected.audiensi ? "Online" : "Offline"}
              status={selected.audiensi ? "info" : "white"}
            />
          </div>
          <div className="">
            <p className="font-semibold">Status Audiensi:</p>
            <Label
              label={
                selected.status === "re-audiensi"
                  ? "Re-Audiensi"
                  : selected.status === "selesai"
                  ? "Selesai"
                  : "Belum Audiensi"
              }
              status={
                selected.status === "re-audiensi"
                  ? "warning"
                  : selected.status === "selesai"
                  ? "success"
                  : "danger"
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Tempat Audiensi:</p>
            <p className="ml-2">{selected.place}</p>
          </div>
          <div className="">
            <p className="font-semibold">Link Dokumentasi:</p>
            <a
              className="ml-2 text-[#0D4690] italic underline"
              href={selected.link}
            >
              {selected.link}
            </a>
          </div>
          <div className="">
            <p className="font-semibold">Catatan Tambahan:</p>
            <p className="ml-2">{selected.note}</p>
          </div>
        </div>
      </div>
    );
  }
};
