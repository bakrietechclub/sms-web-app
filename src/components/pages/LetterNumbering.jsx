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

// Import modal untuk setiap jenis stakeholder
import { AddModalLetterNumberingUniv } from "../fragments/modalforms/univ/AddModalLetterNumberingUniv";
import { AddModalLetterNumberingMedia } from "../fragments/modalforms/media/AddModalLetterNumberingMedia";
import { AddModalLetterNumberingINGO } from "../fragments/modalforms/ingo/AddModalLetterNumberingINGO";

export const LetterNumbering = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  // Tentukan data berdasarkan stakeholder
  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivLetterNumbering;
  } else if (stakeholder === "media") {
    dataRaw = MediaLetterNumbering;
  } else {
    dataRaw = INGOLetterNumbering;
  }

  // Header tabel
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

  // Fungsi render baris tabel yang dibekukan (freeze)
  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  // Fungsi render baris tabel utama
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

  // Filter options umum untuk semua stakeholder
  const filterOptions = [
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
        { label: "Surat Permohonan Kerjasama", value: "surat permohonan kerjasama" },
        { label: "Surat Undangan Audiensi", value: "surat undangan audiensi" },
        { label: "MoU (Nota Kesepahaman)", value: "MoU (nota kesepahaman)" },
        { label: "PKS (Perjanjian Kerjasama)", value: "PKS (perjanjian kerjasama)" },
        { label: "IA (Implementation Agreement)", value: "IA (implementation agreement)" },
        { label: "SPK (Surat Pernyataan Komitmen)", value: "SPK (surat pernyataan komitmen)" },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Penomoran Surat</h1>

      {/* TableToolbar untuk pencarian dan filter */}
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}  // Menggunakan filter yang sama untuk semua stakeholder
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"
      />
      
      <div>
        {/* Tabel dengan FreezeTable */}
        <FreezeTable
          headers={headers}
          data={dataRaw}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
        />
      </div>
      
      {/* Pagination */}
      <Pagination />

      {/* Modal berdasarkan stakeholder yang dipilih */}
      {isModalOpen && stakeholder === "universitas" && (
        <AddModalLetterNumberingUniv isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && stakeholder === "media" && (
        <AddModalLetterNumberingMedia isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && stakeholder === "lembagaInternasional" && (
        <AddModalLetterNumberingINGO isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
