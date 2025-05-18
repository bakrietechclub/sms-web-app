import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { useState } from "react";
import { TableToolbar } from "../../fragments/TableToolbar";


export const Audience = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
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
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

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
        filters={["Status: Aktif", "Kategori: Umum"]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"     
      />
      <Table headers={headers} data={data} renderRow={renderRow} />
    </div>
  );
};
