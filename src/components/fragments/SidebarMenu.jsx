import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStakeholder } from "../../features/stakeholder/activeStakeholderSlice";
import { sidebarMenus } from "../../config/sidebarMenus";
import { ChevronDown, ChevronUp } from "lucide-react";
import LogoBCF from "../../assets/img/logoBCF.png";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

export const SidebarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-300 fixed flex flex-col">
      <div className="flex items-center justify-center h-auto my-4">
        <img src={LogoBCF} alt="Logo BCF" className="h-12 w-28" />
      </div>

      <nav>
        {menus.map((menu, idx) => (
          <div key={idx} className="text-[#999999]">
            <div
              onClick={() => {
                if (menu.submenu) {
                  setOpenMenus((prev) =>
                    prev.includes(menu.title)
                      ? prev.filter((title) => title !== menu.title)
                      : [...prev, menu.title]
                  );
                } else if (menu.path) {
                  navigate(menu.path);
                }
              }}
              className={clsx(
                "flex items-center justify-between p-3 cursor-pointer hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200",
                openMenus.includes(menu.title) && "text-[#0D4690] font-semibold bg-[#E7EDF4]"
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

            {menu.submenu && openMenus.includes(menu.title) && (
              <div className="flex flex-col px-11 gap-4 my-3">
                {menu.submenu.map((sub, subIdx) => (
                  <NavLink
                    key={subIdx}
                    to={sub.path}
                    className={({ isActive }) =>
                      clsx(
                        "text-sm font-medium transition-all duration-200",
                        isActive ? "text-[#0D4690] font-semibold" : "text-[#999999] hover:text-[#0D4690]"
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
