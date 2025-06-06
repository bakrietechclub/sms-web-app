import { CardItem } from "../fragments/Card";
import { HorizontalScrollSection } from "../fragments/HorizontalScrollSection";
import { useState } from "react";
import { TableToolbar } from "../fragments/TableToolbar";
import { useSelector } from "react-redux";

import { UnivPAUnivCards, UnivPAInstitutionCards } from "../../data/data_univ";
import { INGOPAUnivCards, INGOPAInstitutionCards } from "../../data/data_ingo";

export const PartnershipAwards = () => {
  const [search, setSearch] = useState("");
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

  return (
    <div className="w-full overflow-x-hidden">
      <h1 className="text-[1.75rem] font-semibold">Partnership Awards</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchWidth="w-1/3"
      />
      <div className="pt-1 text-2xl">
        <HorizontalScrollSection
          title="Universitas"
          items={univCards}
          renderItem={(item, index) => (
            <CardItem
              key={index}
              title={item.title}
              winner={item.winner}
              icon={item.icon}
            />
          )}
        />
        <HorizontalScrollSection
          title="Lembaga"
          items={instituteCards}
          renderItem={(item, index) => (
            <CardItem
              key={index}
              title={item.title}
              winner={item.winner}
              icon={item.icon}
            />
          )}
        />
      </div>
    </div>
  );
};
