import { Pagination } from "../../fragments/Pagination";
import { FreezeTable } from "../../fragments/Table";
import { TableToolbar } from "../../fragments/TableToolbar";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../elements/Button";
import { Label } from "../../elements/Label";

export const MouPksINGO = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const data = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      division: "Universitas",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      division: "Prodi Ilmu Komputer",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      division: "FISIP",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      division: "Prodi Farmasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      division: "Fakultas Ilmu Komputer",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      division: "Organisasi",
      colabType: "MoU",
      duration: "5 Tahun",
      dueDate: "24/10/2029",
      signYear: "2024",
    },
  ];

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

  const [selected, setSelected] = useState({
    name: "",
    jenis: "",
    division: "",
    colabType: "",
    duration: "",
    dueDate: "",
    signYear: "",
  });

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
      <td>{value.jenis}</td>
      <td>{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{value.colabType}</td>
      <td>{value.duration}</td>
      <td>{value.dueDate}</td>
      <td>{value.signYear}</td>
      <td className="px-6 py-3">
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
        <h1 className="text-2xl font-semibold">Tabel MoU / PKS</h1>
        <div className="w-full">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            onAddClick={(opt) => handleAdd(opt)}
            addOptions={["MoU", "PKS"]}
            filters={[
              {
                label: "Jenis Surat",
                options: [
                  { label: "MoU", value: "MoU" },
                  { label: "PKS", value: "PKS" },
                ],
              },
            ]}
            onFilterSet={() => console.log("Filter diset")}
            searchWidth="w-1/4"
          />
        </div>
        <div className="w-full overflow-hidden h-fit">
          <FreezeTable
            headers={headers}
            data={data}
            renderRow={renderRow}
            renderRowFreeze={renderRowFreeze}
            freezeCol={4}
          />
        </div>
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
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap MoU / PKS</h1>
        <div className="flex justify-end">
          <Button
            className={
              "bg-[#0D4690] text-white cursor-pointer rounded-md px-4 py-2"
            }
          >
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div className="">
            <p className="font-semibold">Nama Instansi:</p>
            <p className="">{selected.name}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jenis Instansi</p>
            <p className="">{selected.jenis}</p>
          </div>
          <div className="">
            <p className="font-semibold">Divisi Instansi:</p>
            <p className="">{selected.division}</p>
          </div>
          <div className="">
            <p className="font-semibold">Program Kerjasama:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Detail Kerjasama:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Status:</p>
            <p className="">
              <Label label={"Sudah Diperiksa oleh Mitra"} status={""} />
            </p>
          </div>
          <div className="">
            <p className="font-semibold">Nomor Surat BCF:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Nomor Surat Mitra:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Nama Pihak BCF:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Nama Pihak Mitra:</p>
            <p className="">-</p>
          </div>
          <div className="">
            <p className="font-semibold">Tanggal Tanda Tangan:</p>
            <p className="">{selected.signYear}</p>
          </div>
          <div className="">
            <p className="font-semibold">Jangka Waktu:</p>
            <p className="">{selected.duration}</p>
          </div>
          <div className="">
            <p className="font-semibold">Tanggal Jatuh Tempo:</p>
            <p className="">{selected.dueDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-5 mb-5">
          <div className="">
            <p className="font-semibold">Link Dokumen:</p>
            <a href="#" className="text-[#0D4690] italic underline">
              Link Dokumen MoU / PKS
            </a>
          </div>
          <div className="">
            <p className="font-semibold">Catatan Tambahan:</p>
            <p className="">-</p>
          </div>
        </div>
      </div>
    );
  }
};
