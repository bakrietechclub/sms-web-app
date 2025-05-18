import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const CooperationSign = () => {
  const  [search, setSearch] = useState("");

  const data = [
    {
      name: "Kementrian Kesehatan",
      type: "Pemerintah Pusat",
      division: "DKI Jakarta",
      program: "BCF",
    },
    {
      name: "DPRD Sulawesi Utara",
      type: "Pemerintah Daerah",
      division: "Sulawesi Utara",
      program: "BCF",
    },
    {
      name: "Kementrian Luar Negeri",
      type: "Pemerintah Pusat",
      division: "DKI Jakarta",
      program: "CLP",
    },
    {
      name: "DPRD Jawa Timur",
      type: "Pemerintah Daerah",
      division: "Jawa Timur",
      program: "BCF",
    },
    {
      name: "KADIN Indonesia",
      type: "Dunia Usaha",
      division: "DKI Jakarta",
      program: "CLP, LEAD",
    },
    {
      name: "Johnson & Johnson",
      type: "Dunia Usaha",
      division: "DKI Jakarta",
      program: "CLP, LEAD",
    },
    {
      name: "KADIN Sumatera Utara",
      type: "Dunia Usaha",
      division: "Sumatera Utara",
      program: "CLP, LEAD",
    },
    {
      name: "Media Tempo",
      type: "Media Massa",
      division: "Banten",
      program: "CLP, LEAD",
    },
    {
      name: "Kompas",
      type: "Media Massa",
      division: "Banten",
      program: "CLP",
    },
    {
      name: "The Jakarta Post",
      type: "Media Massa",
      division: "DKI Jakarta",
      program: "CLP",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Program Kerjasama",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.type}</td>
      <td>{value.division}</td>
      <td>{value.program}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Tanda Kerjasama</h1>
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
