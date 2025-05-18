import { Eye } from "lucide-react";
import { FreezeTable } from "../../fragments/Table";
import { Button } from "../../elements/Button";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const BcfPartnershipINGO = () => {
  const  [search, setSearch] = useState("");

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
    <tr key={index} className="border-x border-r border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 py-3">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.name}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-x border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 py-3">{value.region}</td>
      <td className="border-b border-gray-200">{value.category}</td>
      <td className="border-b border-gray-200">{value.colabProgress}</td>
      <td className="border-b border-gray-200"></td>
      <td className="border-b border-gray-200"></td>
      <td className="border-b border-gray-200"></td>
      <td className="border-b border-gray-200"></td>
      <td className="border-b border-gray-200"></td>
      <td className="border-b border-gray-200"></td>
      <td className="border-b border-gray-200">
        <Button
          className="flex text-sm p-1 m-2 items-center justify-center bg-[#e89229] text-[#f1f1f1] rounded-md hover:bg-[#d18325] cursor-pointer gap-1"
          onClick={() => alert("Lihat Kontak")}
        >
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
      <TableToolbar 
        searchValue={search}
        onSearchChange={setSearch}
        filters={["Status: Aktif", "Kategori: Umum"]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/3"     
      />
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
