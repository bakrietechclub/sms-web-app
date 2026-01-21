import { DoorOpenIcon, BellIcon, ChevronDown, HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import avatar from '../../assets/img/userAvatar.png';
import NotificationsModal from './NotificationsModal';
import {
  selectAuthLoading,
  selectAuthUser,
  selectedAccess,
} from '../../states/features/auth/authSelectors';
import { unsetSelectedAccess } from '../../states/features/auth/authSlice';

export const HeaderDashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectAuthUser);
  const userLoading = useSelector(selectAuthLoading);
  const isPreload = useSelector((state) => state.isPreload);
  const isLoading = userLoading || isPreload;
  const accessRole = useSelector(selectedAccess);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleMenuClick = () => {
    const menu = document.querySelector('.menu-dropdown');
    menu.classList.toggle('hidden');
  };

  const handleBellClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  const updateUnreadCount = useCallback((notifications) => {
    if (!Array.isArray(notifications)) {
      console.error(
        'updateUnreadCount dipanggil dengan nilai yang bukan array:',
        notifications,
      );
      return;
    }
    const unread = notifications.filter((notif) => !notif.isRead).length;
    setUnreadCount(unread);
  }, []);

  const headerTitle =
    accessRole === 'LSD-SMS'
      ? 'Universitas, Lembaga (NGO) & Komunitas'
      : accessRole === 'SCP-SMS'
        ? 'Media Massa, Dunia Usaha & Pemerintahan'
        : 'Lembaga Internasional (INGO)';

  const navigate = useNavigate();

  return (
    <>
      <header className='bg-white py-4 flex justify-between items-end'>
        <h1 className='text-xl font-medium text-[#E89229]'>{headerTitle}</h1>
        <div className='flex items-center justify-between space-x-4'>
          {/* <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#E6E6E6] text-black cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleBellClick}
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
            )}
          </button> */}

          {isLoading ? (
            <>
              <div className='h-9 w-9 rounded-full bg-gray-200 animate-pulse' />
              <div className='inline-grid gap-1 animate-pulse'>
                <div className='h-4 w-24 rounded bg-gray-200' />
                <div className='h-3 w-32 rounded bg-gray-200' />
              </div>
            </>
          ) : (
            <>
              <img
                src={avatar}
                alt='Avatar'
                className='h-9'
              />
              <div className='inline-grid text-[#1f1f1f]'>
                <strong>{user?.fullName}</strong>
                <div className='flex gap-2'>
                  <span className='text-sm text-[#28A745]'>
                    {user?.accessRole}
                  </span>
                  <span className='text-sm'>|</span>
                </div>
              </div>
            </>
          )}

          <div className='relative'>
            <button
              className='py-2 rounded-md focus:outline-none cursor-pointer'
              onClick={handleMenuClick}
            >
              <ChevronDown className='w-4 h-4' />
            </button>
            <div className='menu-dropdown hidden absolute top-10 right-4 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-lg p-2 animate-fadeIn z-50'>
              <button
                className='px-4 py-2 hover:bg-[#E7EDF4] cursor-pointer flex items-center text-sm w-full rounded-md transition duration-300 ease-in-out'
                onClick={() => navigate('/home')}
              >
                <HomeIcon className='w-4 h-4 mr-2 text-[#0d4690]' />
                Dashboard Utama
              </button>
              <button
                className='px-4 py-2 hover:bg-[#fae1e3] cursor-pointer flex items-center text-sm w-full rounded-md transition duration-300 ease-in-out'
                onClick={() => {
                  dispatch(unsetSelectedAccess());
                  navigate('/');
                }}
              >
                <DoorOpenIcon className='w-4 h-4 mr-2 text-[#DC3545]' />
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
