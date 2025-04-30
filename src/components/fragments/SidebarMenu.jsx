import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStakeholder } from "../../features/stakeholder/activeStakeholderSlice";
import { sidebarMenus } from "../../config/sidebarMenus";
import { ChevronDown, ChevronUp } from "lucide-react";
import LogoBCF from "../../assets/img/logoBCF.png";
import clsx from "clsx";

export const SidebarMenu = () => {
  const dispatch = useDispatch();
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
      {/* Logo BCF */}
      <div className="flex items-center justify-center h-auto my-4">
        <img src={LogoBCF} alt="Logo BCF" className="h-15" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menus.map((menu, idx) => (
          <div key={idx} className="text-[#999999]">
            <div
              onClick={() => {
                if (openMenus.includes(menu.title)) {
                  setOpenMenus(
                    openMenus.filter((title) => title !== menu.title)
                  );
                } else {
                  setOpenMenus([...openMenus, menu.title]);
                }
              }}
              className={clsx(
                "flex items-center justify-between p-3 cursor-pointer focused:text-[#0D4690] hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200",
                openMenus === menu.title &&
                  "text-[#0D4690] font-semibold bg-[#E7EDF4]"
              )}
            >
              <div className="flex items-center gap-3">
                {menu.icon && <menu.icon size={20} />}
                <span className="text-sm font-medium">{menu.title}</span>
              </div>
              {menu.submenu &&
                (openMenus === menu.title ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                ))}
            </div>

            {menu.submenu && openMenus.includes(menu.title) && (
              <div className="flex flex-col px-11 gap-8 my-5">
                {menu.submenu.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    className="text-[#999999] hover:text-[#0D4690] text-sm font-medium cursor-pointer transition-all duration-200"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
