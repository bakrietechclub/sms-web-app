import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import { Button } from "../../elements/Button";

import { UnivSpkTor } from "../../../data/data_univ";
import { INGOSpkTor } from "../../../data/data_ingo";

import { AddModalTorUniv }  from "../../fragments/modalforms/univ/AddModalTorUniv";
import { AddModalTorINGO } from "../../fragments/modalforms/ingo/AddModalTorINGO";

export const Tor = () => {
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});

  let dataRaw = [];
  let filterOptions = [];

  if (stakeholder === "universitas") {
    dataRaw = UnivSpkTor;
    filterOptions = [
      {
        label: "Jenis Surat",
        options: [
          { label: "MoU", value: "mou" },
          { label: "PKS", value: "pks" },
        ],
      },
      {
        label: "Jenis Instansi",
        options: [
          { label: "Universitas", value: "universitas" },
          { label: "Lembaga", value: "lembaga" },
        ],
      },
    ];
  } else if (stakeholder === "lembagaInternasional") {
    dataRaw = INGOSpkTor;
    filterOptions = [
      {
        label: "Jenis Surat",
        options: [
          { label: "MoU", value: "mou" },
          { label: "PKS", value: "pks" },
        ],
      },
    ];
  }

  const filteredData = useMemo(() => {
    return dataRaw.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchJenisSurat =
        !filters["Jenis Surat"] || item.jenisSurat === filters["Jenis Surat"];

      const matchJenisInstansi =
        !filters["Jenis Instansi"] ||
        item.jenis === filters["Jenis Instansi"];

      return matchSearch && matchJenisSurat && matchJenisInstansi;
    });
  }, [dataRaw, search, filters]);

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
      <td className="border-b border-gray-200">{value.signDate}</td>
      <td className="border-b border-gray-200">{value.duration}</td>
      <td className="border-b border-gray-200">{value.dueDate}</td>
      <td className="px-5 border-b border-gray-200">
        <Button className="text-[#0D4690] underline cursor-pointer">
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Surat TOR</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={(f) => setFilters(f)}
        searchWidth="w-1/4"
      />

      <FreezeTable
        headers={headers}
        data={filteredData}
        renderRow={renderRow}
        renderRowFreeze={renderRowFreeze}
        freezeCol={4}
      />
      <Pagination />

      {/* Modal Tambah */}
      {isModalOpen && stakeholder === "universitas" && (
        <AddModalTorUniv
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && stakeholder === "lembagaInternasional" && (
        <AddModalTorINGO
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
