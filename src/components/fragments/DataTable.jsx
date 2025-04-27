import { Label } from "../elements/Label";

export const ResearchPartnerTable = () => {
  const dummydata = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      region: "DKI Jakarta",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      region: "Sumatera Selatan",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "CLP, HOL, LEAD",
      status: true,
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      region: "Jawa Barat",
      program: "CLP, HOL",
      status: false,
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      region: "DKI Jakarta",
      program: "LEAD, HOL",
      status: true,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, LEAD, HOL",
      status: false,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "LEAD, HOL",
      status: false,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, HOL",
      status: true,
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      region: "Banten",
      program: "CLP, HEAD, HOL",
      status: true,
    },
  ];

  const dummyMap = dummydata.map((data, index) => {
    return {
      name: data.name,
      jenis: data.jenis,
      region: data.region,
      program: data.program,
      status: data.status,
    };
  });

  return (
    <table className="table-fixed text-center w-full">
      <thead className="text-[#0D4690] bg-[#E7EDF4]">
        {/* header table dibuat lebih menonjol, lebar dan font-bold */}
        <tr className="table-row h-10">
          <th className="text-md font-medium rounded-tl-xl">No</th>
          <th className="text-md font-medium">Nama Instansi</th>
          <th className="text-md font-medium">Jenis Instansi</th>
          <th className="text-md font-medium">Region</th>
          <th className="text-md font-medium">Program LSD</th>
          <th className="text-md font-medium">Status</th>
          <th className="text-md font-medium rounded-tr-xl">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {dummydata.map((value, index) => (
          <tr key={index} className="table-row border-b border-[#E7EDF4] h-10">
            {/* Tulisan nya usahakan satu baris */}
            <td>{index + 1}</td>
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
        ))}
      </tbody>
    </table>
    // Pagination nanti akan ditambahkan di sini yee ;).
  );
};

export const AudienceTable = () => {
  const dummydata = [
    {
      name: "Universitas Indonesia",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "Universitas Jakarta",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "re-audiensi",
    },
    {
      name: "Universitas Sriwijaya",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "selesai",
    },
    {
      name: "Universitas Gunadarma",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "belum",
    },
    {
      name: "Universitas Telkom",
      jenis: "Universitas",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "STPI Penabulu",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "selesai",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "belum",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "re-audiensi",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: false,
      status: "selesai",
    },
    {
      name: "Gerakan TBC",
      jenis: "Lembaga Sosial",
      tanggal: "23/10/2024",
      jam: "09:00",
      audiensi: true,
      status: "selesai",
    },
  ];
  const dummyMap = dummydata.map((data, index) => {
    return {
      name: data.name,
      jenis: data.jenis,
      tanggal: data.tanggal,
      jam: data.jam,
      audiensi: data.audiensi,
      status: data.status,
    };
  });
  return (
    <table className="table-fixed text-center w-full">
      <thead className="text-[#0D4690] bg-[#E7EDF4]">
        <tr className="table-row h-10">
          <th className="text-md font-semibold rounded-tl-xl">No</th>
          <th className="text-md font-semibold">Nama Instansi</th>
          <th className="text-md font-semibold">Jenis Instansi</th>
          <th className="text-md font-semibold">Tanggal</th>
          <th className="text-md font-semibold">Jam</th>
          <th className="text-md font-semibold">Jenis</th>
          <th className="text-md font-semibold">Status</th>
          <th className="text-md font-semibold rounded-tr-xl">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {dummydata.map((value, index) => (
          <tr key={index} className="table-row border-b border-[#E7EDF4] h-10">
            <td>{index + 1}</td>
            <td>{value.name}</td>
            <td>{value.jenis}</td>
            <td>{value.tanggal}</td>
            <td>{value.jam}</td>
            <td>
              <Label
                label={value.audiensi ? "Online" : "Offline"}
                status={value.audiensi ? "info" : "white"}
              />
            </td>
            <td>
              <Label
                label={
                  value.status === "re-audiensi"
                    ? "Re-Audiensi"
                    : value.status === "selesai"
                    ? "Selesai"
                    : "Belum Audiensi"
                }
                status={
                  value.status === "re-audiensi"
                    ? "warning"
                    : value.status === "selesai"
                    ? "success"
                    : "danger"
                }
              />
            </td>
            <td>
              <a href="#" className="text-[#0D4690] underline">
                Lihat Detail
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
