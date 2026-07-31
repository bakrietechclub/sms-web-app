import { SidebarMenu } from '../fragments/SidebarMenu';
import { HeaderDashboard } from '../fragments/HeaderDashboard';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectedAccess as selectSelectedAccess,
  selectRealAccessRoles,
} from '../../states/features/auth/authSelectors';

export const DashboardLayout = () => {
  const isPreload = useSelector((state) => state.isPreload);
  const selected = useSelector(selectSelectedAccess);
  const allowedRoles = useSelector(selectRealAccessRoles);

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
      <SidebarMenu />
      <main className='ml-64 flex-1 min-h-screen py-4 px-8 transition-all overflow-x-hidden'>
        <HeaderDashboard />
        <Outlet />
      </main>
    </div>
  );
};
