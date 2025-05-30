import uni from "../../assets/img/uniCard.png";
import media from "../../assets/img/mediaCard.png";
import ingo from "../../assets/img/ingoCard.png";

import { Card } from "../fragments/Card";
import { HeaderLandingPg } from "../fragments/HeaderLandingPg";
import { HeroLandingPg } from "../fragments/HeroLandingPg";

export const LandingPgLyt = ({ username, role }) => {
  const cardsData = [
    {
      name: "Universitas, Lembaga (NGO) & Komunitas",
      image: uni,
      accessRole: "Admin Universitas",
      stakeholderKey: "universitas",
    },
    {
      name: "Media Massa, Dunia Usaha & Pemerintahan",
      image: media,
      accessRole: "Admin Media",
      stakeholderKey: "media",
    },
    {
      name: "Lembaga Internasional (INGO)",
      image: ingo,
      accessRole: "Admin INGO",
      stakeholderKey: "lembagaInternasional"
    },
  ];

  return (
    <>
      <HeaderLandingPg username={username} role={role} />
      <HeroLandingPg username={username} />
      <div className="my-8 mx-[10dvw]">
        <p className="font-semibold text-2xl">Dashboard Stakeholder</p>
      </div>
      <div className="flex flex-col items-center justify-center h-auto">
        <div className="flex grid-cols-3 items-center justify-between gap-4 w-[80dvw] mb-0">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              name={card.name}
              image={card.image}
              manageAccess={role === card.accessRole}
              stakeholderKey={card.stakeholderKey}
            />
          ))}
        </div>
      </div>
    </>
  );
};
