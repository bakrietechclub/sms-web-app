import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";

export const SpkTor = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      division: "Universitas",
      colabType: "SPK",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      division: "Prodi Ilmu Komputer",
      colabType: "TOR",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      division: "FISIP",
      colabType: "SPK",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      division: "Prodi Farmasi",
      colabType: "SPK",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      division: "Fakultas Ilmu Komputer",
      colabType: "SPK",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "TOR",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "SPK",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "TOR",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "SPK",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "TOR",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signDate: "24/10/2024",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Jenis Kerjasama",
    "Tanggal Tanda Tangan",
    "Jangka Kerjasama",
    "Jatuh Tempo",
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
      <td>{value.signDate}</td>
      <td>{value.duration}</td>
      <td>{value.dueDate}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Surat SPK/TOR</h1>
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
