import { useEffect, useState } from 'react';
import { SidebarMenu } from '../fragments/SidebarMenu';
import { HeaderDashboard } from '../fragments/HeaderDashboard';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectedAccess as selectSelectedAccess,
  selectRealAccessRoles,
} from '../../states/features/auth/authSelectors';

const SIDEBAR_COLLAPSED_KEY = 'sidebarCollapsed';

export const DashboardLayout = () => {
  const isPreload = useSelector((state) => state.isPreload);
  const selected = useSelector(selectSelectedAccess);
  const allowedRoles = useSelector(selectRealAccessRoles);

  // Collapse (desktop, mengecilkan sidebar jadi ikon saja) diingat lewat
  // localStorage supaya preferensi user tidak reset tiap reload.
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true',
  );
  // Drawer sidebar di layar mobile (<md) -- default tertutup.
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(isCollapsed));
  }, [isCollapsed]);

  // Gerbang terakhir -- menutup jalur selain klik Card di /home (URL
  // langsung, localStorage.selectedAccess basi dari sebelum akses dicabut
  // di SA, dsb). Tunggu preload selesai dulu supaya tidak salah redirect
  // saat profil (berisi roles) belum termuat.
  if (!isPreload && (!selected || !allowedRoles.includes(selected))) {
    return (
      <Navigate
        to='/home'
        replace
      />
    );
  }

  return (
    <div className='flex'>
      <SidebarMenu
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <main
        className={`flex-1 min-h-screen py-4 px-4 md:px-8 transition-all duration-300 overflow-x-hidden ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <HeaderDashboard onOpenMobileMenu={() => setIsMobileOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
};
