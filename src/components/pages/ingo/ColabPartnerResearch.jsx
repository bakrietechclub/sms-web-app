import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const ColabPartnerResearchINGO = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "MacArthur Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD",
    },
    {
      name: "APEC",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "BCF",
    },
    {
      name: "IMF",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD",
    },
    {
      name: "FHI 360",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD",
    },
    {
      name: "Coca-Cola Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD",
    },
    {
      name: "Rockefeller Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "BCF",
    },
    {
      name: "Welcome Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD",
    },
    {
      name: "The Global Fund",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD",
    },
    {
      name: "IKEA Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "BCF",
    },
    {
      name: "JP Morgan Chase",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "BCF",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program Rencana Kolaborasi",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.region}</td>
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
      <h1 className="text-2xl font-semibold">Daftar Riset Kolaborasi Mitra</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={(type) => {
          if (type === "Kategori A") openModalA();
          if (type === "Kategori B") openModalB();
        }}
        addOptions={["Kategori A", "Kategori B"]}
        searchWidth="w-1/4"
      />
      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};
