import uni from "../../assets/img/uniCard.png";
import media from "../../assets/img/mediaCard.png";
import ingo from "../../assets/img/ingoCard.png";
import Card from "../fragments/Card";
import Header from "../fragments/HeaderLandingPg";
import Hero from "../fragments/HeroLandingPg";
const LandingPgLyt = (props) => {
  return (
    <>
      <Header username="Username" role="Role" />
      <Hero username="Username" />
      <div className="my-8 mx-[10dvw]">
        <p className="font-semibold text-2xl">Dashboard Stakeholder</p>
      </div>
      <div className="flex flex-col items-center justify-center h-auto gap-4">
        <div className="flex grid-cols-3 items-center justify-between gap-4 w-[80dvw] mb-[10dvh]">
          <Card
            name="Universitas, Lembaga (NGO), & Komunitas"
            image={uni}
            manageAccess={true} //access point
          />
          <Card
            name="Media Massa, Dunia Usaha & Pemerintahan"
            image={media}
            manageAccess={false} //accesss point
          />
          <Card
            name="Lembaga Internasional (INGO)"
            image={ingo}
            manageAccess={false} //access point
          />
        </div>
      </div>
    </>
  );
};

export default LandingPgLyt;
