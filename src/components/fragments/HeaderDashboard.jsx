import { useNavigate } from "react-router-dom";
import { DivideSquare, DoorOpenIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import logoBCF from "../../assets/img/logoBCF.png";
import avatar from "../../assets/img/userAvatar.png";
const HeaderDashboard = (props) => {
  const handleMenuClick = () => {
    const menu = document.querySelector(".menu-dropdown");
    menu.classList.toggle("hidden");
  };

  const navigate = useNavigate();
  return (
    <header className="justify-between py-4 px-[10dvw] border-b border-gray-200 flex mb-[4rem]">
      <img src={logoBCF} alt="Logo" className="h-14" />
      <div className="flex items-center justify-between space-x-4">
        <img src={avatar} alt="Avatar" className="h-9" />
        <div className="inline-grid">
          <strong>{props.username}</strong>
          <span className="text-sm">{props.role}</span>
        </div>

        <div className="relative">
          <button
            className="px-4 py-2 rounded-md focus:outline-none cursor-pointer"
            onClick={handleMenuClick}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="menu-dropdown hidden absolute top-10 right-4 mt-2 w-50 bg-white border border-gray-200 rounded-md shadow-lg p-2 animate-fadeIn">
            <button
              className="px-4 py-2 hover:bg-[#fae1e3] cursor-pointer flex items-center text-sm w-full rounded-md transition duration-300 ease-in-out"
              onClick={() => {
                alert("Logout"), navigate("/");
              }}
            >
              <DoorOpenIcon className="w-4 h-4 mr-2 text-[#DC3545]" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderDashboard;
