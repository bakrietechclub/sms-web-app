import { useState } from "react";
import { Download, Share2 } from "lucide-react";
import { FreezeTable } from "../fragments/Table";
import { Button } from "../elements/Button";
import { Pagination } from "../fragments/Pagination";

import { useSelector } from "react-redux";

import {
  UnivSatisfactionSurveyCLP,
  UnivSatisfactionSurveyHOL,
  UnivSatisfactionSurveyLEAD,
} from "../../data/data_univ";
import {
  INGOSatisfactionSurveyCLP,
  INGOSatisfactionSurveyHOL,
  INGOSatisfactionSurveyLEAD,
} from "../../data/data_ingo";

export const SatisfactionSurvey = () => {
  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );
  let dataRaw;
  if (stakeholder === "universitas") {
    dataRaw = UnivSatisfactionSurveyLEAD;
  } else {
    dataRaw = INGOSatisfactionSurveyLEAD;
  }
  const [data, setData] = useState(dataRaw);

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
      <td className="border-b border-gray-200 py-3">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 p-3">{value.email}</td>
      <td className="border-b border-gray-200">{value.whatsapp}</td>
      <td className="border-b border-gray-200">{value.partnerCategory}</td>
      <td className="border-b border-gray-200">{value.position}</td>
      <td className="border-b border-gray-200">{value.partnerName}</td>
      <td className="border-b border-gray-200">{value.partnerOrigin}</td>
      <td className="border-b border-gray-200">{value.colabYear}</td>
      <td>
        <a href="#" className="text-[#0D4690] underline">
          Lihat Detail
        </a>
      </td>
    </tr>
  );

  // State untuk menyimpan status tab yang aktif
  const [lead, setLead] = useState(true);
  const [clp, setClp] = useState(false);
  const [hol, setHol] = useState(false);

  const handleLead = () => {
    setLead(true);
    setClp(false);
    setHol(false);
    if (stakeholder === "universitas") {
      setData(UnivSatisfactionSurveyLEAD);
    } else {
      setData(INGOSatisfactionSurveyLEAD);
    }
  };

  const handleClp = () => {
    setLead(false);
    setClp(true);
    setHol(false);
    if (stakeholder === "universitas") {
      setData(UnivSatisfactionSurveyCLP);
    } else {
      setData(INGOSatisfactionSurveyCLP);
    }
  };

  const handleHol = () => {
    setLead(false);
    setClp(false);
    setHol(true);
    if (stakeholder === "universitas") {
      setData(UnivSatisfactionSurveyHOL);
    } else {
      setData(INGOSatisfactionSurveyHOL);
    }
  };

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
          className={
            (lead
              ? "text-[#0D4690] bg-[#E7EDF4]"
              : "text-[#999999] border border-[#e6e6e6]") +
            " py-4 px-8 rounded-xl cursor-pointer ease-in-out duration-300 w-40"
          }
          onClick={handleLead}
        >
          LEAD
        </Button>
        <Button
          type="button"
          className={
            (clp
              ? "text-[#0D4690] bg-[#E7EDF4]"
              : "text-[#999999] border border-[#e6e6e6]") +
            " py-4 px-8 rounded-xl cursor-pointer ease-in-out duration-300 w-40"
          }
          onClick={handleClp}
        >
          CLP
        </Button>
        <Button
          type="button"
          className={
            (hol
              ? "text-[#0D4690] bg-[#E7EDF4]"
              : "text-[#999999] border border-[#e6e6e6]") +
            " py-4 px-8 rounded-xl cursor-pointer ease-in-out duration-300 w-40"
          }
          onClick={handleHol}
        >
          HOL
        </Button>
      </div>
      <div className="">
        <FreezeTable
          headers={headers}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={2}
        />
      </div>
      <Pagination />
    </div>
  );
};
