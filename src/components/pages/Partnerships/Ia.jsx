import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { FreezeTable } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ChevronLeft } from "lucide-react";

// Data
import { UnivIA } from "../../../data/data_univ";
import { INGOIA } from "../../../data/data_ingo";

// Modal
import { AddModalIaUniv } from "../../fragments/modalforms/univ/AddModalIaUniv";
import { AddModalIaINGO } from "../../fragments/modalforms/ingo/AddModalIaINGO";

export const Ia = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState({});

  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const dataRaw = stakeholder === "universitas" ? UnivIA : INGOIA;

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Status Kerjasama",
    "Program Implementasi",
    "Tahun Implementasi",
    "Batch",
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
      <td className="py-3 px-4 border-b border-gray-200">
        <Label label={value.colabStatus} status="success" />
      </td>
      <td className="px-4 border-b border-gray-200">
        <Label label={value.program} status="warning" />
      </td>
      <td className="px-4 border-b border-gray-200">{value.year}</td>
      <td className="px-4 border-b border-gray-200">{value.batchEdition}</td>
      <td className="px-4 border-b border-gray-200">
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
        <h1 className="text-2xl font-semibold">Tabel IA</h1>

        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={() => setIsModalOpen(true)}
          filters={
            stakeholder === "universitas"
              ? [
                  {
                    label: "Jenis Instansi",
                    options: [
                      { label: "Universitas", value: "universitas" },
                      { label: "Lembaga Sosial", value: "lembaga sosial" },
                    ],
                  },
                ]
              : []
          }
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/4"
        />

        <FreezeTable
          headers={headers}
          data={dataRaw}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
        />

        <Pagination />

        {/* Modal */}
        {isModalOpen && stakeholder === "universitas" && (
          <AddModalIaUniv
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {isModalOpen && stakeholder === "lembagaInternasional" && (
          <AddModalIaINGO
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
          className={"text-[#0D4690] cursor-pointer flex"}
          onClick={() => {
            handleClickDetail();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap IA</h1>
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
            <p className="font-semibold">Nama Instansi:</p>
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
            <p className="font-semibold">Status Kerjasama:</p>
            <Label label={selected.colabStatus} status="success" />
          </div>
          <div>
            <p className="font-semibold">Tahun Implementasi Kerjasama:</p>
            <p className="ml-2">{selected.year}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div>
            <p className="font-semibold">Program Kerjasama:</p>
            <p className="ml-2">{selected.program}</p>
          </div>
          <div>
            <p className="font-semibold">Batch Program:</p>
            <p className="ml-2">{selected.batchEdition}</p>
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
            <p className="font-semibold">Link File IA:</p>
            <a href="#" className="text-[#0d4690] underline cursor-pointer">
              Link File
            </a>
          </div>
        </div>
      </div>
    );
  }
};
