import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import { AddModalColabPartnerResearch } from "../../fragments/modalforms/univ/AddModalColabPartnerResearch";
import { AddModalColabPartnerResearchINGO } from "../../fragments/modalforms/ingo/AddModalColabPartnerResearchINGO";

import { useState } from "react";
import { useSelector } from "react-redux";

import { UnivColabPartnerResearch } from "../../../data/data_univ";
import { INGOColabPartnerResearch } from "../../../data/data_ingo";

export const ColabPartner = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const stekholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stekholder === "universitas") {
    dataRaw = UnivColabPartnerResearch;
  } else {
    dataRaw = INGOColabPartnerResearch;
  }

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program Rencana Kolaborasi",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.region}</td>
      <td>{value.program}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  const openModal = () => {
    if (stekholder === "universitas") {
      setModalType("universitas");
    } else {
      setModalType("ingo");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Daftar Riset Kolaborasi Mitra</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={openModal} // onAddClick akan memanggil fungsi openModal yang baru
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"
      />
      <Table headers={headers} data={dataRaw} renderRow={renderRow} />
      <Pagination />

      {/* Render modal secara kondisional berdasarkan modalType */}
      {isModalOpen && modalType === "universitas" && (
        <AddModalColabPartnerResearch
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      {isModalOpen && modalType === "ingo" && (
        <AddModalColabPartnerResearchINGO
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
