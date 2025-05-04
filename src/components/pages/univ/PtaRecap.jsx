import { Label } from "../../elements/Label";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";

export const PtaRecap = () => {
  const data = [
    {
      name: "Universitas Indonesia",
      type: "Universitas",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["LEAD", "CLP"],
    },
    {
      name: "Universitas Jakarta",
      type: "Universitas",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["LEAD", "HOL"],
    },
    {
      name: "Universitas Sriwijaya",
      type: "Universitas",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["BCF"],
    },
    {
      name: "Universitas Gunadarma",
      type: "Universitas",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP", "HOL"],
    },
    {
      name: "Universitas Telkom",
      type: "Universitas",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP", "HOL"],
    },
    {
      name: "STPI Penabulu",
      type: "Lembaga Sosial",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP"],
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP", "LEAD"],
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP"],
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP"],
    },
    {
      name: "Gerakan TBC",
      type: "Lembaga Sosial",
      colabStatus: "Sedang Berlangsung",
      mouDue: "2024-01-01",
      pksDue: "2024-01-01",
      dueDate: "2024-01-01",
      status: ["CLP", "LEAD"],
    },
  ];

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Status Kerjasama",
    "Jatuh Tempo MoU",
    "Jatuh Tempo PKS",
    "Jatuh Tempo",
    "Status",
    "Aksi",
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.type}</td>
      <td>
        <Label label={value.colabStatus} status="success" />
      </td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{value.mouDue}</td>
      <td>{value.pksDue}</td>
      <td>{value.dueDate}</td>
      <td className="justify-start">
        {value.status.length > 0 ? (
          value.status.map((status, idx) => (
            <Label
              key={idx}
              label={status}
              status={
                status === "LEAD"
                  ? "default"
                  : status === "CLP"
                  ? "warning"
                  : status === "HOL"
                  ? "success"
                  : status === "BCF"
                  ? "danger"
                  : "default"
              }
              className=""
            />
          ))
        ) : (
          <span>-</span>
        )}
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
      <h1 className="text-2xl font-semibold">Rekap PTA</h1>
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
