import { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";

import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { FreezeTable } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";

import { UnivMouPks } from "../../../data/data_univ";
import { MediaMouPks } from "../../../data/data_media";
import { INGOMouPks } from "../../../data/data_ingo";

import { AddModalPksUniv } from "../../fragments/modalforms/univ/AddModalPksUniv";
import { AddModalPksMedia } from "../../fragments/modalforms/media/AddModalPksMedia";
import { AddModalPksINGO } from "../../fragments/modalforms/ingo/AddModalPksINGO";

export const Pks = () => {
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  let dataRaw = [];
  let filters = [];

  if (stakeholder === "universitas") {
    dataRaw = UnivMouPks;
    filters = [
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
    filters = [
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
    dataRaw = INGOMouPks;
    filters = [];
  }

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
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200">Jenis Kerjasama</td>
      <td className="border-b border-gray-200">{value.duration}</td>
      <td className="border-b border-gray-200">{value.dueDate}</td>
      <td className="border-b border-gray-200">{value.signYear}</td>
      <td className="px-6 py-3 border-b border-gray-200">
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            setSelected(value);
            handleClick();
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  if (!showDetail) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Tabel PKS</h1>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={() => setIsModalOpen(true)}
          filters={filters}
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/4"
        />
        <div className="w-full overflow-hidden h-fit">
          <FreezeTable
            headers={headers}
            data={dataRaw}
            renderRow={renderRow}
            renderRowFreeze={renderRowFreeze}
            freezeCol={4}
          />
        </div>
        <Pagination />

        {isModalOpen && stakeholder === "universitas" && (
          <AddModalPksUniv
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {isModalOpen && stakeholder === "media" && (
          <AddModalPksMedia
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {isModalOpen && stakeholder === "lembagaInternasional" && (
          <AddModalPksINGO
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Button
          className="text-[#0D4690] cursor-pointer flex"
          onClick={() => setShowDetail(false)}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap PKS</h1>
        <div className="flex justify-end">
          <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div>
            <p className="font-semibold">Nama Instansi:</p>
            <p>{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi</p>
            <p>{selected.jenis}</p>
          </div>
          <div>
            <p className="font-semibold">Divisi Instansi:</p>
            <p>{selected.division}</p>
          </div>
          <div>
            <p className="font-semibold">Program Kerjasama:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Detail Kerjasama:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <Label label={"Sudah Diperiksa oleh Mitra"} status={""} />
          </div>
          <div>
            <p className="font-semibold">Nomor Surat BCF:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Nomor Surat Mitra:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Nama Pihak BCF:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Nama Pihak Mitra:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Tanggal Tanda Tangan:</p>
            <p>{selected.signYear}</p>
          </div>
          <div>
            <p className="font-semibold">Jangka Waktu:</p>
            <p>{selected.duration}</p>
          </div>
          <div>
            <p className="font-semibold">Tanggal Jatuh Tempo:</p>
            <p>{selected.dueDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-5 mb-5">
          <div>
            <p className="font-semibold">Link Dokumen:</p>
            <a href="#" className="text-[#0D4690] italic underline">
              Link Dokumen PKS
            </a>
          </div>
          <div>
            <p className="font-semibold">Catatan Tambahan:</p>
            <p>-</p>
          </div>
        </div>
      </div>
    );
  }
};
