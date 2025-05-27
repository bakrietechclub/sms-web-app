import { Button } from "../../elements/Button";
import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { Label } from "../../elements/Label";
import WAIcon from "../../../assets/icons/whatsappIcon.png";
import { ChevronLeft } from "lucide-react";

export const CoordinationGroupMedia = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const whatsappLink = "https://wa.me/";
  const data = [
    {
      name: "Kementrian Kesehatan",
      jenis: "Pemerintah Pusat",
      division: "Tim Percepatan Penanganan Stunting",
      link: whatsappLink + "628123456789",
      contact: "Faizal",
    },
    {
      name: "DPRD Sulawesi Utara",
      jenis: "Pemerintah Daerah",
      division: "Komisi IX",
      link: whatsappLink + "628123456789",
      contact: "Ricky",
    },
    {
      name: "Kementrian Agama",
      jenis: "Pemerintah Pusat",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Fajar",
    },
    {
      name: "DPRD Jawa Timur",
      jenis: "Pemerintah Daerah",
      division: "Komisi II",
      link: whatsappLink + "628123456789",
      contact: "El Malik",
    },
    {
      name: "KADIN Indonesia",
      jenis: "Dunia Usaha",
      division: "KADIN Indonesia",
      link: whatsappLink + "628123456789",
      contact: "Tristan",
    },
    {
      name: "Johnson & Johnson",
      jenis: "Dunia Usaha",
      division: "Organisasi",
      link: whatsappLink + "628123456789",
      contact: "Fauzan",
    },
    {
      name: "KADIN Sumatera Utara",
      jenis: "Dunia Usaha",
      division: "KADIN Sumatera Utara",
      link: whatsappLink + "628123456789",
      contact: "Alhan",
    },
    {
      name: "Kementrian Sosial",
      jenis: "Pemerintah Pusat",
      division: "News",
      link: whatsappLink + "628123456789",
      contact: "Rista",
    },
    {
      name: "Dinas Sosial DKI Jakarta",
      jenis: "Pemerintah Daerah",
      division: "News",
      link: whatsappLink + "628123456789",
      contact: "Freda",
    },
    {
      name: "Media Tempo",
      jenis: "Media Massa",
      division: "News",
      link: whatsappLink + "628123456789",
      contact: "Sagun",
    },
  ];

  const dataDetails = [
    {
      name: "El Vanno",
      position: "Presiden",
      phone: "081234567890",
      email: "elvanno@gmail.com",
      status: "Join Grup",
      activeStatus: "Tidak Aktif",
    },
    {
      name: "El Tangguh",
      position: "Presiden",
      phone: "081234567890",
      email: "eltangguh@gmail.com",
      status: "Belum Join Grup",
      activeStatus: "Tidak Aktif",
    },
    {
      name: "El Putra",
      position: "Presiden",
      phone: "081234567890",
      email: "elputra@gmail.com",
      status: "Join Grup",
      activeStatus: "Aktif",
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
                { label: "Pemerintah Pusat", value: "pemerintah pusat" },
                { label: "Pemerintah Daerah", value: "pemerintah daerah" },
                { label: "Dunia Usaha", alue: "dunia usaha" },
                { label: "Media Masa", value: "media masa" },
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
