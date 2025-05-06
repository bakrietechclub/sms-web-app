import { Download, Share2 } from "lucide-react";
import { FreezeTable } from "../../fragments/Table";
import { Button } from "../../elements/Button";

export const SatisfactionSurvey = () => {
  const data = [
    {
      name: "Fajar Berduri",
      email: "pesonafajar@gmail.com",
      partnerCategory: "Universitas",
      whatsapp: "08123456789",
      position: "Rektorat",
      partnerName: "Universitas Indonesia",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 8: Jan-Jun 2023",
    },
    {
      name: "Faiz Americano",
      email: "americanolezatos@gmail.com",
      partnerCategory: "Universitas",
      whatsapp: "08123456789",
      position: "Kepala Prodi",
      partnerName: "Politeknik Negeri Jakarta",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 7: Jul-Dec 2023",
    },
    {
      name: "Ricky Buryam",
      email: "bosricky@gmail.com",
      partnerCategory: "Lembaga",
      whatsapp: "08123456789",
      position: "Ketua Umum",
      partnerName: "PPTI DKI Jakarta",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 4: Jan-Jun 2022",
    },
    {
      name: "El Malik",
      email: "radenelmalik@gmail.com",
      partnerCategory: "Dunia Usaha",
      whatsapp: "08123456789",
      position: "Pemilik",
      partnerName: "Malik Foundation",
      partnerOrigin: "Jawa Barat",
      colabYear: "Batch 1: Jul-Dec 2020",
    },
    {
      name: "Platama Alhan",
      email: "alhanplatama12@gmail.com",
      partnerCategory: "Pemerintah",
      whatsapp: "08123456789",
      position: "Ketua Umum",
      partnerName: "Kementrian Kesehatan",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 6: Jan-Jun 2023",
    },
    {
      name: "Fajar Berduri",
      email: "pesonafajar@gmail.com",
      partnerCategory: "Universitas",
      whatsapp: "08123456789",
      position: "Rektorat",
      partnerName: "Universitas Indonesia",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 8: Jan-Jun 2023",
    },
    {
      name: "Faiz Americano",
      email: "americanolezatos@gmail.com",
      partnerCategory: "Universitas",
      whatsapp: "08123456789",
      position: "Kepala Prodi",
      partnerName: "Politeknik Negeri Jakarta",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 7: Jul-Dec 2023",
    },
    {
      name: "Ricky Buryam",
      email: "bosricky@gmail.com",
      partnerCategory: "Lembaga",
      whatsapp: "08123456789",
      position: "Ketua Umum",
      partnerName: "PPTI DKI Jakarta",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 4: Jan-Jun 2022",
    },
    {
      name: "El Malik",
      email: "radenelmalik@gmail.com",
      partnerCategory: "Dunia Usaha",
      whatsapp: "08123456789",
      position: "Pemilik",
      partnerName: "Malik Foundation",
      partnerOrigin: "Jawa Barat",
      colabYear: "Batch 1: Jul-Dec 2020",
    },
    {
      name: "Platama Alhan",
      email: "alhanplatama12@gmail.com",
      partnerCategory: "Pemerintah",
      whatsapp: "08123456789",
      position: "Ketua Umum",
      partnerName: "Kementrian Kesehatan",
      partnerOrigin: "DKI Jakarta",
      colabYear: "Batch 6: Jan-Jun 2023",
    },
  ];

  const headers = [
    "No",
    "Nama Responden",
    "Email",
    "No. WhatsApp",
    "Kategori Mitra",
    "Jabatan di Instansi",
    "Nama Mitra",
    "Asal Provinsi Mitra",
    "Tahun Kerjasama",
    "Aksi",
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.name}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{value.email}</td>
      <td>{value.whatsapp}</td>
      <td>{value.partnerCategory}</td>
      <td>{value.position}</td>
      <td>{value.partnerName}</td>
      <td>{value.partnerOrigin}</td>
      <td>{value.colabYear}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Data Hasil Survey</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button
          type="button"
          className="bg-[#0D4690] text-white px-4 py-2 rounded-md"
        >
          <Download className="inline mr-2" size={16} />
          Download Data
        </Button>
        <Button
          type="button"
          className="bg-[#0D4690] text-white px-4 py-2 rounded-md"
        >
          <Share2 className="inline mr-2" size={16} />
          Bagikan Form Survey
        </Button>
      </div>
      <div className="flex justify-start mb-4 gap-3 font-bold">
        <Button
          type="button"
          className="text-[#0D4690] bg-[#E7EDF4] py-4 px-8 rounded-xl"
        >
          LEAD
        </Button>
        <Button
          type="button"
          className="text-[#0D4690] bg-[#E7EDF4] py-4 px-8 rounded-xl"
        >
          CLP
        </Button>
        <Button
          type="button"
          className="text-[#0D4690] bg-[#E7EDF4] py-4 px-8 rounded-xl"
        >
          HOL
        </Button>
      </div>
      <div className="overflow-x-scroll">
        <FreezeTable
          headers={headers}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={2}
        />
      </div>
    </div>
  );
};
