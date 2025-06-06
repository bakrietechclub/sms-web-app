import { FreezeTable } from "../../fragments/Table";
import { useState } from "react";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import { useSelector } from "react-redux";
import { UnivSpkTor } from "../../../data/data_univ";
import { INGOSpkTor } from "../../../data/data_ingo";

export const SpkTor = () => {
  const [search, setSearch] = useState("");
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivSpkTor;
  } else {
    dataRaw = INGOSpkTor;
  }

  const headers = [
    "No.",
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
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{value.colabType}</td>
      <td className="border-b border-gray-200">{value.signDate}</td>
      <td className="border-b border-gray-200">{value.duration}</td>
      <td className="border-b border-gray-200">{value.dueDate}</td>
      <td className="px-5 border-b border-gray-200">
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Surat SPK/TOR</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={(opt) => handleAdd(opt)}
        addOptions={["Atas Nama Pribadi", "Atas Nama Instansi"]}
        filters={[
          {
            label: "Jenis Surat",
            options: [
              { label: "MoU", value: "MoU" },
              { label: "PKS", value: "PKS" },
            ],
          },
          {
            label: "Jenis Instansi",
            options: [
              { label: "Universitas", value: "universitas" },
              { label: "Lembaga", value: "lembaga" },
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
        />
      </div>
      <Pagination />
    </div>
  );
};
