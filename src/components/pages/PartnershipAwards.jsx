import TextField from "../elements/formfields/TextField";
import { CardItem } from "../fragments/Card";
import { Table } from "../fragments/Table";
import { Pagination } from "../fragments/Pagination";
import { TableToolbar } from "../fragments/TableToolbar";
import { HorizontalScrollSection } from "../fragments/HorizontalScrollSection";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ChevronLeft, ListFilter } from "lucide-react";

import { UnivPAUnivCards, UnivPAInstitutionCards } from "../../data/data_univ";
import { INGOPAUnivCards, INGOPAInstitutionCards } from "../../data/data_ingo";

export const PartnershipAwards = () => {
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { register } = useForm();

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  let univCards = [];
  let instituteCards = [];
  if (stakeholder === "universitas") {
    univCards = UnivPAUnivCards;
    instituteCards = UnivPAInstitutionCards;
  } else {
    univCards = INGOPAUnivCards;
    instituteCards = INGOPAInstitutionCards;
  }

  const detailedItem = selectedItem;

  const headers = ["No"];
  const data = [{ no: 1 }, { no: 2 }, { no: 3 }, { no: 4 }, { no: 5 }];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{value.no}</td>
    </tr>
  );

  return (
    <div className="w-full overflow-x-hidden">
      {showDetails ? (
        <div>
          <button
            className="text-[#0D4690] cursor-pointer flex items-center"
            onClick={handleBackToList}
          >
            <ChevronLeft className="mr-1" size={20} /> Kembali
          </button>

          {detailedItem ? (
            <>
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold my-5">
                  Detail {detailedItem.title}
                </h1>
                <img
                  src={detailedItem.icon}
                  alt=""
                  className="ml-3 w-9 h-9 mt-1"
                />
              </div>

              <h2 className="text-xl font-semibold">Indikator:</h2>
              <p className="ml-2 mb-2">
                {detailedItem.indicatorDescription ||
                  "Deskripsi indikator belum tersedia."}
              </p>
              <div className="w-2/3">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-semibold my-4">Tabel Data</h1>
                  <button className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer">
                    <ListFilter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
                <Table headers={headers} data={data} renderRow={renderRow} />
                <Pagination />
                <br />
                <TextField
                  name="additionalNote"
                  label="Catatan Tambahan (Penilaian Kualitatif)"
                  placeholder=""
                  register={register}
                />
              </div>
            </>
          ) : (
            <p>Detail tidak ditemukan.</p>
          )}
        </div>
      ) : (
        <div className="">
          <h1 className="text-[1.75rem] font-semibold">Partnership Awards</h1>
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchWidth="w-1/3"
          />
          <HorizontalScrollSection
            title="Universitas"
            items={univCards}
            renderItem={(item, index) => (
              <CardItem
                key={index}
                item={item}
                onViewDetails={handleViewDetails}
              />
            )}
          />
          <HorizontalScrollSection
            title="Lembaga"
            items={instituteCards}
            renderItem={(item, index) => (
              <CardItem
                key={index}
                item={item}
                onViewDetails={handleViewDetails}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};
