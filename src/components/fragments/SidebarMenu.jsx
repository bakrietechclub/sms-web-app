import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStakeholder } from "../../features/stakeholder/activeStakeholderSlice";
import { sidebarMenus } from "../../config/sidebarMenus";
import { ChevronRight, ChevronDown } from "lucide-react";
import LogoBCF from "../../assets/img/logoBCF.png";
import { NavLink, useLocation } from "react-router-dom";

export const SidebarMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeStakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder
  );
  const [openMenus, setOpenMenus] = useState([]);

  useEffect(() => {
    const storedStakeholder = localStorage.getItem("activeStakeholder");
    if (storedStakeholder) {
      dispatch(setActiveStakeholder(storedStakeholder));
    }
  }, [dispatch]);

  const menus = sidebarMenus[activeStakeholder || "universitas"];

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
    <aside className="w-64 h-screen bg-white border-r border-gray-300 fixed flex flex-col">
      <div className="flex items-center justify-center h-auto my-4">
        <img src={LogoBCF} alt="Logo BCF" className="h-12 w-28" />
      </div>
      {/* SIDEBAR MENU */}
      <nav>
        {menus.map((menu, idx) => (
          <div key={idx} className="text-[#999999]">
            {!menu.submenu ? ( // MENU TANPA SUBMENU
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200 ${
                    isActive ? "text-[#0D4690] font-semibold bg-[#E7EDF4]" : ""
                  }`
                }
                // NavLink DIKLIK SEMUA MENU AKAN TERTUTUP
                onClick={() => setOpenMenus([])}
              >
                <div className="flex items-center gap-3">
                  {menu.icon && <menu.icon size={20} />}
                  <span className="text-base font-medium">{menu.title}</span>
                </div>
              </NavLink>
            ) : (
              // MENU DENGAN SUBMENU
              <div
                onClick={() => {
                  // MENUTUP OTOMATIS MENU LAIN
                  setOpenMenus(
                    (prev) =>
                      prev.includes(menu.title)
                        ? prev.filter((title) => title !== menu.title) // TUTUP MENU JIKA SUDAH TERBUKA
                        : [menu.title] // KALAU BELUM, HANYA BUKA MENU INI
                  );
                }}
                className={`flex items-center justify-between p-3 cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200 ${
                  openMenus.includes(menu.title) || isMainMenuActive(menu)
                    ? "text-[#0D4690] font-semibold bg-[#E7EDF4]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {menu.icon && <menu.icon size={20} />}
                  <span className="text-base font-medium">{menu.title}</span>
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
              <div className="flex flex-col px-11 gap-4 my-3">
                {menu.submenu.map((sub, subIdx) => (
                  <NavLink
                    key={subIdx}
                    to={sub.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-[#0D4690] font-semibold"
                          : "text-[#999999] hover:text-[#0D4690]"
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
