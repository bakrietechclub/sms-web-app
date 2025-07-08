import { Button } from "../../elements/Button";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { MediaProgramRecap } from "../../../data/data_media";

export const Program = () => {
  const [search, setSearch] = useState("");

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
        <Button
          onClick={() => {
            alert("Perbarui Data feature not ready yet");
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Perbarui Data
        </Button>
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
            {MediaProgramRecap.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};
