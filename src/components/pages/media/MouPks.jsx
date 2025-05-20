import { Pagination } from "../../fragments/Pagination";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const MouPksMedia = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Kementrian Kesehatan",
      jenis: "Pemerintah Pusat",
      division: "Tim percepatan",
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
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{value.colabType}</td>
      <td>{value.duration}</td>
      <td>{value.dueDate}</td>
      <td>{value.signYear}</td>
      <td className="px-6 py-3">
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
                { label: "Pemerintah Pusat", value: "pemerintah pusat" },
                { label: "Pemerintah Daerah", value: "pemerintah daerah" },
                { label: "Dunia Usaha", value: "dunia usaha" },
                { label: "Media Masa", value: "media masa" },
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
      <Pagination />
    </div>
  );
};
