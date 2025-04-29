import { Label } from "../elements/Label";

// Reusable Table Component
const Table = ({ headers, data, renderRow }) => (
  <table className="table-auto text-center w-full">
    <thead className="text-[#0D4690] bg-[#E7EDF4]">
      <tr className="h-10">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`text-lg font-medium ${
              index === 0 ? "rounded-tl-xl" : ""
            } ${index === headers.length - 1 ? "rounded-tr-xl" : ""}`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
  </table>
);

// ResearchPartnerTable Component
export const ResearchPartnerTable = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      region: "Sumatera Selatan",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      region: "DKI Jakarta",
      program: "LEAD, HOL",
      status: true,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, LEAD, HOL",
      status: false,
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
      <td>{index + 1}</td>
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

  return <Table headers={headers} data={data} renderRow={renderRow} />;
};

// AudienceTable Component
export const AudienceTable = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "re-audiensi",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "selesai",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "belum",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Tanggal",
    "Jam",
    "Jenis",
    "Status",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td>{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.tanggal}</td>
      <td>{value.jam}</td>
      <td>
        <Label
          label={value.audiensi ? "Online" : "Offline"}
          status={value.audiensi ? "info" : "white"}
        />
      </td>
      <td>
        <Label
          label={
            value.status === "re-audiensi"
              ? "Re-Audiensi"
              : value.status === "selesai"
              ? "Selesai"
              : "Belum Audiensi"
          }
          status={
            value.status === "re-audiensi"
              ? "warning"
              : value.status === "selesai"
              ? "success"
              : "danger"
          }
        />
      </td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return <Table headers={headers} data={data} renderRow={renderRow} />;
};
