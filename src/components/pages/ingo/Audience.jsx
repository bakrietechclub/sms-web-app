import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export const AudienceINGO = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
      division: "Fakultas Ilmu Komputer",
      place: "Wisma Bakrie, Lt. 2",
      link: "https://bcf.or.id/campus-leaders-program-9-mandiri",
      note: "Catatan",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "re-audiensi",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "selesai",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "belum",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "selesai",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "belum",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "selesai",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "selesai",
    },
  ];

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
      <td>{value.jenis}</td>
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
          onAddClick={(type) => {
            if (type === "Kategori A") openModalA();
            if (type === "Kategori B") openModalB();
          }}
          addOptions={["Kategori A", "Kategori B"]}
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
        <Table headers={headers} data={data} renderRow={renderRow} />
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
