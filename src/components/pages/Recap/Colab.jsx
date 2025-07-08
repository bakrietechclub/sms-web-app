import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { Table, FreezeTable } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ChevronLeft, ListFilter } from "lucide-react";

import { MediaColabRecap } from "../../../data/data_media";
import { INGOColabRecap } from "../../../data/data_ingo";

export const Colab = () => {
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(null);
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const handleDetailClick = () => {
    setShowDetail(!showDetail);
  };

  let dataRaw;
  if (stakeholder === "media") {
    dataRaw = MediaColabRecap;
  } else {
    dataRaw = INGOColabRecap;
  }

  const dummyDetailData = [
    {
      year: "2024",
      program: "LEAD",
      colabDetail: "Menjadi mentor LEAD batch 7",
    },
    {
      year: "2024",
      program: "LEAD",
      colabDetail: "Menjadi mentor LEAD batch 7",
    },
    {
      year: "2024",
      program: "CLP",
      colabDetail: "Pendanaan",
    },
    {
      year: "2024",
      program: "LEAD",
      colabDetail: "Menjadi mentor LEAD batch 7",
    },
    {
      year: "2024",
      program: "LEAD",
      colabDetail: "Menjadi mentor LEAD batch 7",
    },
    {
      year: "2024",
      program: "CLP",
      colabDetail: "Pendanaan",
    },
    {
      year: "2024",
      program: "LEAD",
      colabDetail: "Menjadi mentor LEAD batch 7",
    },
    {
      year: "2024",
      program: "LEAD",
      colabDetail: "Menjadi mentor LEAD batch 7",
    },
    {
      year: "2024",
      program: "CLP",
      colabDetail: "Pendanaan",
    },
  ];

  const headersDetail = ["No.", "Tahun", "Program", "Detail Kerjasama"];

  const renderRowDetail = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
      <td className="border border-gray-200 px-4 py-2">{value.year}</td>
      <td className="border border-gray-200 px-4 py-2">
        <Label
          key={index}
          label={value.program}
          status={
            value.program === "LEAD"
              ? "default"
              : value.program === "CLP"
              ? "warning"
              : value.program === "HOL"
              ? "success"
              : value.program === "BCF"
              ? "danger"
              : "default"
          }
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">{value.colabDetail}</td>
    </tr>
  );

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
        <Button
          onClick={() => {
            setSelected(value);
            handleDetailClick();
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
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

  if (!showDetail) {
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
  } else {
    return (
      <div>
        <Button
          className="text-[#0D4690] cursor-pointer flex items-center"
          onClick={handleDetailClick}
        >
          <ChevronLeft className="mr-1" size={20} /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold my-5">
          Data Lengkap Implementasi Kerja
        </h1>
        <div className="grid grid-cols-2 gap-7">
          <div>
            <p className="font-semibold">Nama Instansi:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi:</p>
            <p className="ml-2">{selected.type}</p>
          </div>
          <div>
            <p className="font-semibold">Status Kerjasama:</p>
            <p className="ml-2">{selected.colabStatus}</p>
          </div>
          <div>
            <p className="font-semibold">Program Kerjasama:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Status MoU:</p>
          </div>
          <div>
            <p className="font-semibold">Status PKS:</p>
          </div>
          <div>
            <p className="font-semibold">Terakhir tanda tangan MoU:</p>
            <p className="ml-2">{selected.mouDue}</p>
          </div>
          <div>
            <p className="font-semibold">Terakhir tanda tangan PKS:</p>
            <p className="ml-2">{selected.pksDue}</p>
          </div>
          <div>
            <p className="font-semibold">Jatuh Tempo:</p>
            <p className="ml-2">{selected.dueDate}</p>
          </div>
          <div>
            <p className="font-semibold">Jatuh Tempo:</p>
            <p className="ml-2">{selected.dueDate}</p>
          </div>
        </div>
        <div className="flex justify-between mt-5 align-top mb-2">
          <h2 className="text-xl font-semibold">Implementasi Kerjasama:</h2>
          <button
            className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md cursor-pointer"
            onClick={() => alert("Filter feature is not ready yet")}
          >
            <ListFilter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <Table
          headers={headersDetail}
          data={dummyDetailData}
          renderRow={renderRowDetail}
        />
        <Pagination />
      </div>
    );
  }
};
