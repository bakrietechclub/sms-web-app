import { Table } from "../../fragments/Table";
import { TableToolbar} from "../../fragments/TableToolbar";
import { useState } from "react";

export const MediaRecap = () => {
  const  [search, setSearch] = useState("");
  const data = [
    {
      name: "Kementrian Kesehatan",
      program: "Pemerintah Pusat",
      year: "DKI Jakarta",
      newsCount: "BCF",
    },
    {
      name: "DPRD Sulawesi Utara",
      program: "Pemerintah Daerah",
      year: "Sulawesi Utara",
      newsCount: "BCF",
    },
    {
      name: "Kementrian Luar Negeri",
      program: "Pemerintah Pusat",
      year: "DKI Jakarta",
      newsCount: "CLP",
    },
    {
      name: "DPRD Jawa Timur",
      program: "Pemerintah Daerah",
      year: "Jawa Timur",
      newsCount: "BCF",
    },
    {
      name: "KADIN Indonesia",
      program: "Dunia Usaha",
      year: "DKI Jakarta",
      newsCount: "CLP, LEAD",
    },
    {
      name: "Johnson & Johnson",
      program: "Dunia Usaha",
      year: "DKI Jakarta",
      newsCount: "CLP, LEAD",
    },
    {
      name: "KADIN Sumatera Utara",
      program: "Dunia Usaha",
      year: "Sumatera Utara",
      newsCount: "CLP, LEAD",
    },
    {
      name: "Media Tempo",
      program: "Media Massa",
      year: "Banten",
      newsCount: "CLP, LEAD",
    },
    {
      name: "Kompas",
      program: "Media Massa",
      year: "Banten",
      newsCount: "CLP",
    },
    {
      name: "The Jakarta Post",
      program: "Media Massa",
      year: "DKI Jakarta",
      newsCount: "CLP",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Program",
    "Tahun",
    "Jumlah Berita Yang Dikeluarkan",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.program}</td>
      <td>{value.year}</td>
      <td>{value.newsCount}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Output Pemberitaan per-Media</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}  
        searchWidth="w-1/3"
      />
      <Table headers={headers} data={data} renderRow={renderRow} />
    </div>
  );
};
