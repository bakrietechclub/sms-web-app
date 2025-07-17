import { Button } from "../../elements/Button";
import { Table } from "../../fragments/Table";
import { Pagination } from "../../fragments/Pagination";
import { TableToolbar } from "../../fragments/TableToolbar";
import { MediaCard } from "../../fragments/Card";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { MediaRecapData } from "../../../data/data_media";

export const Media = () => {
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleDetailClick = (media) => {
    setSelectedMedia(media);
    setShowDetail(!showDetail);
  };

  const headers = [
    "No",
    "Nama Instansi",
    "Program",
    "Tahun",
    "Jumlah Berita Yang Dikeluarkan",
    "Aksi",
  ];

  //All details using dummy data first.
  const headersDetail = [
    "No.",
    "Program",
    "Nama Kegiatan",
    "Tahun",
    "Tanggal",
    "Headline",
    "Tipe Publikasi",
    "Link Pemberitaan",
    "Tone",
    "AVE",
    "PR Factor",
    "PR Value",
    "Aksi",
  ];

  const dummyDetailData = [
    {
      program: "Program",
      activityName: "Activity",
      year: "2024",
      date: "24/04/2024",
      headline: "Headline",
      type: "Type",
      link: "https://link",
      tone: "Tone",
      ave: "AVE",
      prFactor: "PR Factor",
      prValue: "PR Value",
    },
  ];

  const dummyCardCount = [
    {
      year: "2024",
      counts: 5,
    },
    {
      year: "2023",
      counts: 4,
    },
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.program}</td>
      <td>{value.year}</td>
      <td>{value.newsCount}</td>
      <td>
        <Button
          onClick={() => {
            handleDetailClick(value);
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  const renderRowDetail = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.program}</td>
      <td>{value.activityName}</td>
      <td>{value.year}</td>
      <td>{value.date}</td>
      <td>{value.headline}</td>
      <td>{value.type}</td>
      <td>
        <a href={value.link} className="text-[#0d4960] underline">
          {value.link}
        </a>
      </td>
      <td>{value.tone}</td>
      <td>{value.ave}</td>
      <td>{value.prFactor}</td>
      <td>{value.prValue}</td>
      <td>
        <Button
          onClick={() => {
            alert("Perbarui Data feature not ready yet");
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Perbarui Data
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      {showDetail ? (
        <>
          <Button
            className={"text-[#0D4690] cursor-pointer flex"}
            onClick={handleDetailClick}
          >
            <ChevronLeft /> Kembali
          </Button>
          <h1 className="text-2xl font-semibold my-5">Data Pemberitaan</h1>
          <div className="grid grid-cols-2 gap-y-7 mb-5">
            <div>
              <p className="font-semibold">Nama Instansi:</p>
              <p className="ml-2">{selectedMedia.name}</p>
            </div>
            <div>
              <p className="font-semibold">Tier Media:</p>
              <p className="ml-2">-</p>
            </div>
            <div>
              <p className="font-semibold">Skala Media:</p>
              <p className="ml-2">-</p>
            </div>
          </div>
          <MediaCard items={dummyCardCount} />
          <h1 className="text-2xl font-semibold my-5">
            Output Pemberitaan {selectedMedia.name}
          </h1>
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
                label: "Tahun",
                options: [
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                ],
              },
              {
                label: "Program",
                options: [
                  { label: "BCF", value: "bcf" },
                  { label: "CLP", value: "clp" },
                  { label: "Lead", value: "lead" },
                  { label: "HOL", value: "hol" },
                  { label: "SDI", value: "sdi" },
                ],
              },
            ]}
            onFilterSet={() => console.log("Filter diset")}
            searchWidth="w-1/4"
          />
          <div className="overflow-x-auto w-full">
            <table className="text-center w-600 table-auto">
              <thead className="text-[#0D4690] bg-[#E7EDF4]">
                <tr className="h-10">
                  {headersDetail.map((header, index) => (
                    <th
                      key={index}
                      className={`text-base font-semibold ${
                        index === 0 ? "rounded-tl-xl" : ""
                      } ${
                        index === headersDetail.length - 1
                          ? "rounded-tr-xl"
                          : ""
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-base font-normal">
                {dummyDetailData.map((item, index) =>
                  renderRowDetail(item, index)
                )}
              </tbody>
            </table>
          </div>
          <Pagination />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">
            Output Pemberitaan per-Media
          </h1>
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchWidth="w-1/3"
            filters={[
              {
                label: "Tahun",
                options: [
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                ],
              },
              {
                label: "Program",
                options: [
                  { label: "BCF", value: "bcf" },
                  { label: "CLP", value: "clp" },
                  { label: "Lead", value: "lead" },
                  { label: "HOL", value: "hol" },
                  { label: "SDI", value: "sdi" },
                ],
              },
            ]}
          />
          <Table
            headers={headers}
            data={MediaRecapData}
            renderRow={renderRow}
          />
          <Pagination />
        </>
      )}
    </div>
  );
};
