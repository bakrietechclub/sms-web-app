import { useState } from "react";
import { useSelector } from "react-redux";
import { Label } from "../../elements/Label";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import { AddModalUniv } from "../../fragments/modalforms/univ/AddModalUniv";
import { AddModalSocialInstitution } from "../../fragments/modalforms/univ/AddModalSocialInstitution";

import { UnivPotentialPartnerResearch } from "../../../data/data_univ";
import { INGOPotentialPartnerResearch } from "../../../data/data_ingo";

export const PotentialPartner = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const stekholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  if (stekholder === "universitas") {
    dataRaw = UnivPotentialPartnerResearch;
  } else {
    dataRaw = INGOPotentialPartnerResearch;
  }

  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  //   const [selected, setSelected] = useState({
  //     name: "",
  //     type: "",
  //     tanggal: "",
  //     jam: "",
  //     audiensi: false,
  //     status: "belum",
  //     division: "",
  //     place: "",
  //     link: "",
  //     note: "",
  //   });

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Region",
    "Program LSD",
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

  if (!showDetail) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Daftar Riset Potensial Mitra</h1>

        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={() => setOpenModal(true)}
          addOptions={{
            "Jenis Instansi": [
              {
                label: "Universitas",
                onClick: () => {
                  setModalType("universitas");
                  setOpenModal(true);
                },
              },
              {
                label: "Lembaga Sosial",
                onClick: () => {
                  setModalType("lembaga sosial");
                  setOpenModal(true);
                },
              },
            ],
          }}
          filters={[
            {
              label: "Jenis Instansi",
              options: [
                { label: "Universitas", value: "universitas" },
                { label: "Lembaga Sosial", value: "lembaga sosial" },
              ],
            },
            {
              label: "Status Kontak",
              options: [
                { label: "Sudah dikontak", value: "sudah" },
                { label: "Belum dikontak", value: "belum" },
              ],
            },
          ]}
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/4"
        />

        {modalType === "universitas" && (
          <AddModalUniv
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setModalType(null);
            }}
          />
        )}

        {modalType === "lembaga sosial" && (
          <AddModalSocialInstitution
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setModalType(null);
            }}
          />
        )}
        <Table headers={headers} data={dataRaw} renderRow={renderRow} />
        <Pagination />
      </div>
    );
    //   } else {
    //     return (
    //       <div>
    //         <Button
    //           className={"text-[#0D4690] cursor-pointer flex"}
    //           onClick={() => {
    //             handleClick();
    //           }}
    //         >
    //           <ChevronLeft /> Kembali
    //         </Button>
    //         <h1 className="text-2xl font-semibold mt-4">Data Lengkap Audiensi</h1>
    //         <div className="flex justify-end">
    //           <Button
    //             className={
    //               "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
    //             }
    //           >
    //             Perbarui
    //           </Button>
    //         </div>
    //         <div className="grid grid-cols-2 gap-y-7 mb-7">
    //           <div className="">
    //             <p className="font-semibold">Nama Instansi:</p>
    //             <p className="ml-2">{selected.name}</p>
    //           </div>
    //           <div className="">
    //             <p className="font-semibold">Tanggal:</p>
    //             <p className="ml-2">{selected.tanggal}</p>
    //           </div>
    //           <div className="">
    //             <p className="font-semibold">Jenis Instansi:</p>
    //             <p className="ml-2">{selected.type}</p>
    //           </div>
    //           <div className="">
    //             <p className="font-semibold">Jam:</p>
    //             <p className="ml-2">{selected.jam}</p>
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-1 mb-7">
    //           <div className="">
    //             <p className="font-semibold">Divisi Instansi:</p>
    //             <p className="ml-2">{selected.division}</p>
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-2 gap-y-7 mb-7">
    //           <div className="">
    //             <p className="font-semibold">Jenis Audiensi:</p>
    //             <Label
    //               label={selected.audiensi ? "Online" : "Offline"}
    //               status={selected.audiensi ? "info" : "white"}
    //             />
    //           </div>
    //           <div className="">
    //             <p className="font-semibold">Status Audiensi:</p>
    //             <Label
    //               label={
    //                 selected.status === "re-audiensi"
    //                   ? "Re-Audiensi"
    //                   : selected.status === "selesai"
    //                   ? "Selesai"
    //                   : "Belum Audiensi"
    //               }
    //               status={
    //                 selected.status === "re-audiensi"
    //                   ? "warning"
    //                   : selected.status === "selesai"
    //                   ? "success"
    //                   : "danger"
    //               }
    //             />
    //           </div>
    //         </div>
    //         <div className="grid grid-cols-1 gap-y-7 mb-7">
    //           <div className="">
    //             <p className="font-semibold">Tempat Audiensi:</p>
    //             <p className="ml-2">{selected.place}</p>
    //           </div>
    //           <div className="">
    //             <p className="font-semibold">Link Dokumentasi:</p>
    //             <a
    //               className="ml-2 text-[#0D4690] italic underline"
    //               href={selected.link}
    //             >
    //               {selected.link}
    //             </a>
    //           </div>
    //           <div className="">
    //             <p className="font-semibold">Catatan Tambahan:</p>
    //             <p className="ml-2">{selected.note}</p>
    //           </div>
    //         </div>
    //       </div>
    //     );
  }
};
