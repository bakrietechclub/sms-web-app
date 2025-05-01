import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";

export const PotentialPartnerResearchINGO = () => {
  const data = [
    {
      name: "MacArthur Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "APEC",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "IMF",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "FHI 360",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Coca-Cola Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "Rockefeller Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD, HOL",
      status: true,
    },
    {
      name: "Welcome Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, LEAD, HOL",
      status: false,
    },
    {
      name: "The Global Fund",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "LEAD, HOL",
      status: false,
    },
    {
      name: "IKEA Foundation",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "JP Morgan Chase",
      jenis: "Lembaga Internasional",
      region: "Internasional",
      program: "CLP, LEAD, HOL",
      status: true,
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program LSD",
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
      <h1 className="text-2xl font-semibold">Daftar Riset Potensial Mitra</h1>
      <TableToolbar />
      <Table headers={headers} data={data} renderRow={renderRow} />
    </div>
  );
};
