import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";

import { TableToolbar } from "../../fragments/TableToolbar";
import { FreezeTable } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { Button } from "../../elements/Button";
import { Label } from "../../elements/Label";

import { UnivMouPks } from "../../../data/data_univ";
import { MediaMouPks } from "../../../data/data_media";
import { INGOMouPks } from "../../../data/data_ingo";

import { AddModalMouUniv } from "../../fragments/modalforms/univ/AddModalMouUniv";
import { AddModalMouMedia } from "../../fragments/modalforms/media/AddModalMouMedia";
import { AddModalMouINGO } from "../../fragments/modalforms/ingo/AddModalMouINGO";

export const Mou = () => {
  const stakeholder = useSelector((state) => state.activeStakeholder.activeStakeholder);

  const [showDetail, setShowDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState({});

  let dataRaw = [];
  let filterOptions = [];

  if (stakeholder === "universitas") {
    dataRaw = UnivMouPks;
    filterOptions = [
      {
        label: "Jenis Instansi",
        options: [
          { label: "Universitas", value: "universitas" },
          { label: "Lembaga Sosial", value: "lembaga sosial" },
        ],
      },
    ];
  } else if (stakeholder === "media") {
    dataRaw = MediaMouPks;
    filterOptions = [
      {
        label: "Jenis Instansi",
        options: [
          { label: "Pemerintah Pusat", value: "pemerintah pusat" },
          { label: "Pemerintah Daerah", value: "pemerintah daerah" },
          { label: "Dunia Usaha", value: "dunia usaha" },
          { label: "Media Massa", value: "media massa" },
        ],
      },
    ];
  } else {
    dataRaw = INGOMouPks;
    filterOptions = [];
  }

  const filteredData = useMemo(() => {
    return dataRaw.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchJenis = !filters["Jenis Instansi"] || item.jenis === filters["Jenis Instansi"];
      return matchSearch && matchJenis;
    });
  }, [dataRaw, search, filters]);

  const headers = [
    "No.",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Jenis Kerjasama",
    "Jangka Kerjasama",
    "Jatuh Tempo",
    "Tahun Tanda Tangan",
    "Aksi",
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td>{value.duration}</td>
      <td>{value.dueDate}</td>
      <td>{value.signYear}</td>
      <td className="px-6 py-3">
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            setShowDetail(true);
            setSelected(value);
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  if (showDetail) {
    return (
      <div>
        <Button className="text-[#0D4690] cursor-pointer flex" onClick={() => setShowDetail(false)}>
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap MoU / PKS</h1>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div><p className="font-semibold">Nama Instansi:</p><p>{selected.name}</p></div>
          <div><p className="font-semibold">Jenis Instansi:</p><p>{selected.jenis}</p></div>
          <div><p className="font-semibold">Divisi Instansi:</p><p>{selected.division}</p></div>
          <div><p className="font-semibold">Tanggal Tanda Tangan:</p><p>{selected.signYear}</p></div>
          <div><p className="font-semibold">Jangka Waktu:</p><p>{selected.duration}</p></div>
          <div><p className="font-semibold">Tanggal Jatuh Tempo:</p><p>{selected.dueDate}</p></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel MoU</h1>
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
        renderRowFreeze={renderRowFreeze}
        renderRow={renderRow}
        freezeCol={4}
      />
      <Pagination />

      {isModalOpen && stakeholder === "universitas" && (
        <AddModalMouUniv isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && stakeholder === "media" && (
        <AddModalMouMedia isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && stakeholder === "lembagaInternasional" && (
        <AddModalMouINGO isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
