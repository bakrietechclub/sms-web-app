import {
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
  
  export const sidebarMenus = {
    universitas: [
      { title: "Riset Mitra", icon: Search, submenu: ["Riset Potensial", "Riset Kolaborasi"] },
      { title: "Audiensi", icon: CalendarPlus2 },
      { title: "Grup Koordinasi", icon: Users },
      { title: "Legalitas Kerjasama", icon: MailOpen, submenu: ["MoU/PKS", "SPK/TOR", "IA"] },
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
      { title: "Legalitas Kerjasama", icon: MailOpen, submenu: ["MoU/PKS", "Tanda Kerjasama"] },
      { title: "Penomoran Surat", icon: MailPlus },
      { title: "Pemberitaan BCF", icon: FileText, submenu: ["Rekap Media", "Rekap Program"] },
      { title: "Rekap Kerjasama", icon: Clipboard },
      { title: "Partnership Awards", icon: Trophy },
    ],
    lembagaInternasional: [
      { title: "Riset Mitra", icon: Search, submenu: ["Riset Potensial", "Riset Kolaborasi"] },
      { title: "Audiensi", icon: CalendarPlus2 },
      { title: "Grup Koordinasi", icon: Users },
      { title: "Legalitas Kerjasama", icon: MailOpen, submenu: ["MoU/PKS", "SPK/TOR", "IA", "Tanda Kerjasama"] },
      { title: "Penomoran Surat", icon: MailPlus },
      { title: "Rekap Kerjasama", icon: Clipboard },
      { title: "Satisfaction Survey", icon: FileCheck },
      { title: "Partnership BCF", icon: Clipboard },
      { title: "Partnership Awards", icon: Trophy },
    ],
  };
  