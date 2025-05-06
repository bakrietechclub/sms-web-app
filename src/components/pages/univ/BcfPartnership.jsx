import { Eye } from "lucide-react";
import { FreezeTable } from "../../fragments/Table";
import { Button } from "../../elements/Button";
import { TableToolbar2 } from "../../fragments/TableToolbar";

export const BcfPartnership = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      type: "Universitas",
      division: "Universitas",
      region: "DKI Jakarta",
      category: "CLP",
      colabProgress: "Belum Dikontak",
    },
    {
      name: "Universitas Jakarta",
      type: "Universitas",
      division: "Prodi Ilmu Komputer",
      region: "DKI Jakarta",
      category: "CLP",
      colabProgress: "Dikontak",
    },
    {
      name: "Universitas Sriwijaya",
      type: "Universitas",
      division: "FISIP",
      region: "Sumatera Selatan",
      category: "CLP",
      colabProgress: "Sedang Proses",
    },
    {
      name: "Universitas Gunadarma",
      type: "Universitas",
      division: "Prodi Farmasi",
      region: "Jawa Barat",
      category: "CLP",
      colabProgress: "Sedang Berlangsung",
    },
    {
      name: "Universitas Telkom",
      type: "Universitas",
      division: "Fakultas Ilmu Komputer",
      region: "Jawa Barat",
      category: "CLP",
      colabProgress: "Terminasi",
    },
    {
      name: "STPI Penabulu",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "TOR",
      category: "CLP",
      colabProgress: "Perlu Follow Up",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "SPK",
      category: "CLP",
      colabProgress: "Belum Dikontak",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "TOR",
      category: "CLP",
      colabProgress: "Dikontak",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "SPK",
      category: "CLP",
      colabProgress: "Sedang Proses",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "TOR",
      category: "CLP",
      colabProgress: "Sedang Berlangsung",
    },
  ];

  const headers = ["No.", "Nama Instansi", "Jenis Instansi", "Divisi Instansi"];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.name}</td>
      <td>{value.name}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{value.region}</td>
      <td>{value.category}</td>
      <td>{value.colabProgress}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <Button>
          <Eye className="inline" />
          Lihat Kontak
        </Button>
      </td>
    </tr>
  );

  const customHeaderRight = (
    <>
      <tr>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Region
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Kategori Program
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Progress Kerjasama
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded"
          colSpan={3}
        >
          MoU
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded"
          colSpan={3}
        >
          PKS
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded-tr-xl"
          rowSpan={2}
        >
          Kontak
        </th>
      </tr>
      <tr>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Status
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Jatuh Tempo
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Aksi
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Status
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Jatuh Tempo
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Aksi
        </th>
      </tr>
    </>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Database Partnership</h1>
      <TableToolbar2 />
      <FreezeTable
        headers={headers}
        data={data}
        renderRow={renderRow}
        renderRowFreeze={renderRowFreeze}
        freezeCol={4}
        customHeaderRight={customHeaderRight}
        withHeaderColumnBorders={true}
      />
    </div>
  );
};
