import { Label } from "../../elements/Label";
import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { MediaPartnerResearch } from "../../../data/data_media";

import { AddModalPartnerResearch } from "../../fragments/modalforms/media/AddModalPartnerResearch";

export const Partner = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState("");

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program Kerjasama",
    "Status",
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
        <Label
          label={(value.status ? "Sudah" : "Belum") + " dikontak"}
          status={value.status ? "success" : "danger"}
        />
      </td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Daftar Riset Mitra</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setOpenModal(true)}
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
            label: "Status",
            options: [
              { label: "Sudah Dikontak", value: "sudah dikontak" },
              { label: "Belum Dikontak", value: "belum dikontak" },
            ],
          },
        ]}
        onFilterSet={() => console.log("Filter diset")}
        searchWidth="w-1/4"
      />

      <AddModalPartnerResearch
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />

      <Table
        headers={headers}
        data={MediaPartnerResearch}
        renderRow={renderRow}
      />
      <Pagination />
    </div>
  );
};
