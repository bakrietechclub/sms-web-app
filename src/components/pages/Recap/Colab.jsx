import { Label } from "../../elements/Label";
import { Pagination } from "../../fragments/Pagination";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { useSelector } from "react-redux";

import { MediaColabRecap } from "../../../data/data_media";
import { INGOColabRecap } from "../../../data/data_ingo";

export const Colab = () => {
  const [search, setSearch] = useState("");
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stakeholder === "media") {
    dataRaw = MediaColabRecap;
  } else {
    dataRaw = INGOColabRecap;
  }

  const headers = [
    "No.",
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
      <td className="border border-gray-200 px-4 py-2">{value.mouDue}</td>
      <td className="border border-gray-200 px-4 py-2">{value.pksDue}</td>
      <td className="border border-gray-200 px-4 py-2">{value.dueDate}</td>
      <td className="border border-gray-200 px-4 py-2 flex flex-wrap gap-1">
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
      <td className="border border-gray-200 px-4 py-2">
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
      <h1 className="text-2xl font-semibold">Rekap Implementasi Kerjasama</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Jenis Instansi",
            options: [
              { label: "Pemerintah Pusat", value: "pemerintah pusat" },
              { label: "Pemerintah Daerah", value: "pemerintah daerah" },
              { label: "Dunia Usaha", value: "dunia usaha" },
              { label: "Media Masa", value: "media masa" },
            ],
          },
          {
            label: "Tahun Kerjasama",
            options: [
              { label: "2022", value: "2022" },
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
            ],
          },
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"
      />
      <div>
        <FreezeTable
          headers={headers}
          data={dataRaw}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
          customHeaderRight={customHeaderRight}
          withHeaderColumnBorders={true}
        />
      </div>
      <Pagination />
    </div>
  );
};
