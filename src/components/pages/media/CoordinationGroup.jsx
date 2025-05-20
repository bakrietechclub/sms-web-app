import { Button } from "../../elements/Button";
import { Pagination } from "../../fragments/Pagination";
import { Table } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";

export const CoordinationGroupMedia = () => {
  const [search, setSearch] = useState("");

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
          <div className="underline">Link Grup</div>
        </Button>
      </td>
      <td>{value.contact}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

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
};
