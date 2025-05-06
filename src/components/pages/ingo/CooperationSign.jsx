import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";

export const CooperationSignINGO = () => {
  const data = [
    {
      name: "MacArthur Foundation",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "LEAD",
    },
    {
      name: "APEC",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "BCF",
    },
    {
      name: "IMF",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "LEAD",
    },
    {
      name: "FHI 360",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "LEAD",
    },
    {
      name: "Coca-Cola Foundation",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "LEAD",
    },
    {
      name: "Rockefeller Foundation",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "BCF",
    },
    {
      name: "Welcome Foundation",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "LEAD",
    },
    {
      name: "The Global Fund",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "LEAD",
    },
    {
      name: "IKEA Foundation",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "BCF",
    },
    {
      name: "JP Morgan Chase",
      jenis: "Lembaga Internasional",
      division: "Organisasi",
      program: "BCF",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Program Kerjasama",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.division}</td>
      <td>{value.program}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Tanda Kerjasama</h1>
      <TableToolbar />
      <Table headers={headers} data={data} renderRow={renderRow} />
    </div>
  );
};
