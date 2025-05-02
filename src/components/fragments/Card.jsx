import { useNavigate } from "react-router-dom";
import { Button } from "../elements/Button";
import { useDispatch } from "react-redux";
import { setActiveStakeholder } from "../../features/stakeholder/activeStakeholderSlice";

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
