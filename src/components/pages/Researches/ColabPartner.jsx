import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { Table } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";
import { AddModalColabPartnerResearch } from "../../fragments/modalforms/univ/AddModalColabPartnerResearch";
import { AddModalColabPartnerResearchINGO } from "../../fragments/modalforms/ingo/AddModalColabPartnerResearchINGO";

import { useState } from "react";
import { useSelector } from "react-redux";

import { UnivColabPartnerResearch } from "../../../data/data_univ";
import { INGOColabPartnerResearch } from "../../../data/data_ingo";

import { ChevronLeft } from "lucide-react";

export const ColabPartner = () => {
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({
    name: "",
    jenis: "",
    region: "",
    program: "",
  });

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivColabPartnerResearch;
  } else {
    dataRaw = INGOColabPartnerResearch;
  }

  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

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
        <Button
          onClick={() => {
            handleClickDetail();
            setSelected(value);
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  const openModal = () => {
    if (stakeholder === "universitas") {
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

  if (!showDetail) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">
          Daftar Riset Kolaborasi Mitra
        </h1>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={openModal}
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/4"
        />
        <Table headers={headers} data={dataRaw} renderRow={renderRow} />
        <Pagination />

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
  } else {
    return (
      <div>
        <Button
          className={"text-[#0D4690] cursor-pointer flex"}
          onClick={() => {
            handleClickDetail();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">
          Data Lengkap Riset Kolaborasi Mitra
        </h1>
        <div className="flex justify-end">
          <Button
            className={
              "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
            }
            // onClick={}
          >
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div>
            <p className="font-semibold">
              Nama{" "}
              {selected.jenis.toLowerCase().includes("universitas")
                ? "Universitas"
                : "Lembaga Sosial/Komunitas"}
              :
            </p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi:</p>
            <p className="ml-2">{selected.jenis}</p>
          </div>
          <div>
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Region:</p>
            <p className="ml-2">{selected.region}</p>
          </div>
          <div>
            <p className="font-semibold">Program LSD:</p>
            <p className="ml-2">{selected.program}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-7 mb-7">
          <div>
            <p className="font-semibold">Status Kerjasama:</p>
            <Label label="Sedang Berlangsung" status="success" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div>
            <p className="font-semibold mb-2">Status MoU</p>
            <div className="grid grid-cols-2 ml-2 gap-y-2">
              <p className="font-semibold">Tanggal TTD</p>
              <p>: </p>
              <p className="font-semibold">Jatuh Tempo</p>
              <p>: </p>
              <p className="font-semibold">Link Dokumen</p>
              <p>
                :{" "}
                <a href="#" className="text-[#0D4690] underline cursor-pointer">
                  Klik di sini
                </a>
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-2">Status PKS</p>
            <div className="grid grid-cols-2 ml-2 gap-y-2">
              <p className="font-semibold">Tanggal TTD</p>
              <p>: </p>
              <p className="font-semibold">Jatuh Tempo</p>
              <p>: </p>
              <p className="font-semibold">Link Dokumen</p>
              <p>
                :{" "}
                <a href="#" className="text-[#0D4690] underline cursor-pointer">
                  Klik di sini
                </a>
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Kontak:</p>
            <a
              href="#"
              className="text-[#0D4690] underline cursor-pointer ml-2"
            >
              Lihat Detail Kontak
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 mb-7">
          <div>
            <p className="font-semibold">Kebutuhan:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Program LSD Rencana Kolaborasi:</p>
            <p className="ml-2"></p>
          </div>
          <div>
            <p className="font-semibold">Detail Rencana Kolaborasi:</p>
            <p className="ml-2"></p>
          </div>
        </div>
        <p className="font-semibold mb-3">Analisis Program</p>
        <div className="border rounded-2xl p-3 mb-7">
          <div className="mb-7">
            <p className="font-semibold">Strengths:</p>
            <p className="ml-2">Strengths</p>
          </div>
          <div className="mb-7">
            <p className="font-semibold">Weakness:</p>
            <p className="ml-2">Weakness</p>
          </div>
          <div className="mb-7">
            <p className="font-semibold">Opportunities:</p>
            <p className="ml-2">Opportunities</p>
          </div>
          <div className="mb-7">
            <p className="font-semibold">Challenges:</p>
            <p className="ml-2">Challenges</p>
          </div>
        </div>
      </div>
    );
  }
};
