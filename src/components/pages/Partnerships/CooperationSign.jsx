import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import { Button } from "../../elements/Button";

import { MediaCooperationSign } from "../../../data/data_media";
import { INGOCooperationSign } from "../../../data/data_ingo";

import { AddModalCooperationSignMedia } from "../../fragments/modalforms/media/AddModalCooperationSignMedia";
import { AddModalCooperationSignINGO } from "../../fragments/modalforms/ingo/AddModalCooperationSignINGO";

export const CooperationSign = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  let filterOptions = [];

  if (stakeholder === "media") {
    dataRaw = MediaCooperationSign;
    filterOptions = [
      {
        label: "Jenis Instansi",
        options: [
          { label: "Pemerintah Pusat", value: "Pemerintah Pusat" },
          { label: "Pemerintah Daerah", value: "Pemerintah Daerah" },
          { label: "Dunia Usaha", value: "Dunia Usaha" },
          { label: "Media Massa", value: "Media Massa" },
        ],
      },
    ];
  } else {
    dataRaw = INGOCooperationSign;
  }

  const filteredData = useMemo(() => {
    return dataRaw.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchJenis = !filters["Jenis Instansi"] || item.type === filters["Jenis Instansi"];
      return matchSearch && matchJenis;
    });
  }, [dataRaw, search, filters]);

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
        <Button className="text-[#0D4690] underline cursor-pointer">
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Tanda Kerjasama</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={(f) => setFilters(f)}
        searchWidth="w-1/4"
      />
      <Table headers={headers} data={filteredData} renderRow={renderRow} />
      <Pagination />

      {isModalOpen && stakeholder === "media" && (
        <AddModalCooperationSignMedia
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && stakeholder === "lembagaInternasional" && (
        <AddModalCooperationSignINGO
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
