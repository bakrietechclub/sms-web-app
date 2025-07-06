import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { FreezeTable } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";

import { UnivSpkTor } from "../../../data/data_univ";
import { INGOSpkTor } from "../../../data/data_ingo";

import { AddModalSpkUniv } from "../../fragments/modalforms/univ/AddModalSpkUniv";
import { AddModalSpkINGO } from "../../fragments/modalforms/ingo/AddModalSpkINGO";

import { ChevronLeft } from "lucide-react";

export const Spk = () => {
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

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
        !filters["Jenis Instansi"] || item.jenis === filters["Jenis Instansi"];

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
      <td className="border-b border-gray-200">Jenis Kerjasama</td>
      <td className="border-b border-gray-200">{value.signDate}</td>
      <td className="border-b border-gray-200">{value.duration}</td>
      <td className="border-b border-gray-200">{value.dueDate}</td>
      <td className="px-5 border-b border-gray-200">
        <Button
          onClick={() => {
            setSelected(value);
            handleClickDetail();
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
        <h1 className="text-2xl font-semibold">Tabel Surat SPK</h1>
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

        {isModalOpen && stakeholder === "universitas" && (
          <AddModalSpkUniv
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {isModalOpen && stakeholder === "lembagaInternasional" && (
          <AddModalSpkINGO
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
        <h1 className="text-2xl font-semibold">Data Lengkap SPK</h1>
        <div className="flex justify-end">
          <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div>
            <p className="font-semibold">Nama Universitas:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi:</p>
            <p className="ml-2">{selected.jenis}</p>
          </div>
          <div>
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="ml-2">{selected.division}</p>
          </div>
          <div>
            <p className="font-semibold">Status PKS:</p>
            <Label label={"CLP"} status="warning" />
          </div>
          <div>
            <p className="font-semibold">Detail Kerjasama:</p>
            <p className="ml-2">-</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div>
            <p className="font-semibold">Jenis Surat:</p>
            <p className="ml-2">-</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <Label label={"Sudah diperiksa oleh mitra"} />
          </div>
          <div className="">
            <p className="font-semibold">Tanggal Jatuh Tempo:</p>
            <p className="">{selected.dueDate}</p>
          </div>
          <div className="">
            <p className="font-semibold">Tanggal Tanda Tangan:</p>
            <p className="">{selected.signYear}</p>
          </div>
          <div className="">
            <p className="font-semibold">Link Dokumentasi:</p>
            <a href="#" className="text-[#0D4690] italic underline">
              Link Dokumen
            </a>
          </div>
          <div className="">
            <p className="font-semibold">Jangka Waktu:</p>
            <p className="">{selected.duration}</p>
          </div>
        </div>
      </div>
    );
  }
};
