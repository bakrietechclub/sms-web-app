import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";

export const PartnerResearch = () => {
  const data = [
    {
      name: "Kementrian Kesehatan",
      jenis: "Pemerintah Pusat",
      region: "DKI Jakarta",
      program: "BCF",
      status: false,
    },
    {
      name: "DPRD Sulawesi Utara",
      jenis: "Pemerintah Daerah",
      region: "Sulawesi Utara",
      program: "BCF",
      status: true,
    },
    {
      name: "Kementrian Luar Negeri",
      jenis: "Pemerintah Pusat",
      region: "DKI Jakarta",
      program: "CLP",
      status: false,
    },
    {
      name: "DPRD Jawa Timur",
      jenis: "Pemerintah Daerah",
      region: "Jawa Timur",
      program: "BCF",
      status: true,
    },
    {
      name: "KADIN Indonesia",
      jenis: "Dunia Usaha",
      region: "DKI Jakarta",
      program: "CLP, LEAD",
      status: false,
    },
    {
      name: "Johnson & Johnson",
      jenis: "Dunia Usaha",
      region: "DKI Jakarta",
      program: "CLP, LEAD",
      status: true,
    },
    {
      name: "KADIN Sumatera Utara",
      jenis: "Dunia Usaha",
      region: "Sumatera Utara",
      program: "CLP, LEAD",
      status: false,
    },
    {
      name: "Media Tempo",
      jenis: "Media Massa",
      region: "Banten",
      program: "CLP, LEAD",
      status: false,
    },
    {
      name: "Kompas",
      jenis: "Media Massa",
      region: "Banten",
      program: "CLP",
      status: true,
    },
    {
      name: "The Jakarta Post",
      jenis: "Media Massa",
      region: "DKI Jakarta",
      program: "CLP",
      status: true,
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program Kerjasama",
    "Status",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.region}</td>
      <td>{value.program}</td>
      <td>
        <Label
          label={(value.status ? "Sudah" : "Belum") + " dikontak"}
          status={value.status ? "success" : "danger"}
        />
      </td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Daftar Riset Mitra</h1>
      <TableToolbar />
      <Table headers={headers} data={data} renderRow={renderRow} />
    </div>
  );
};
