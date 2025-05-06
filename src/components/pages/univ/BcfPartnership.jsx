import { Eye } from "lucide-react";
import { FreezeTable } from "../../fragments/Table";
import { Button } from "../../elements/Button";

export const BcfPartnership = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      type: "Universitas",
      division: "Universitas",
      region: "DKI Jakarta",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Universitas Jakarta",
      type: "Universitas",
      division: "Prodi Ilmu Komputer",
      region: "DKI Jakarta",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Universitas Sriwijaya",
      type: "Universitas",
      division: "FISIP",
      region: "Sumatera Selatan",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Universitas Gunadarma",
      type: "Universitas",
      division: "Prodi Farmasi",
      region: "Jawa Barat",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Universitas Telkom",
      type: "Universitas",
      division: "Fakultas Ilmu Komputer",
      region: "Jawa Barat",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "STPI Penabulu",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "TOR",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "SPK",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "TOR",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "SPK",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      division: "Organisasi",
      region: "TOR",
      category: "CLP",
      colabProgress: "24/10/2029",
    },
  ];

  const headers = [
    "No.",
    "Nama Instansi",
    "type Instansi",
    "Divisi Instansi",
    "Region",
    "Kategori Program",
    "Progress Kerjasama",
    "Status",
    "Jatuh Tempo",
    "Aksi",
    "Status",
    "Jatuh Tempo",
    "Aksi",
    "Kontak",
  ];

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

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Database Partnership</h1>
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
