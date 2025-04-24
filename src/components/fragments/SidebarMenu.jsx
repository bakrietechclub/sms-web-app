import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  CalendarPlus2,
  Users,
  MailOpen,
  MailPlus,
  Clipboard,
  Sheet,
  FileCheck,
  Trophy,
} from "lucide-react";
import LogoBCF from "../../assets/img/logoBCF.png";
import clsx from "clsx";

const sidebarMenus = {
  universitas: [
    {
      title: "Riset Mitra",
      icon: Search,
      submenu: ["Riset Potensial", "Riset Kolaborasi"],
    },
    { title: "Audiensi", icon: CalendarPlus2 },
    { title: "Grup Koordinasi", icon: Users },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: ["MoU/PKS", "SPK/TOR", "IA"],
    },
    { title: "Penomoran Surat", icon: MailPlus },
    { title: "Rekap PTA", icon: Clipboard },
    { title: "Satisfaction Survey", icon: FileCheck },
    { title: "Partnership BCF", icon: Sheet },
    { title: "Partnership Awards", icon: Trophy },
  ],
  media: [
    { title: "Riset Mitra", icon: Search },
    { title: "Audiensi", icon: CalendarPlus2 },
    { title: "Grup Koordinasi", icon: Users },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: ["MoU/PKS", "Tanda Kerjasama"],
    },
    { title: "Penomoran Surat", icon: MailPlus },
    {
      title: "Pemberitaan BCF",
      icon: FileText,
      submenu: ["Rekap Media", "Rekap Program"],
    },
    { title: "Rekap Kerjasama", icon: Clipboard },
    { title: "Partnership Awards", icon: Trophy },
  ],
  lembagaInternasional: [
    {
      title: "Riset Mitra",
      icon: Search,
      submenu: ["Riset Potensial", "Riset Kolaborasi"],
    },
    { title: "Audiensi", icon: CalendarPlus2 },
    { title: "Grup Koordinasi", icon: Users },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: ["MoU/PKS", "SPK/TOR", "IA", "Tanda Kerjasama"],
    },
    { title: "Penomoran Surat", icon: MailPlus },
    { title: "Rekap Kerjasama", icon: Clipboard },
    { title: "Satisfaction Survey", icon: FileCheck },
    { title: "Partnership BCF", icon: Clipboard },
    { title: "Partnership Awards", icon: Trophy },
  ],
};

export const SidebarMenu = () => {
  const { role } = useSelector((state) => state.auth.user);
  const [openMenu, setOpenMenu] = useState("");

  const menus =
    sidebarMenus[
      role?.toLowerCase()?.includes("media")
        ? "media"
        : role?.toLowerCase()?.includes("ingo")
        ? "lembagaInternasional"
        : "universitas"
    ];

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
              onClick={() =>
                setOpenMenu(openMenu === menu.title ? "" : menu.title)
              }
              className={clsx(
                "flex items-center justify-between p-3 cursor-pointer focused:text-[#0D4690] hover:bg-[#E7EDF4] hover:text-[#0D4690] rounded-md transition-all duration-200",
                openMenu === menu.title &&
                  "text-[#0D4690] font-semibold bg-[#E7EDF4]"
              )}
            >
              <div className="flex items-center gap-3">
                {menu.icon && <menu.icon size={20} />}
                <span className="text-sm font-medium">{menu.title}</span>
              </div>
              {menu.submenu &&
                (openMenu === menu.title ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                ))}
            </div>

            {menu.submenu && openMenu === menu.title && (
              <div className="pl-10 flex flex-col gap-2 py-2">
                {menu.submenu.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    className="text-[#999999] hover:text-[#0D4690] text-sm cursor-pointer transition-all duration-200"
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
