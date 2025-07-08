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

import { ChevronLeft } from "lucide-react";

export const CooperationSign = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDetailClick = () => {
    setShowDetail(!showDetail);
  };

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
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchJenis =
        !filters["Jenis Instansi"] || item.type === filters["Jenis Instansi"];
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
        <Button
          onClick={() => {
            setSelected(value), handleDetailClick();
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  if (!showDetail) {
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
  } else {
    return (
      <div>
        {" "}
        <Button
          className="text-[#0D4690] cursor-pointer flex items-center"
          onClick={handleDetailClick}
        >
          <ChevronLeft className="mr-1" size={20} /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-5">Data Lengkap Kerjasama</h1>
        <div className="flex justify-end mb-3">
          <Button
            className={
              "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
            }
          >
            Perbarui
          </Button>
        </div>
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
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="ml-2">{selected.division}</p>
          </div>
          <div>
            <p className="font-semibold">Program Kerjasama:</p>
            <p className="ml-2">{selected.program}</p>
          </div>
          <div>
            <p className="font-semibold">Detail Kerjasama:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Kerjasama:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Jumlah Nominal Dukungan:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Link Dokumen:</p>
            <a
              href="#"
              className="text-[#0d4690] ml-2 underline cursor-pointer"
            >
              Link Dokumen
            </a>
          </div>
        </div>
      </div>
    );
  }
};
