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
    {
      title: "Riset Mitra",
      icon: Search,
      submenu: [
        { title: "Riset Potensial", path: "/dashboard/univ" },
        { title: "Riset Kolaborasi", path: "/dashboard/univ/colab" },
      ],
    },
    { title: "Audiensi", icon: CalendarPlus2, path: "/dashboard/univ/audience" },
    { title: "Grup Koordinasi", icon: Users, path: "/dashboard/univ/coor-group" },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: [
        { title: "MoU/PKS", path: "/dashboard/univ/mou-pks" },
        { title: "SPK/TOR", path: "/dashboard/univ/spk-tor" },
        { title: "IA", path: "/dashboard/univ/ia" },
      ],
    },
    { title: "Penomoran Surat", icon: MailPlus, path: "/dashboard/univ/letter-numbering" },
    { title: "Rekap PTA", icon: Clipboard, path: "/dashboard/univ/pta-recap" },
    { title: "Satisfaction Survey", icon: FileCheck, path: "/dashboard/univ/satis-survey" },
    { title: "Partnership BCF", icon: Sheet, path: "/dashboard/univ/bcf-partner" },
    { title: "Partnership Awards", icon: Trophy, path: "/dashboard/univ/partner-awards" },
  ],

  media: [
    { title: "Riset Mitra", icon: Search, path: "/dashboard/media" },
    { title: "Audiensi", icon: CalendarPlus2, path: "/dashboard/media/audience" },
    { title: "Grup Koordinasi", icon: Users, path: "/dashboard/media/coor-group" },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: [
        { title: "MoU/PKS", path: "/dashboard/media/mou-pks" },
        { title: "Tanda Kerjasama", path: "/dashboard/media/coop-sign" },
      ],
    },
    { title: "Penomoran Surat", icon: MailPlus, path: "/dashboard/media/letter-numbering" },
    {
      title: "Pemberitaan BCF",
      icon: FileText,
      submenu: [
        { title: "Rekap Media", path: "/dashboard/media/media-recap" },
        { title: "Rekap Program", path: "/dashboard/media/program-recap" },
      ],
    },
    { title: "Rekap Kerjasama", icon: Clipboard, path: "/dashboard/media/colab-recap" },
    { title: "Partnership Awards", icon: Trophy, path: "/dashboard/media/bcf-partner" },
  ],

  lembagaInternasional: [
    {
      title: "Riset Mitra",
      icon: Search,
      submenu: [
        { title: "Riset Potensial", path: "/dashboard/ingo" },
        { title: "Riset Kolaborasi", path: "/dashboard/ingo/colab" },
      ],
    },
    { title: "Audiensi", icon: CalendarPlus2, path: "/dashboard/ingo/audience" },
    { title: "Grup Koordinasi", icon: Users, path: "/dashboard/ingo/coor-group" },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: [
        { title: "MoU/PKS", path: "/dashboard/ingo/mou-pks" },
        { title: "SPK/TOR", path: "/dashboard/ingo/spk-tor" },
        { title: "IA", path: "/dashboard/ingo/ia" },
        { title: "Tanda Kerjasama", path: "/dashboard/ingo/coop-sign" },
      ],
    },
    { title: "Penomoran Surat", icon: MailPlus, path: "/dashboard/ingo/letter-numbering" },
    { title: "Rekap Kerjasama", icon: Clipboard, path: "/dashboard/ingo/colab-recap" },
    { title: "Satisfaction Survey", icon: FileCheck, path: "/dashboard/ingo/satis-survey" },
    { title: "Partnership BCF", icon: Clipboard, path: "/dashboard/ingo/bcf-partner" },
    { title: "Partnership Awards", icon: Trophy, path: "/dashboard/ingo/partner-awards" },
  ],
};
