import { Download } from "lucide-react";
import { Button } from "../elements/Button";
import { FreezeTable } from "../fragments/Table";
import { TableToolbar } from "../fragments/TableToolbar";
import { useState } from "react";
import { Pagination } from "../fragments/Pagination";
import { useSelector } from "react-redux";
import { UnivLetterNumbering } from "../../data/data_univ";
import { MediaLetterNumbering } from "../../data/data_media";
import { INGOLetterNumbering } from "../../data/data_ingo";

export const LetterNumbering = () => {
  const [search, setSearch] = useState("");
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );
  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivLetterNumbering;
  } else if (stakeholder === "media") {
    dataRaw = MediaLetterNumbering;
  } else {
    dataRaw = INGOLetterNumbering;
  }

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Jenis Surat",
    "Nomor Surat",
    "Tujuan dan Perihal",
    "Template Surat",
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td
        className="p-3 max-w-3 truncate border-b border-gray-200"
        title={value.letterType}
      >
        {value.letterType}
      </td>
      <td
        className="p-3 max-w-3 truncate border-b border-gray-200"
        title={value.letterNumber}
      >
        {value.letterNumber}
      </td>
      <td className="border-b border-gray-200" title={value.letterPurpose}>
        {value.letterPurpose}
      </td>
      <td className="mt-2 px-4 border-b border-gray-200">
        <Button
          className="flex items-center justify-center w-28 h-8 bg-[#e89229] text-[#f1f1f1] rounded-md p-auto px-4 hover:bg-[#d18325] cursor-pointer"
          onClick={() => alert("Download Template Surat")}
        >
          <Download className="mr-2" />
          Unduh
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Penomoran Surat</h1>
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
          {
            label: "Jenis Surat",
            options: [
              {
                label: "Surat Permohonan Kerjasama",
                value: "surat permohonan kerjasama",
              },
              {
                label: "Surat Undangan Audiensi",
                value: "surat undangan audiensi",
              },
              {
                label: "MoU (Nota Kesepahaman)",
                value: "MoU (nota kesepahaman)",
              },
              {
                label: "PKS (Perjanjian Kerjasama)",
                value: "PKS (perjanjian kerjasama)",
              },
              {
                label: "IA (Implementation Agreement)",
                value: "IA (implementation agreement)",
              },
              {
                label: "SPK (Surat Pernyataan Komitmen)",
                value: "SPK (surat pernyataan komitmen)",
              },
            ],
          },
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"
      />
      <div>
        <FreezeTable
          headers={headers}
          data={dataRaw}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
        />
      </div>
      <Pagination />
    </div>
  );
};
