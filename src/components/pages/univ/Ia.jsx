import { FreezeTable } from "../../fragments/Table";
import { Label } from "../../elements/Label";
import { TableToolbar } from "../../fragments/TableToolbar";

export const Ia = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      division: "Universitas",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2024",
      batchEdition: "Batch 8",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      division: "Prodi Ilmu Komputer",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2024",
      batchEdition: "Batch 8",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      division: "FISIP",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2024",
      batchEdition: "Batch 8",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      division: "Prodi Farmasi",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2024",
      batchEdition: "Batch 8",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      division: "Fakultas Ilmu Komputer",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2023",
      batchEdition: "Batch 7",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2023",
      batchEdition: "Batch 7",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2023",
      batchEdition: "Batch 7",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2022",
      batchEdition: "Batch 6",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2022",
      batchEdition: "Batch 6",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabStatus: "Sedang Berlangsung",
      program: "CLP",
      year: "2022",
      batchEdition: "Batch 6",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Status Kerjasama",
    "Program Implementasi",
    "Tahun Implementasi",
    "Batch",
    "Aksi",
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
      <td className="py-3 px-4 border-b border-gray-200">
        <Label label={value.colabStatus} status="success" />
      </td>
      <td className="px-4 border-b border-gray-200">
        <Label label={value.program} status="warning" />
      </td>
      <td className="px-4 border-b border-gray-200">{value.year}</td>
      <td className="px-4 border-b border-gray-200">{value.batchEdition}</td>
      <td className="px-4 border-b border-gray-200">
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel IA</h1>
      <TableToolbar />
      <div>
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
