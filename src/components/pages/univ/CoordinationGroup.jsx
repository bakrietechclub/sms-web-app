import { Button } from "../../elements/Button";
import { Table } from "../../fragments/Table";
import { useState } from "react";
import { TableToolbar } from "../../fragments/TableToolbar";
import { Pagination } from "../../fragments/Pagination";
import WAIcon from "../../../assets/icons/whatsappIcon.png";
import { ChevronLeft } from "lucide-react";

export const CoordinationGroup = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const whatsappLink = "https://wa.me/";
  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      division: "Universitas",
      link: whatsappLink + "628123456789",
      contact: "Faizal",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      division: "Prodi Ilmu Komputer",
      link: whatsappLink + "628123456789",
      contact: "Ricky",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      division: "FISIP",
      link: whatsappLink + "628123456789",
      contact: "Fajar",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      division: "Prodi Farmasi",
      link: whatsappLink + "628123456789",
      contact: "El Malik",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      division: "Fakultas Ilmu Komputer",
      link: whatsappLink + "628123456789",
      contact: "Tristan",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Fauzan",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Alhan",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Rista",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Freda",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Sagun",
    },
  ];

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
        <Table headers={headers} data={data} renderRow={renderRow} />
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
              Clickable Link
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div className="">
            <p className="font-semibold">Kontak</p>
          </div>
          <div className="">
            <p className="font-semibold">Tambah Kontak</p>
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
            <tr className="border-b border-[#E7EDF4] h-10 font-normal">
              <td className="py-3">No.</td>
              <td className="">Nama</td>
              <td className="">Jabatan</td>
              <td className="">No. Hp</td>
              <td className="">Email</td>
              <td className="">Status</td>
              <td className="">Status Aktif</td>
              <td className="">Aksi</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
