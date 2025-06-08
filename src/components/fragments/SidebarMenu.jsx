import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStakeholder } from "../../features/stakeholder/activeStakeholderSlice";
import { sidebarMenus } from "../../config/sidebarMenus";
import { ChevronDown, ChevronUp } from "lucide-react";
import LogoBCF from "../../assets/img/logoBCF.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

export const SidebarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // Efek samping untuk membuka sub-menu jika ada sub-menu aktif saat memuat ulang
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
      setOpenMenus([parentMenuTitle]); // Ubah ini untuk memastikan hanya satu yang terbuka saat load
    }
  }, [location.pathname, menus]); // Hapus openMenus dari dependency untuk menghindari loop

  // Fungsi pembantu untuk menentukan apakah menu utama aktif
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

      <nav>
        {menus.map((menu, idx) => (
          <div key={idx} className="text-[#999999]">
            {!menu.submenu ? (
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center justify-between p-3 cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200",
                    isActive && "text-[#0D4690] font-semibold bg-[#E7EDF4]"
                  )
                }
                // Saat NavLink diklik, pastikan semua menu lain ditutup
                onClick={() => setOpenMenus([])}
              >
                <div className="flex items-center gap-3">
                  {menu.icon && <menu.icon size={20} />}
                  <span className="text-base font-medium">{menu.title}</span>
                </div>
              </NavLink>
            ) : (
              <div
                onClick={() => {
                  // Logika untuk menutup otomatis menu lain
                  setOpenMenus(
                    (prev) =>
                      prev.includes(menu.title)
                        ? prev.filter((title) => title !== menu.title) // Jika sudah terbuka, tutup
                        : [menu.title] // Jika belum terbuka, buka hanya menu ini dan tutup yang lain
                  );
                }}
                className={clsx(
                  "flex items-center justify-between p-3 cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200",
                  (openMenus.includes(menu.title) || isMainMenuActive(menu)) &&
                    "text-[#0D4690] font-semibold bg-[#E7EDF4]"
                )}
              >
                <div className="flex items-center gap-3">
                  {menu.icon && <menu.icon size={20} />}
                  <span className="text-base font-medium">{menu.title}</span>
                </div>
                {menu.submenu &&
                  (openMenus.includes(menu.title) ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
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
                      clsx(
                        "text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-[#0D4690] font-semibold"
                          : "text-[#999999] hover:text-[#0D4690]"
                      )
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
