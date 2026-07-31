import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setActiveStakeholder } from '../../states/features/stakeholder/activeStakeholderSlice';
import { sidebarMenus } from '../../config/sidebarMenus';
import { ChevronRight, ChevronDown } from 'lucide-react';
import LogoBCF from '../../assets/img/logoBCF.png';
import { NavLink, useLocation } from 'react-router-dom';
import { selectedAccess } from '../../states/features/auth/authSelectors';
import { usePermission } from '../../hooks/usePermission';
import { SIDEBAR_PATH_PERMISSION } from '../../config/sidebarPermissions';

export const SidebarMenu = () => {
  const location = useLocation();
  const selectedRole = useSelector(selectedAccess);
  const { can, permissions } = usePermission();
  const [openMenus, setOpenMenus] = useState([]);

  // Grey-out (bukan hide) item yang permission VIEW-nya tidak dimiliki --
  // menu tanpa submenu di-disable langsung, menu dengan submenu di-disable
  // per-item di dalamnya (parent tetap terbuka kalau minimal 1 anak masih
  // bisa diakses).
  //
  // PENTING: di-memo, JANGAN dibuat ulang tiap render. `menus` dipakai
  // sebagai dependency useEffect di bawah (auto-buka submenu sesuai URL) --
  // kalau referensinya berubah terus tiap render, effect itu ikut nyala
  // terus dan menimpa openMenus tiap kali (termasuk saat user BARU SAJA
  // klik untuk membuka submenu lain) -- itu penyebab "glitch" saat pindah
  // antara Riset Mitra <-> Legalitas Kerjasama. `permissions` dari
  // usePermission() sudah stabil (di-memo di dalam hook-nya), jadi aman
  // dipakai sebagai dependency di sini.
  const menus = useMemo(
    () => (sidebarMenus[selectedRole] || []).map((menu) => {
      if (menu.submenu) {
        const submenu = menu.submenu.map((sub) => ({
          ...sub,
          disabled: !can(SIDEBAR_PATH_PERMISSION[sub.path]),
        }));
        return { ...menu, submenu, disabled: submenu.every((s) => s.disabled) };
      }
      return { ...menu, disabled: !can(SIDEBAR_PATH_PERMISSION[menu.path]) };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRole, permissions],
  );

  // UNTUK MEMBUKA SUB-MENU YANG AKTIF SAAT RELOAD
  // UNTUK MEMASTIKAN HANYA SATU SUB-MENU YANG TERBUKA SAAT LOAD
  useEffect(() => {
    const findParentMenu = (pathname) => {
      for (const menu of menus) {
        if (menu.submenu) {
          for (const sub of menu.submenu) {
            if (sub.path === pathname) {
              return menu.title;
            }
          }
        }
      }
      return null;
    };

    const parentMenuTitle = findParentMenu(location.pathname);
    if (parentMenuTitle && !openMenus.includes(parentMenuTitle)) {
      setOpenMenus([parentMenuTitle]); // BUAT MEMASTIKAN HANYA SATU YANG TERBUKA SAAT LOAD
    }
  }, [location.pathname, menus]); // HAPUS openMenus DARI DEPENDENCY UNTUK MENGATASI LOOP

  const isMainMenuActive = (menu) => {
    if (menu.path && location.pathname === menu.path) {
      return true;
    }
    if (
      menu.submenu &&
      menu.submenu.some((sub) => location.pathname === sub.path)
    ) {
      return true;
    }
    return false;
  };

  return (
    <aside className='w-64 h-screen bg-white border-r border-gray-300 fixed flex flex-col'>
      <div className='flex items-center justify-center h-auto my-4'>
        <img
          src={LogoBCF}
          alt='Logo BCF'
          className='h-12 w-28'
        />
      </div>
      {/* SIDEBAR MENU */}
      <nav>
        {menus?.map((menu, idx) => (
          <div
            key={idx}
            className='text-[#999999]'
          >
            {!menu.submenu ? ( // MENU TANPA SUBMENU
              <NavLink
                to={menu.disabled ? '#' : menu.path}
                onClick={(e) => {
                  if (menu.disabled) {
                    e.preventDefault();
                    return;
                  }
                  // NavLink DIKLIK SEMUA MENU AKAN TERTUTUP
                  setOpenMenus([]);
                }}
                title={menu.disabled ? 'Anda tidak memiliki izin untuk mengakses menu ini' : undefined}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-md transition-all duration-200 ${
                    menu.disabled
                      ? 'opacity-50 cursor-not-allowed pointer-events-none'
                      : 'cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690]'
                  } ${isActive && !menu.disabled ? 'text-[#0D4690] font-semibold bg-[#E7EDF4]' : ''}`
                }
              >
                <div className='flex items-center gap-3'>
                  {menu.icon && <menu.icon size={20} />}
                  <span className='text-base font-medium'>{menu.title}</span>
                </div>
              </NavLink>
            ) : (
              // MENU DENGAN SUBMENU
              <div
                onClick={() => {
                  if (menu.disabled) return;
                  // MENUTUP OTOMATIS MENU LAIN
                  setOpenMenus(
                    (prev) =>
                      prev.includes(menu.title)
                        ? prev.filter((title) => title !== menu.title) // TUTUP MENU JIKA SUDAH TERBUKA
                        : [menu.title], // KALAU BELUM, HANYA BUKA MENU INI
                  );
                }}
                title={menu.disabled ? 'Anda tidak memiliki izin untuk mengakses menu ini' : undefined}
                className={`flex items-center justify-between p-3 rounded-md transition-all duration-200 ${
                  menu.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690]'
                } ${
                  !menu.disabled && (openMenus.includes(menu.title) || isMainMenuActive(menu))
                    ? 'text-[#0D4690] font-semibold bg-[#E7EDF4]'
                    : ''
                }`}
              >
                <div className='flex items-center gap-3'>
                  {menu.icon && <menu.icon size={20} />}
                  <span className='text-base font-medium'>{menu.title}</span>
                </div>
                {menu.submenu &&
                  (openMenus.includes(menu.title) ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  ))}
              </div>
            )}

            {menu.submenu && openMenus.includes(menu.title) && (
              <div className='flex flex-col px-11 gap-4 my-3'>
                {menu.submenu.map((sub, subIdx) => (
                  <NavLink
                    key={subIdx}
                    to={sub.disabled ? '#' : sub.path}
                    onClick={(e) => sub.disabled && e.preventDefault()}
                    title={sub.disabled ? 'Anda tidak memiliki izin untuk mengakses menu ini' : undefined}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-all duration-200 ${
                        sub.disabled
                          ? 'opacity-50 cursor-not-allowed pointer-events-none text-[#999999]'
                          : isActive
                            ? 'text-[#0D4690] font-semibold'
                            : 'text-[#999999] hover:text-[#0D4690]'
                      }`
                    }
                  >
                    {sub.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
