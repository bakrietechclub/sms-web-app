import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { MediaRecapData } from "../../../data/data_media";

export const Media = () => {
  const [search, setSearch] = useState("");

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
        filters={[
          {
            label: "Tahun",
            options: [
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
            ],
          },
          {
            label: "Program",
            options: [
              { label: "BCF", value: "bcf" },
              { label: "CLP", value: "clp" },
              { label: "Lead", value: "lead" },
              { label: "HOL", value: "hol" },
              { label: "SDI", value: "sdi" },
            ],
          },
        ]}
      />
      <Table headers={headers} data={MediaRecapData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};
