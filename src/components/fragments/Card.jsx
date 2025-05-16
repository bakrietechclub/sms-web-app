import { useNavigate } from "react-router-dom";
import { Button } from "../elements/Button";
import { useDispatch } from "react-redux";
import { setActiveStakeholder } from "../../features/stakeholder/activeStakeholderSlice";

import trophy from "../../assets/icons/trophy.png"

export const Card = ({ name, image, manageAccess, stakeholderKey }) => {
  const isOutlined = manageAccess
    ? "bg-[#E89229] text-white hover:bg-[#D18325]"
    : "bg-white text-[#E89229] outline-1 outline-[#E89229] hover:bg-[#E89229] hover:text-white";

  const buttonLabel = manageAccess ? "Kelola" : "Lihat";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveStakeholder(stakeholderKey));  
    localStorage.setItem('activeStakeholder', stakeholderKey);
    navigate("/dashboard", { state: { title: name } });
  };

  return (
    <div
      className="relative max-w-96 h-48 rounded-md shadow-sm p-4 flex flex-2/4 overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom -1rem left -1rem",
      }}
    >
      <h2 className="font-semibold text-xl">{name}</h2>
      <Button
        onClick={handleClick}
        className={
          isOutlined +
          ` absolute bottom-5 right-5 rounded-lg px-4 py-2 mt-4 transition duration-300 ease-in-out cursor-pointer`
        }
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export const CardItem = ({ title, winner, icon }) => (
  <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow flex flex-col items-start w-86 min-h-[260px] mr-6">
    <div className="flex items-start mb-4 relative w-full">
      <h5 className="text-xl font-semibold text-blue-900 w-64">{title}</h5>
      <img src={icon} alt="icon" className="ml-3 w-9 h-9 mt-1" />
    </div>
    <div className="w-full bg-white rounded-lg border-1 border-gray-200 p-4 flex flex-col justify-between min-h-[110px] mt-auto">
      <div className="flex items-center mb-2">
        <img src={trophy} alt="trophy" className="w-6 h-6 mr-2" />
        <div>
          <p className="text-xs text-black font-normal">Pemenang:</p>
          <p className="text-sm font-semibold text-black">{winner}</p>
        </div>
      </div>
      <a href="#" className="text-blue-900 text-xs underline self-end">
        Lihat Detail
      </a>
    </div>
  </div>
);




