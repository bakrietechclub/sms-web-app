import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DoorOpenIcon, ChevronDown } from 'lucide-react';

import { asyncUnsetAuthUser } from '../../states/features/auth/authThunks';
import logoBCF from '../../assets/img/logoBCF.png';
import avatar from '../../assets/img/userAvatar.png';
import { RoleIdentity } from './RoleIdentity';

export const HeaderLandingPg = ({ username, user, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideOrEscape = (event) => {
      if (event.type === 'keydown' && event.key !== 'Escape') return;
      if (
        event.type === 'mousedown' &&
        menuRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideOrEscape);
    document.addEventListener('keydown', handleOutsideOrEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideOrEscape);
      document.removeEventListener('keydown', handleOutsideOrEscape);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <header className='w-full border-b border-gray-200'>
      <div className='mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4'>
        <img
          src={logoBCF}
          alt='Logo Bakrie Center Foundation'
          className='w-24 sm:w-32 h-auto shrink-0'
        />
        <div className='flex items-center gap-3 sm:gap-4'>
          {isLoading ? (
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse' />
              <div className='hidden sm:inline-grid gap-1'>
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
                <div className='h-3 w-24 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          ) : (
            <>
              <img
                src={avatar}
                alt=''
                className='w-10 h-10'
              />
              <div className='hidden sm:block'>
                <RoleIdentity
                  username={username}
                  user={user}
                />
              </div>
            </>
          )}

          <div
            className='relative'
            ref={menuRef}
          >
            <button
              type='button'
              className='p-2 rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D4690]'
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-haspopup='menu'
              aria-expanded={isMenuOpen}
              aria-label='Menu akun'
            >
              <ChevronDown className='w-4 h-4' />
            </button>
            {isMenuOpen && (
              <div
                role='menu'
                className='absolute w-56 top-11 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10'
              >
                <button
                  role='menuitem'
                  className='px-4 py-2 hover:bg-[#fae1e3] cursor-pointer flex items-center text-sm w-full rounded-md transition duration-300 ease-in-out'
                  onClick={handleLogout}
                >
                  <DoorOpenIcon className='w-4 h-4 mr-2 text-[#DC3545]' />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
