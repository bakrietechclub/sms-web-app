import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";

import { Table } from "../fragments/Table";
import { TableToolbar } from "../fragments/TableToolbar";
import { Pagination } from "../fragments/Pagination";
import { Button } from "../elements/Button";
import { Label } from "../elements/Label";

import { UnivAudience } from "../../data/data_univ";
import { MediaAudience } from "../../data/data_media";
import { INGOAudience } from "../../data/data_ingo";

import { AddModalAudienceUniv } from "../fragments/modalforms/univ/AddModalAudienceUniv";
import { AddModalAudienceMedia } from "../fragments/modalforms/media/AddModalAudienceMedia";
import { AddModalAudienceINGO } from "../fragments/modalforms/ingo/AddModalAudienceINGO";

export const Audiences = () => {
  const stekholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState({});

  let dataRaw;
  let filterOptions = [];

  if (stekholder === "universitas") {
    dataRaw = UnivAudience;
    filterOptions = [
      {
        label: "Status",
        options: [
          { label: "Belum Audiensi", value: "belum" },
          { label: "Re-Audiensi", value: "re-audiensi" },
          { label: "Selesai", value: "selesai" },
        ],
      },
    ];
  } else if (stekholder === "media") {
    dataRaw = MediaAudience;
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
      {
        label: "Status",
        options: [
          { label: "Belum Audiensi", value: "belum" },
          { label: "Re-Audiensi", value: "re-audiensi" },
          { label: "Selesai", value: "selesai" },
        ],
      },
    ];
  } else {
    dataRaw = INGOAudience;
    filterOptions = [
      {
        label: "Status",
        options: [
          { label: "Belum Audiensi", value: "belum" },
          { label: "Re-Audiensi", value: "re-audiensi" },
          { label: "Selesai", value: "selesai" },
        ],
      },
    ];
  }

  const filteredData = useMemo(() => {
    return dataRaw.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filters.Status || item.status === filters.Status;
      const matchJenis =
        !filters["Jenis Instansi"] || item.type === filters["Jenis Instansi"];
      return matchSearch && matchStatus && matchJenis;
    });
  }, [dataRaw, search, filters]);

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Tanggal",
    "Jam",
    "Jenis",
    "Status",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.type}</td>
      <td>{value.tanggal}</td>
      <td>{value.jam}</td>
      <td>
        <Label
          label={value.audiensi ? "Online" : "Offline"}
          status={value.audiensi ? "info" : "white"}
        />
      </td>
      <td>
        <Label
          label={
            value.status === "re-audiensi"
              ? "Re-Audiensi"
              : value.status === "selesai"
              ? "Selesai"
              : "Belum Audiensi"
          }
          status={
            value.status === "re-audiensi"
              ? "warning"
              : value.status === "selesai"
              ? "success"
              : "danger"
          }
        />
      </td>
      <td>
        <Button
          onClick={() => {
            setSelected(value);
            setShowDetail(true);
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  if (showDetail) {
    return (
      <div>
        <Button
          className="text-[#0D4690] cursor-pointer flex"
          onClick={() => setShowDetail(false)}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap Audiensi</h1>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div>
            <p className="font-semibold">Nama Instansi:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Tanggal:</p>
            <p className="ml-2">{selected.tanggal}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi:</p>
            <p className="ml-2">{selected.type}</p>
          </div>
          <div>
            <p className="font-semibold">Jam:</p>
            <p className="ml-2">{selected.jam}</p>
          </div>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="ml-2">{selected.division}</p>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div>
            <p className="font-semibold">Jenis Audiensi:</p>
            <Label
              label={selected.audiensi ? "Online" : "Offline"}
              status={selected.audiensi ? "info" : "white"}
            />
          </div>
          <div>
            <p className="font-semibold">Status Audiensi:</p>
            <Label
              label={
                selected.status === "re-audiensi"
                  ? "Re-Audiensi"
                  : selected.status === "selesai"
                  ? "Selesai"
                  : "Belum Audiensi"
              }
              status={
                selected.status === "re-audiensi"
                  ? "warning"
                  : selected.status === "selesai"
                  ? "success"
                  : "danger"
              }
            />
          </div>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Tempat Audiensi:</p>
          <p className="ml-2">{selected.place}</p>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Link Dokumentasi:</p>
          <a href={selected.link} className="ml-2 text-[#0D4690] italic underline">
            {selected.link}
          </a>
        </div>
        <div className="mb-7">
          <p className="font-semibold">Catatan Tambahan:</p>
          <p className="ml-2">{selected.note}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Data Audiensi</h1>
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

      {isModalOpen && stekholder === "universitas" && (
        <AddModalAudienceUniv isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && stekholder === "media" && (
        <AddModalAudienceMedia isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpen && stekholder === "lembagaInternasional" && (
        <AddModalAudienceINGO isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
