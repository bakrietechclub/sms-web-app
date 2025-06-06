import { FreezeTable } from "../../fragments/Table";
import { Label } from "../../elements/Label";
import { useState } from "react";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import { useSelector } from "react-redux";

import { UnivIA } from "../../../data/data_univ";
import { INGOIA } from "../../../data/data_ingo";

export const Ia = () => {
  const [search, setSearch] = useState("");

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );
  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivIA;
  } else {
    dataRaw = INGOIA;
  }

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Status Kerjasama",
    "Program Implementasi",
    "Tahun Implementasi",
    "Batch",
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
      <td className="py-3 px-4 border-b border-gray-200">
        <Label label={value.colabStatus} status="success" />
      </td>
      <td className="px-4 border-b border-gray-200">
        <Label label={value.program} status="warning" />
      </td>
      <td className="px-4 border-b border-gray-200">{value.year}</td>
      <td className="px-4 border-b border-gray-200">{value.batchEdition}</td>
      <td className="px-4 border-b border-gray-200">
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel IA</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={(type) => {
          if (type === "Kategori A") openModalA();
          if (type === "Kategori B") openModalB();
        }}
        addOptions={["Kategori A", "Kategori B"]}
        filters={[
          {
            label: "Jenis Instansi",
            options: [
              { label: "Universitas", value: "universitas" },
              { label: "Lembaga Sosial", value: "lembaga sosial" },
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
