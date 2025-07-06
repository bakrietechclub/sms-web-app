import { Label } from "../elements/Label";
import { Button } from "../elements/Button";
import { FreezeTable } from "../fragments/Table";
import { Pagination } from "../fragments/Pagination";
import { TableToolbar } from "../fragments/TableToolbar";

import { UnivBcfPartnership } from "../../data/data_univ";
import { MediaBcfPartnership } from "../../data/data_media";
import { INGOBcfPartnership } from "../../data/data_ingo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Eye, ChevronLeft } from "lucide-react";

export const BcfPartnership = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});
  const [showDetailMoU, setShowDetailMoU] = useState(false);
  const [showDetailPks, setShowDetailPks] = useState(false);
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const handleClickDetailMoU = () => {
    setShowDetailMoU(!showDetailMoU);
  };

  const handleClickDetailPks = () => {
    setShowDetailPks(!showDetailPks);
  };

  let data;
  if (stakeholder === "universitas") {
    data = UnivBcfPartnership;
  } else if (stakeholder === "media") {
    data = MediaBcfPartnership;
  } else {
    data = INGOBcfPartnership;
  }

  const headers = ["No.", "Nama Instansi", "Jenis Instansi", "Divisi Instansi"];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-x border-r border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 py-3">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.name}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-x border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 p-3">{value.region}</td>
      <td className="border-b border-gray-200">{value.category}</td>
      <td className="border-b border-gray-200">
        <Label label={value.colabProgress} />
      </td>
      <td className="border-b border-gray-200 px-3">
        <Label label={value.mouStatus} />
      </td>
      <td className="border-b border-gray-200">{value.mouDue}</td>
      <td className="border-b border-gray-200">
        <Button
          type="button"
          onClick={() => {
            setSelected(value);
            handleClickDetailMoU();
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
      <td className="border-b border-gray-200 px-3">
        <Label label={value.pksStatus} />
      </td>
      <td className="border-b border-gray-200">{value.pksDue}</td>
      <td className="border-b border-gray-200">
        <Button
          type="button"
          onClick={() => {
            setSelected(value);
            handleClickDetailPks();
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
      <td className="border-b border-gray-200">
        <Button
          className="flex text-sm p-1 m-2 items-center justify-center bg-[#e89229] text-[#f1f1f1] rounded-md hover:bg-[#d18325] cursor-pointer gap-1"
          onClick={() => alert("Lihat Kontak")}
        >
          <Eye className="inline" />
          Lihat Kontak
        </Button>
      </td>
    </tr>
  );

  const customHeaderRight = (
    <>
      <tr>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Region
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Kategori Program
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Progress Kerjasama
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded"
          colSpan={3}
        >
          MoU
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded"
          colSpan={3}
        >
          PKS
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded-tr-xl"
          rowSpan={2}
        >
          Kontak
        </th>
      </tr>
      <tr>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Status
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Jatuh Tempo
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Aksi
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Status
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Jatuh Tempo
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Aksi
        </th>
      </tr>
    </>
  );

  if (!showDetailMoU && !showDetailPks) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-3">Database Partnership</h1>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          filters={[
            {
              label: "Jenis Instansi",
              options: [
                { label: "Universitas", value: "universitas" },
                { label: "Lembaga Sosial", value: "lembaga sosial" },
                {
                  label: "Lembaga Internasional",
                  value: "lembaga internasional",
                },
                { label: "Media Masa", value: "media masa" },
                { label: "Dunia Usaha", value: "dunia usaha" },
              ],
            },
            {
              label: "Status Kerjasama",
              options: [{}],
            },
          ]}
          onFilterSet={() => console.log("Filter diset")}
          searchWidth="w-1/3"
        />
        <FreezeTable
          headers={headers}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
          customHeaderRight={customHeaderRight}
          withHeaderColumnBorders={true}
        />
        <Pagination />
      </div>
    );
  } else if (showDetailMoU) {
    return (
      <div>
        <Button
          className={"text-[#0D4690] cursor-pointer flex"}
          onClick={() => {
            handleClickDetailMoU();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold my-4">Data Lengkap MoU</h1>
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
              Link Dokumen MoU
            </a>
          </div>
          <div className="">
            <p className="font-semibold">Catatan Tambahan:</p>
            <p className="">-</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          className="text-[#0D4690] cursor-pointer flex"
          onClick={() => {
            handleClickDetailPks();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold mt-4">Data Lengkap PKS</h1>
        <div className="flex justify-end">
          <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
            Perbarui
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 mb-5">
          <div>
            <p className="font-semibold">Nama Instansi:</p>
            <p>{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi</p>
            <p>{selected.jenis}</p>
          </div>
          <div>
            <p className="font-semibold">Divisi Instansi:</p>
            <p>{selected.division}</p>
          </div>
          <div>
            <p className="font-semibold">Program Kerjasama:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Detail Kerjasama:</p>
            <p>-</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <Label label={"Sudah Diperiksa oleh Mitra"} status={""} />
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
            <p className="font-semibold">Tanggal Tanda Tangan:</p>
            <p>{selected.signYear}</p>
          </div>
          <div>
            <p className="font-semibold">Jangka Waktu:</p>
            <p>{selected.duration}</p>
          </div>
          <div>
            <p className="font-semibold">Tanggal Jatuh Tempo:</p>
            <p>{selected.dueDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-5 mb-5">
          <div>
            <p className="font-semibold">Link Dokumen:</p>
            <a href="#" className="text-[#0D4690] italic underline">
              Link Dokumen PKS
            </a>
          </div>
          <div>
            <p className="font-semibold">Catatan Tambahan:</p>
            <p>-</p>
          </div>
        </div>
      </div>
    );
  }
};
