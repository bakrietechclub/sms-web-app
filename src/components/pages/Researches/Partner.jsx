import { Label } from "../../elements/Label";
import { Button } from "../../elements/Button";
import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { MediaPartnerResearch } from "../../../data/data_media";

import { AddModalPartnerResearch } from "../../fragments/modalforms/media/AddModalPartnerResearch";

export const Partner = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

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

  if (!showDetail) {
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
          Data Lengkap{" "}
          {selected.name.toLowerCase().includes("universitas")
            ? "Universitas"
            : "Lembaga Sosial/Komunitas"}
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
          <div className="">
            <p className="font-semibold">Nama Lembaga/Komunitas:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div className="">
            <p className="font-semibold">Program LSD:</p>
            <p className="ml-2">{selected.program}</p>
          </div>
          <div className="">
            <p className="font-semibold">Region:</p>
            <p className="ml-2">{selected.region}</p>
          </div>
          <div className="">
            <p className="font-semibold">Status Audiensi:</p>
            <Label
              label={(selected.status ? "Sudah" : "Belum") + " dikontak"}
              status={selected.status ? "success" : "danger"}
            />
          </div>
          {selected.name &&
            !selected.name.toLowerCase().includes("universitas") && (
              <>
                <div className="">
                  <p className="font-semibold">Cluster:</p>
                  {/* <p className="ml-2">{selected.cluster}</p> */}
                </div>
                <div className="">
                  <p className="font-semibold">Sub-cluster:</p>
                  {/* <p className="ml-2">{selected.subCluster}</p> */}
                </div>
                <div className="">
                  <p className="font-semibold">Peran:</p>
                  {/* <p className="ml-2">{selected.role}</p> */}
                </div>
              </>
            )}
        </div>

        <p className="font-semibold mb-3">Kontak</p>
        <div className="grid grid-cols-7 gap-y-7 border rounded-2xl p-3 mb-7">
          <p className="font-semibold mr-10">Nama</p>
          <p className="font-semibold">: </p>
          <div className="flex">
            {/* <p className="">{selected.contact.name}</p> */}
          </div>
          <p className="font-semibold mr-10">No. Telepon</p>
          <p className="font-semibold">: </p>
          <div className="flex">
            {/* <p className="">{selected.contact.phone}</p> */}
          </div>
          <div className="flex">
            <a href="#" className="underline text-[#0D4690]">
              Kirim Pesan
            </a>
          </div>
          <p className="font-semibold mr-10">Jabatan</p>
          <p className="font-semibold">: </p>
          <div className="flex">
            {/* <p className="">{selected.contact.role}</p> */}
          </div>
          <p className="font-semibold mr-10">Email</p>
          <p className="font-semibold">: </p>
          <div className="flex">
            {/* <p className="">{selected.contact.email}</p> */}
          </div>
          <div className="flex">
            <a href="#" className="underline text-[#0D4690]">
              Kirim Email
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Profil:</p>
            {/* <p className="ml-2">{selected.profil}</p> */}
          </div>
          <div className="">
            <p className="font-semibold">Kebutuhan:</p>
            {/* <p className="ml-2">{selected.kebutuhan}</p> */}
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
        <div className="">
          <p className="font-semibold">Link Dokumen:</p>
          <a href="#" className="ml-2 underline text-[#0D4690]">
            https://..
          </a>
        </div>
      </div>
    );
  }
};
