import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const PartnerResearch = () => {
  const  [search, setSearch] = useState("");
    
  const data = [
    {
      name: "Kementrian Kesehatan",
      jenis: "Pemerintah Pusat",
      region: "DKI Jakarta",
      program: "BCF",
      status: false,
    },
    {
      name: "DPRD Sulawesi Utara",
      jenis: "Pemerintah Daerah",
      region: "Sulawesi Utara",
      program: "BCF",
      status: true,
    },
    {
      name: "Kementrian Luar Negeri",
      jenis: "Pemerintah Pusat",
      region: "DKI Jakarta",
      program: "CLP",
      status: false,
    },
    {
      name: "DPRD Jawa Timur",
      jenis: "Pemerintah Daerah",
      region: "Jawa Timur",
      program: "BCF",
      status: true,
    },
    {
      name: "KADIN Indonesia",
      jenis: "Dunia Usaha",
      region: "DKI Jakarta",
      program: "CLP, LEAD",
      status: false,
    },
    {
      name: "Johnson & Johnson",
      jenis: "Dunia Usaha",
      region: "DKI Jakarta",
      program: "CLP, LEAD",
      status: true,
    },
    {
      name: "KADIN Sumatera Utara",
      jenis: "Dunia Usaha",
      region: "Sumatera Utara",
      program: "CLP, LEAD",
      status: false,
    },
    {
      name: "Media Tempo",
      jenis: "Media Massa",
      region: "Banten",
      program: "CLP, LEAD",
      status: false,
    },
    {
      name: "Kompas",
      jenis: "Media Massa",
      region: "Banten",
      program: "CLP",
      status: true,
    },
    {
      name: "The Jakarta Post",
      jenis: "Media Massa",
      region: "DKI Jakarta",
      program: "CLP",
      status: true,
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program Kerjasama",
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
      <h1 className="text-2xl font-semibold">Daftar Riset Mitra</h1>
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
          { label: "Sudah Dikontak", value: "sudah dikontak" },
          { label: "Belum Dikontak", value: "belum dikontak" },
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
