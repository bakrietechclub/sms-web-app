import { CardItem } from "../../fragments/Card";
import { HorizontalScrollSection } from "../../fragments/HorizontalScrollSection";
import { SearchBar } from "../../fragments/TableToolbar";

import applicants from "../../../assets/icons/applicants.png"
import accepted from "../../../assets/icons/accepted.png"
import engagement from "../../../assets/icons/engagement.png"
import favorite from "../../../assets/icons/favorite.png"
import implementator from "../../../assets/icons/implementator.png"
import inovative from "../../../assets/icons/inovative.png"
import pic from "../../../assets/icons/pic.png"
import presentator from "../../../assets/icons/presentator.png"
import proceedings from "../../../assets/icons/proceedings.png"
import socialMedia from "../../../assets/icons/socialMedia.png"
import supervisor from "../../../assets/icons/supervisor.png"
import valuable from "../../../assets/icons/valuable.png"

export const PartnershipAwards = () => {
  const universitasCards = [
    {
      title: "THE Most Applicants of University",
      winner: "Universitas Negeri Semarang",
      icon: applicants,
    },
    {
      title: "The Most Accepted Students of University",
      winner: "Universitas Lampung",
      icon: accepted,
    },
    {
      title: "The Most Accepted Students of University",
      winner: "Universitas Bakrie",
      icon: engagement,
    },
    {
      title: "The Most Field Supervisors of University",
      winner: "Universitas Padjajaran",
      icon: supervisor,
    },
    {
      title: "The Most Valuable Partner of University",
      winner: "Universitas Sriwijaya",
      icon: valuable,
    },
    {
      title: "The Best PIC MBKM of University",
      winner: `Lina Nugraha Rani, SE., M. SEI
      Universitas Airlangga`,
      icon: pic,
    },
  ];

  const lembagaCards = [
    {
      title: "The Most Innovative Program of Internship Program",
      winner: "Mentari Sehat Indonesia",
      icon: inovative,
    },
    {
      title: "The Favorite NGO of Internship Program",
      winner: "Mentari Sehat Indonesia",
      icon: favorite,
    },
    {
      title: "The Best NGO'S Social Media of Internship Pogram",
      winner: "Yayasan Masyarakat Peduli Tuberkulosis",
      icon: socialMedia,
    },
    {
      title: "The Best Implementator Program of Internship Program",
      winner: "Mentari Sehat Indonesia",
      icon: implementator,
    },
    {
      title: "The Best Proceedings of Internship Program",
      winner: "STPI Penabulu Banten",
      icon: proceedings,
    },
    {
      title: "The Best NGO's Presentator",
      winner: "-",
      icon: presentator,
    },
    {
      title: "The Most Innovative Program of Pratical Program",
      winner: "Rumah Literasi Tinggi",
      icon: inovative,
    },
    {
      title: "The Best Proceedings of Internship Pratical",
      winner: "Yayasan Terus Berjuang",
      icon: proceedings,
    },
    {
      title: "The Best NGO's Social Media of Pratical Program",
      winner: "Sekolah Janji Baik",
      icon: socialMedia,
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">          
        <h1 className="text-[1.75rem] font-semibold">Partnership Awards</h1>
        <SearchBar />
    <div className="pt-1 text-2xl">
      <HorizontalScrollSection
        title="Universitas"
        items={universitasCards}
        renderItem={(item, index) => (
          <CardItem key={index} title={item.title} winner={item.winner} icon={item.icon} />
        )}
      />
      <HorizontalScrollSection
        title="Lembaga"
        items={lembagaCards}
        renderItem={(item, index) => (
          <CardItem key={index} title={item.title} winner={item.winner} icon={item.icon} />
        )}
      />
    </div>
    </div>
  );
};