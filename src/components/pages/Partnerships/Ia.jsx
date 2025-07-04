import { useState } from "react";
import { useSelector } from "react-redux";
import { FreezeTable } from "../../fragments/Table";
import { Label } from "../../elements/Label";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";

// Data
import { UnivIA } from "../../../data/data_univ";
import { INGOIA } from "../../../data/data_ingo";

// Modal
import { AddModalIaUniv } from "../../fragments/modalforms/univ/AddModalIaUniv";
import { AddModalIaINGO } from "../../fragments/modalforms/ingo/AddModalIaINGO";

export const Ia = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const dataRaw = stakeholder === "universitas" ? UnivIA : INGOIA;

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
        onAddClick={() => setIsModalOpen(true)}
        filters={
          stakeholder === "universitas"
            ? [
                {
                  label: "Jenis Instansi",
                  options: [
                    { label: "Universitas", value: "universitas" },
                    { label: "Lembaga Sosial", value: "lembaga sosial" },
                  ],
                },
              ]
            : []
        }
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"
      />

      <FreezeTable
        headers={headers}
        data={dataRaw}
        renderRow={renderRow}
        renderRowFreeze={renderRowFreeze}
        freezeCol={4}
      />

      <Pagination />

      {/* Modal */}
      {isModalOpen && stakeholder === "universitas" && (
        <AddModalIaUniv isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}

      {isModalOpen && stakeholder === "lembagaInternasional" && (
        <AddModalIaINGO isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
