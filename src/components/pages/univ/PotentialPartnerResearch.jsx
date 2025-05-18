import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { useState } from "react"
import { TableToolbar } from "../../fragments/TableToolbar";

export const PotentialPartnerResearch = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      region: "Sumatera Selatan",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      region: "DKI Jakarta",
      program: "LEAD, HOL",
      status: true,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, LEAD, HOL",
      status: false,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "LEAD, HOL",
      status: false,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, LEAD, HOL",
      status: true,
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program LSD",
    "Status",
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
        <Label
          label={(value.status ? "Sudah" : "Belum") + " dikontak"}
          status={value.status ? "success" : "danger"}
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
      <h1 className="text-2xl font-semibold">Daftar Riset Potensial Mitra</h1>
      <TableToolbar 
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={(type) => {
          if (type === "Kategori A") openModalA();
          if (type === "Kategori B") openModalB();
        }}
        addOptions={[
          { label: "Kategori A", value: "Kategori A", checked: false },
          { label: "Kategori B", value: "Kategori B", checked: false }
        ]}
        filters={[
         {
            label: "Jenis Instansi",
            options: [
          { label: "Universitas", value: "universitas" },
          { label: "Lembaga Sosial", value: "lembaga sosial" },
         ],
        },
        {
           label: "Status Kontak",
           options: [
          { label: "Sudah dikontak", value: "sudah" },
          { label: "Belum dikontak", value: "belum" },
        ],
        },
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"     
      />
      <Table headers={headers} data={data} renderRow={renderRow} />
    </div>
  );
};
