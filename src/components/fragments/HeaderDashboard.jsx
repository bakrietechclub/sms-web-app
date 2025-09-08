import { DoorOpenIcon, BellIcon, ChevronDown, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import avatar from "../../assets/img/userAvatar.png";
import NotificationsModal from "./NotificationsModal";

export const HeaderDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const simplifiedRole = user?.role.split(" ")[0];
  
  const handleMenuClick = () => {
    const menu = document.querySelector(".menu-dropdown");
    menu.classList.toggle("hidden");
  };

  const handleBellClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  const updateUnreadCount = useCallback((notifications) => {
    if (!Array.isArray(notifications)) {
      console.error("updateUnreadCount dipanggil dengan nilai yang bukan array:", notifications);
      return;
    }
    const unread = notifications.filter((notif) => !notif.isRead).length;
    setUnreadCount(unread);
  }, []);

  const activeStakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );

  const headerTitle =
    activeStakeholder === "universitas"
      ? "Universitas, Lembaga (NGO) & Komunitas"
      : activeStakeholder === "media"
      ? "Media Massa, Dunia Usaha & Pemerintahan"
      : "Lembaga Internasional (INGO)";

  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white py-4 flex justify-between items-end">
        <h1 className="text-xl font-medium text-[#E89229]">{headerTitle}</h1>
        <div className="flex items-center justify-between space-x-4">
          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#E6E6E6] text-black cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleBellClick}
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
            )}
          </button>
          <img src={avatar} alt="Avatar" className="h-9" />
          <div className="inline-grid text-[#1f1f1f]">
            <strong>{user?.username}</strong>
            <div className="flex gap-2">
              <span className="text-sm text-[#28A745]">admin</span>
              <span className="text-sm">|</span>
              <span className="text-sm">{user?.division}</span>
            </div>
          </div>
          <div className="relative">
            <button
              className="py-2 rounded-md focus:outline-none cursor-pointer"
              onClick={handleMenuClick}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="menu-dropdown hidden absolute top-10 right-4 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-lg p-2 animate-fadeIn z-50">
              <button
                className="px-4 py-2 hover:bg-[#E7EDF4] cursor-pointer flex items-center text-sm w-full rounded-md transition duration-300 ease-in-out"
                onClick={() => navigate("/home")}
              >
                <HomeIcon className="w-4 h-4 mr-2 text-[#0d4690]" />
                Dashboard Utama
              </button>
              <button
                className="px-4 py-2 hover:bg-[#fae1e3] cursor-pointer flex items-center text-sm w-full rounded-md transition duration-300 ease-in-out"
                onClick={() => navigate("/")}
              >
                <DoorOpenIcon className="w-4 h-4 mr-2 text-[#DC3545]" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>
      <NotificationsModal
        isOpen={isNotificationModalOpen}
        onClose={handleCloseNotificationModal}
        updateUnreadCount={updateUnreadCount}
      />
    </>
  );
};