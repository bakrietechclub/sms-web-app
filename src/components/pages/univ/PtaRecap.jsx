import { Label } from "../../elements/Label";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const PtaRecap = () => {
  const  [search, setSearch] = useState("");

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
    <tr key={index} className="border-x border-r border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 py-3">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.type}</td>
      <td className="border-b border-gray-200">
        <Label label={value.colabStatus} status="success" />
      </td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-x border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 px-4 py-2">{value.mouDue}</td>
      <td className="border-b border-gray-200 px-4 py-2">{value.pksDue}</td>
      <td className="border-b border-gray-200 px-4 py-2">{value.dueDate}</td>
      <td className="border-b border-gray-200 px-4 py-3 flex flex-wrap gap-1">
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
            />
          ))
        ) : (
          <span>-</span>
        )}
      </td>
      <td className="border-b border-gray-200 px-4 py-2">
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
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
          Jatuh Tempo MoU
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Jatuh Tempo PKS
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded-tr-xl"
          colSpan={3}
        >
          Implementasi Kerja Sama
        </th>
      </tr>
      <tr>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Jatuh Tempo
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Status
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Aksi
        </th>
      </tr>
    </>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Rekap PTA</h1>
      <TableToolbar 
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
        {
           label: "Jenis Instansi",
           options: [
          { label: "Universitas", value: "universitas" },
          { label: "Lembaga Sosial", value: "lembaga sosial" },
        ],
        },
        {
          label: "Tahun Kerjasama",
          options: [
            {label: "2020", value: "2020"},
            {label: "2021", value: "2021"},
            {label: "2022", value: "2022"},
            {label: "2023", value: "2023"},
            {label: "2024", value: "2024"},      
          ]
        }
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/3"     
      />
      <div>
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
    </div>
  );
};
