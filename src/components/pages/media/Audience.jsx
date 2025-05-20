import { Label } from "../../elements/Label";
import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const AudienceMedia = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Kementrian Kesehatan",
      jenis: "Pemerintah Pusat",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "DPRD Sulawesi Utara",
      jenis: "Pemerintah Daerah",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "re-audiensi",
    },
    {
      name: "Kementrian Luar Negeri",
      jenis: "Pemerintah Pusat",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "selesai",
    },
    {
      name: "DPRD Jawa Timur",
      jenis: "Pemerintah Daerah",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "belum",
    },
    {
      name: "KADIN Indonesia",
      jenis: "Dunia Usaha",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "Johnson & Johnson",
      jenis: "Dunia Usaha",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "selesai",
    },
    {
      name: "KADIN Sumatera Utara",
      jenis: "Dunia Usaha",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "belum",
    },
    {
      name: "Media Tempo",
      jenis: "Media Massa",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "Kompas",
      jenis: "Media Massa",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "selesai",
    },
    {
      name: "The Jakarta Post",
      jenis: "Media Massa",
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
    "Jenis Audiensi",
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
        filters={[
          {
            label: "Jenis Instansi",
            options: [
              { label: "Pemerintah Pusat", value: "pemerintah pusat" },
              { label: "Pemerintah Daerah", value: "pemerintah daerah" },
              { label: "Dunia Usaha", value: "dunia usaha" },
              { label: "Media Masa", value: "media masa" },
            ],
          },
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
};
