import { Button } from "../elements/Button";
import { Table } from "../fragments/Table";
import { Label } from "../elements/Label";
import { useState } from "react";
import { TableToolbar } from "../fragments/TableToolbar";
import { Pagination } from "../fragments/Pagination";
import WAIcon from "../../assets/icons/whatsappIcon.png";
import { ChevronLeft } from "lucide-react";

import { useSelector } from "react-redux";

import { UnivCoordinationGroup, UCG } from "../../data/data_univ";
import { MediaCoordinationGroup, MCG } from "../../data/data_media";
import { INGOCoordinationGroup, ICG } from "../../data/data_ingo";

export const CoordinationGroups = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const stekholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let dataRaw;
  let dataDetails;
  if (stekholder === "universitas") {
    dataRaw = UnivCoordinationGroup;
    dataDetails = UCG;
  } else if (stekholder === "media") {
    dataRaw = MediaCoordinationGroup;
    dataDetails = MCG;
  } else {
    dataRaw = INGOCoordinationGroup;
    dataDetails = ICG;
  }

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const [selected, setSelected] = useState({
    name: "",
    division: "",
    jenis: "",
    link: "",
    contact: "",
  });

  const headers = [
    "No",
    "Nama Instansi",
    "Jenis Instansi",
    "Divisi Instansi",
    "Link Grup",
    "Kontak PIC",
    "Aksi",
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.division}</td>
      <td>
        <Button
          className="text-white bg-[#E89229] rounded-lg w-full py-1.5 hover:py-1 hover:bg-[#d18325] ease-in-out duration-200 cursor-pointer"
          onClick={() => window.open(value.link)}
        >
          <div className="flex underline items-center justify-center gap-2">
            <img src={WAIcon} alt="." />
            Link Grup
          </div>
        </Button>
      </td>
      <td>{value.contact}</td>
      <td>
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            handleClick();
            setSelected(value);
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
        <h1 className="text-2xl font-semibold">Tabel Grup Koordinasi</h1>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          onAddClick={(type) => {
            if (type === "Kategori A") openModalA();
            if (type === "Kategori B") openModalB();
          }}
          addOptions={["Kategori A", "Kategori B"]}
          filters={[
            {
              label: "Jenis Instansi",
              options: [
                { label: "Universitas", value: "universitas" },
                { label: "Lembaga Sosial", value: "lembaga sosial" },
              ],
            },
          ]}
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/4"
        />
        <Table headers={headers} data={dataRaw} renderRow={renderRow} />
        <Pagination />
      </div>
    );
  } else {
    return (
      <div>
        <Button
          className={"text-[#0D4690] cursor-pointer flex"}
          onClick={() => {
            handleClick();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">
          Data Lengkap Grup Koordinasi
        </h1>
        <div className="flex justify-end">
          <Button
            className={
              "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
            }
          >
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Nama Instansi:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jenis Instansi</p>
            <p className="ml-2">{selected.jenis}</p>
          </div>
          <div className="">
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="ml-2">{selected.division}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Link Grup:</p>
            <a
              href={selected.link}
              className="ml-2 text-[#0D4690] italic underline"
            >
              {selected.link}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Kontak</p>
          </div>
          <div className="flex justify-end">
            <Button
              className={
                "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
              }
            >
              Tambah Kontak
            </Button>
          </div>
        </div>
        <table className="table-auto text-center w-full">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10 text-base font-semibold">
              <th className="rounded-tl-xl">No.</th>
              <th className="">Nama</th>
              <th className="">Jabatan</th>
              <th className="">No. Hp</th>
              <th className="">Email</th>
              <th className="">Status</th>
              <th className="">Status Aktif</th>
              <th className="rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-base border-l border-r border-[#E7EDF4]">
            {dataDetails.map((item, index) => (
              <tr key={index} className="border-b border-[#E7EDF4] h-10">
                <td className="py-3">{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td className="text-[#0d4690]">{item.phone}</td>
                <td className="text-[#0d4690]">{item.email}</td>
                <td>
                  <Label
                    label={item.status}
                    status={
                      item.status === "Belum Join Grup" ? "danger" : "success"
                    }
                  />
                </td>
                <td>
                  <Label
                    label={item.activeStatus}
                    status={
                      item.activeStatus === "Tidak Aktif" ? "danger" : "success"
                    }
                  />
                </td>
                <td className="text-[#0D4690] underline">
                  <a>Edit Data</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
