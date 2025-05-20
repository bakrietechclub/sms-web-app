import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const MouPks = () => {
  const  [search, setSearch] = useState("");

  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      division: "Universitas",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      division: "Prodi Ilmu Komputer",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      division: "FISIP",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      division: "Prodi Farmasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      division: "Fakultas Ilmu Komputer",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
  ];

  const headers = [
    "No.",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Jenis Kerjasama",
    "Jangka Kerjasama",
    "Jatuh Tempo",
    "Tahun Tanda Tangan",
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
      <td className="py-3 border-b border-gray-200">{value.colabType}</td>
      <td className="border-b border-gray-200">{value.duration}</td>
      <td className="border-b border-gray-200">{value.dueDate}</td>
      <td className="border-b border-gray-200">{value.signYear}</td>
      <td className="px-6 py-3 border-b border-gray-200">
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel MoU / PKS</h1>
      <div className="w-full">
      <TableToolbar 
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={(opt) => handleAdd(opt)}
        addOptions={["MoU", "PKS"]}
        filters={[
         {
            label: "Jenis Surat",
            options: [
          { label: "MoU", value: "MoU" },
          { label: "PKS", value: "PKS" },
         ],
        },
        {
           label: "Jenis Instansi",
           options: [
          { label: "Universitas", value: "universitas" },
          { label: "Lembaga Sosial", value: "lembaga sosial" },
        ],
        },
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"     
      />
      </div>
      <div className="w-full overflow-hidden h-fit">
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
