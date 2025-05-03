import { Download } from "lucide-react";
import { Button } from "../../elements/Button";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";

export const LetterNumbering = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      division: "Universitas",
      letterType: "Surat Permohonan Kerjasama",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      division: "Prodi Ilmu Komputer",
      letterType: "Surat Undangan",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      division: "FISIP",
      letterType: "IA (Implementation Agreement)",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      division: "Prodi Farmasi",
      letterType: "PKS (Perjanjian Kerjasama)",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      division: "Fakultas Ilmu Komputer",
      letterType: "MoU (Memorandum of Understanding)",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      letterType: "Surat Permohonan Kerjasama",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      letterType: "MoU (Memorandum of Understanding)",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      letterType: "MoU (Memorandum of Understanding)",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      letterType: "Surat Permohonan Kerjasama",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      letterType: "Surat Undangan",
      letterNumber: "1515/ADM-BCF/1/VII/2024",
      letterPurpose: "Undangan",
    },
  ];

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
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="p-3 max-w-3 truncate" title={value.letterType}>
        {value.letterType}
      </td>
      <td className="p-3 max-w-3 truncate" title={value.letterNumber}>
        {value.letterNumber}
      </td>
      <td className="" title={value.letterPurpose}>
        {value.letterPurpose}
      </td>
      <td>
        <Button
          className="flex items-center w-auto bg-[#e89229] text-[#f1f1f1] rounded-md py-2 px-4 hover:bg-[#d18325] cursor-pointer"
          onClick={() => alert("Download Template Surat")}
        >
          <Download className="w-4 h-4 mr-2" />
          Unduh
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Penomoran Surat</h1>
      <TableToolbar />
      <div className="overflow-x-scroll">
        <FreezeTable
          headers={headers}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
        />
      </div>
    </div>
  );
};
