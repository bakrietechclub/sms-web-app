import Label from "../elements/Label";

const DataTable = () => {
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
export default DataTable;
