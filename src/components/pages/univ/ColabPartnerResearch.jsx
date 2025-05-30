import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { useState } from "react";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";

export const ColabPartnerResearch = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "LEAD",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "BCF",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      region: "Sumatera Selatan",
      program: "LEAD",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "LEAD",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "LEAD",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      region: "DKI Jakarta",
      program: "BCF",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "LEAD",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "LEAD",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "BCF",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
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
      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};
