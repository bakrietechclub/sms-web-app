import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../../states/features/auth/authThunk';
import { DoorOpenIcon, ChevronDown } from 'lucide-react';
import logoBCF from '../../assets/img/logoBCF.png';
import avatar from '../../assets/img/userAvatar.png';

export const HeaderLandingPg = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    const menu = document.querySelector('.menu-dropdown');
    menu.classList.toggle('hidden');
  };

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <header className="justify-between py-4 px-[10dvw] h-20 w-full border-b border-gray-200 flex mb-11.5">
      <img src={logoBCF} alt="Logo" className="w-32 h-12" />
      <div className="flex items-center justify-between space-x-4">
        <img src={avatar} alt="Avatar" className="w-10 h-10" />
        <div className="inline-grid">
          <strong className="font-semibold text-base w-32 h-6">
            {props.username}
          </strong>
          <span className="text-xs w-32 h-5">{props.role}</span>
        </div>

        <div className="relative">
          <button
            className="px-4 py-2 rounded-md focus:outline-none cursor-pointer"
            onClick={handleMenuClick}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="menu-dropdown hidden absolute w-78 h-13 top-10 right-4 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 animate-fadeIn">
            <button
              className="px-4 py-1 hover:bg-[#fae1e3] cursor-pointer flex items-center text-base w-full rounded-md transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              <DoorOpenIcon className="w-5 h-5 mr-2 text-[#DC3545]" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
