import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { Pagination } from "../../fragments/Pagination";
import { useSelector } from "react-redux";
import { MediaCooperationSign } from "../../../data/data_media";
import { INGOCooperationSign } from "../../../data/data_ingo";

export const CooperationSign = () => {
  const [search, setSearch] = useState("");

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );
  let dataRaw;
  if (stakeholder === "media") {
    dataRaw = MediaCooperationSign;
  } else {
    dataRaw = INGOCooperationSign;
  }

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
      <td>{value.type}</td>
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
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setShowForm(true)}
      />
      <Table headers={headers} data={dataRaw} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};
