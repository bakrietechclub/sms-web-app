import { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setActiveStakeholder } from '../../states/features/stakeholder/activeStakeholderSlice';
import { sidebarMenus } from '../../config/sidebarMenus';
import { ChevronRight, ChevronDown, ChevronLeft, X } from 'lucide-react';
import LogoBCF from '../../assets/img/logoBCF.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { selectedAccess } from '../../states/features/auth/authSelectors';
import { usePermission } from '../../hooks/usePermission';
import { SIDEBAR_PATH_PERMISSION } from '../../config/sidebarPermissions';

export const SidebarMenu = ({
  isCollapsed = false,
  onToggleCollapse = () => {},
  isMobileOpen = false,
  onCloseMobile = () => {},
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRole = useSelector(selectedAccess);
  const { can, permissions } = usePermission();
  const [openMenus, setOpenMenus] = useState([]);
  // Menu yang submenunya sedang ditampilkan sebagai flyout (mode collapse) --
  // supaya anak-anak menu tetap bisa diakses walau labelnya tidak terlihat.
  // Disimpan beserta posisi (dari getBoundingClientRect) karena flyout
  // di-render `fixed` supaya tidak terpotong oleh `overflow-y-auto` pada nav.
  const [flyoutMenu, setFlyoutMenu] = useState(null);
  const flyoutCloseTimer = useRef(null);

  const clearFlyoutCloseTimer = () => {
    if (flyoutCloseTimer.current) {
      clearTimeout(flyoutCloseTimer.current);
      flyoutCloseTimer.current = null;
    }
  };

  const openFlyout = (title, targetEl) => {
    clearFlyoutCloseTimer();
    const rect = targetEl.getBoundingClientRect();
    setFlyoutMenu({ title, top: rect.top, left: rect.right });
  };

  // Delay kecil supaya kursor sempat "menyeberang" dari item ke panel
  // flyout tanpa panelnya keburu tertutup.
  const scheduleCloseFlyout = () => {
    clearFlyoutCloseTimer();
    flyoutCloseTimer.current = setTimeout(() => setFlyoutMenu(null), 150);
  };

  // Sidebar mengecil jadi ikon saja (desktop) -- submenu tidak masuk akal
  // ditampilkan dalam mode ini, jadi tutup semua saat collapse diaktifkan.
  useEffect(() => {
    if (isCollapsed) setOpenMenus([]);
    else {
      setFlyoutMenu(null);
      clearFlyoutCloseTimer();
    }
  }, [isCollapsed]);

  // Tutup drawer mobile setiap kali pindah halaman.
  useEffect(() => {
    onCloseMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
    <>
      {/* OVERLAY -- hanya tampil di mobile saat drawer terbuka */}
      {isMobileOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-30 md:hidden'
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`h-screen bg-white border-r border-gray-300 fixed flex flex-col z-40 transition-all duration-300 ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } w-64 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* TOMBOL COLLAPSE -- DESKTOP ONLY, NEMPEL DI TEPI SIDEBAR */}
        <button
          type='button'
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          className='hidden md:flex items-center justify-center absolute -right-3 top-8 w-6 h-6 rounded-full bg-white border border-gray-300 text-[#999999] shadow-sm hover:text-[#0D4690] hover:border-[#0D4690] transition-all duration-200 z-50'
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className='flex items-center justify-between h-auto my-4 px-3'>
          <div className='flex-1 flex items-center justify-center'>
            {!isCollapsed && (
              <img
                src={LogoBCF}
                alt='Logo BCF'
                className='h-12 w-28'
              />
            )}
          </div>
          {/* TOMBOL TUTUP -- MOBILE ONLY */}
          <button
            type='button'
            onClick={onCloseMobile}
            className='md:hidden p-1 text-gray-500 hover:text-[#0D4690]'
          >
            <X size={20} />
          </button>
        </div>

        {/* SIDEBAR MENU */}
        <nav className='flex-1 overflow-y-auto overflow-x-hidden'>
          {menus?.map((menu, idx) => (
            <div
              key={idx}
              className='relative text-[#999999]'
              onMouseEnter={(e) => {
                if (isCollapsed && menu.submenu) openFlyout(menu.title, e.currentTarget);
              }}
              onMouseLeave={() => {
                if (isCollapsed && menu.submenu) scheduleCloseFlyout();
              }}
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
                  title={
                    menu.disabled
                      ? 'Anda tidak memiliki izin untuk mengakses menu ini'
                      : isCollapsed
                        ? menu.title
                        : undefined
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                      isCollapsed ? 'justify-center' : 'justify-between'
                    } ${
                      menu.disabled
                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                        : 'cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690]'
                    } ${isActive && !menu.disabled ? 'text-[#0D4690] font-semibold bg-[#E7EDF4]' : ''}`
                  }
                >
                  <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    {menu.icon && <menu.icon size={20} />}
                    {!isCollapsed && <span className='text-base font-medium'>{menu.title}</span>}
                  </div>
                </NavLink>
              ) : (
                // MENU DENGAN SUBMENU
                <div
                  onClick={() => {
                    if (menu.disabled) return;
                    if (isCollapsed) {
                      // MODE COLLAPSE: KALAU MENU PUNYA HALAMAN RINGKASAN
                      // SENDIRI, KLIK LANGSUNG KE SANA -- AKSES KE SUBMENU
                      // TETAP TERSEDIA LEWAT FLYOUT SAAT HOVER.
                      if (menu.path) navigate(menu.path);
                      return;
                    }
                    // MENUTUP OTOMATIS MENU LAIN
                    setOpenMenus(
                      (prev) =>
                        prev.includes(menu.title)
                          ? prev.filter((title) => title !== menu.title) // TUTUP MENU JIKA SUDAH TERBUKA
                          : [menu.title], // KALAU BELUM, HANYA BUKA MENU INI
                    );
                    // Menu dengan `path` (mis. "Legalitas Kerjasama") punya
                    // halaman ringkasan sendiri (diagram alur) selain submenu
                    // -- klik labelnya membuka halaman itu sekaligus.
                    if (menu.path) navigate(menu.path);
                  }}
                  title={
                    menu.disabled
                      ? 'Anda tidak memiliki izin untuk mengakses menu ini'
                      : isCollapsed
                        ? menu.title
                        : undefined
                  }
                  className={`flex items-center p-3 rounded-md transition-all duration-200 ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    menu.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690]'
                  } ${
                    !menu.disabled && (openMenus.includes(menu.title) || isMainMenuActive(menu))
                      ? 'text-[#0D4690] font-semibold bg-[#E7EDF4]'
                      : ''
                  }`}
                >
                  <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    {menu.icon && <menu.icon size={20} />}
                    {!isCollapsed && <span className='text-base font-medium'>{menu.title}</span>}
                  </div>
                  {!isCollapsed &&
                    menu.submenu &&
                    (openMenus.includes(menu.title) ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    ))}
                </div>
              )}

              {!isCollapsed && menu.submenu && openMenus.includes(menu.title) && (
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

          {/* FLYOUT SUBMENU -- MODE COLLAPSE, MUNCUL SAAT HOVER SUPAYA ANAK
              MENU TETAP BISA DIAKSES WALAU LABEL TIDAK TERLIHAT. Di-render
              `fixed` (bukan `absolute`) di luar nav yang scrollable supaya
              tidak terpotong oleh overflow-y-auto. */}
          {isCollapsed && flyoutMenu && (
            <div
              style={{ top: flyoutMenu.top, left: flyoutMenu.left + 8 }}
              className='fixed min-w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50'
              onMouseEnter={clearFlyoutCloseTimer}
              onMouseLeave={scheduleCloseFlyout}
            >
              <div className='px-4 py-1 text-sm font-semibold text-[#0D4690] border-b border-gray-100 mb-1'>
                {flyoutMenu.title}
              </div>
              <div className='flex flex-col gap-1'>
                {menus
                  .find((menu) => menu.title === flyoutMenu.title)
                  ?.submenu.map((sub, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={sub.disabled ? '#' : sub.path}
                      onClick={(e) => sub.disabled && e.preventDefault()}
                      title={sub.disabled ? 'Anda tidak memiliki izin untuk mengakses menu ini' : undefined}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          sub.disabled
                            ? 'opacity-50 cursor-not-allowed pointer-events-none text-[#999999]'
                            : isActive
                              ? 'text-[#0D4690] font-semibold bg-[#E7EDF4]'
                              : 'text-[#999999] hover:text-[#0D4690] hover:bg-[#E7EDF4]'
                        }`
                      }
                    >
                      {sub.title}
                    </NavLink>
                  ))}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};
