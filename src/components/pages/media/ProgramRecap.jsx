import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const ProgramRecap = () => {
  const  [search, setSearch] = useState("");
  const data = [
    {
      name: "Kementrian Kesehatan",
      program: "Pemerintah Pusat",
      year: "DKI Jakarta",
      link: "BCF",
    },
    {
      name: "DPRD Sulawesi Utara",
      program: "Pemerintah Daerah",
      year: "Sulawesi Utara",
      link: "BCF",
    },
    {
      name: "Kementrian Luar Negeri",
      program: "Pemerintah Pusat",
      year: "DKI Jakarta",
      link: "CLP",
    },
    {
      name: "DPRD Jawa Timur",
      program: "Pemerintah Daerah",
      year: "Jawa Timur",
      link: "BCF",
    },
    {
      name: "KADIN Indonesia",
      program: "Dunia Usaha",
      year: "DKI Jakarta",
      link: "CLP, LEAD",
    },
    {
      name: "Johnson & Johnson",
      program: "Dunia Usaha",
      year: "DKI Jakarta",
      link: "CLP, LEAD",
    },
    {
      name: "KADIN Sumatera Utara",
      program: "Dunia Usaha",
      year: "Sumatera Utara",
      link: "CLP, LEAD",
    },
    {
      name: "Media Tempo",
      program: "Media Massa",
      year: "Banten",
      link: "CLP, LEAD",
    },
    {
      name: "Kompas",
      program: "Media Massa",
      year: "Banten",
      link: "CLP",
    },
    {
      name: "The Jakarta Post",
      program: "Media Massa",
      year: "DKI Jakarta",
      link: "CLP",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Tier Media",
    "Skala Media",
    "Program",
    "Nama Kegiatan",
    "Tahun",
    "Tanggal",
    "Headline",
    "Tipe Publikasi",
    "Link Pemberitaan",
    "Tone",
    "AVE",
    "PR Factor",
    "PR Value",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>Tier Media</td>
      <td>Skala Media</td>
      <td>{value.program}</td>
      <td>Nama Kegiatan</td>
      <td>{value.year}</td>
      <td>Tanggal</td>
      <td>Headline</td>
      <td>Tipe Publikasi</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          {value.link}
        </a>
      </td>
      <td>Tone</td>
      <td>AVE</td>
      <td>PR Factor</td>
      <td>PR Value</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Output Pemberitaan per-Program</h1>
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
            label: "Tahun",
            options: [
              {label: "2023", value: "2023"},
              {label: "2024", value: "2024"}
            ]
          },
          {
            label: "Program",
            options: [
              {label: "BCF", value: "bcf"},
              {label: "CLP", value: "clp"},
              {label: "Lead", value: "lead"},
              {label: "HOL", value: "hol"},
              {label: "SDI", value: "sdi"}
            ]
          },
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"     
      />
      <div className="overflow-x-auto w-full">
        <table className="text-center w-600 table-auto">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`text-base font-semibold ${
                    index === 0 ? "rounded-tl-xl" : ""
                  } ${index === headers.length - 1 ? "rounded-tr-xl" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base font-normal">
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
