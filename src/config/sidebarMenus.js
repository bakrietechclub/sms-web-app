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
        {
          title: "Riset Potensial",
          path: "/dashboard/research/potential-partner",
        },
        {
          title: "Riset Kolaborasi",
          path: "/dashboard/research/colab-partner",
        },
      ],
    },
    {
      title: "Audiensi",
      icon: CalendarPlus2,
      path: "/dashboard/audiences",
    },
    {
      title: "Grup Koordinasi",
      icon: Users,
      path: "/dashboard/group",
    },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: [
        { title: "MoU/PKS", path: "/dashboard/partnerships/mou-pks" },
        { title: "SPK/TOR", path: "/dashboard/partnerships/spk-tor" },
        {
          title: "IA",
          path: "/dashboard/partnerships/implementation-agreements",
        },
      ],
    },
    {
      title: "Penomoran Surat",
      icon: MailPlus,
      path: "/dashboard/letter-numbers",
    },
    { title: "Rekap PTA", icon: Clipboard, path: "/dashboard/recap/pta" },
    {
      title: "Satisfaction Survey",
      icon: FileCheck,
      path: "/dashboard/satisfaction-survey",
    },
    {
      title: "Partnership BCF",
      icon: Sheet,
      path: "/dashboard/bcf-partner",
    },
    {
      title: "Partnership Awards",
      icon: Trophy,
      path: "/dashboard/partner-awards",
    },
  ],

  media: [
    {
      title: "Riset Mitra",
      icon: Search,
      path: "/dashboard/research/partner",
    },
    {
      title: "Audiensi",
      icon: CalendarPlus2,
      path: "/dashboard/audiences",
    },
    {
      title: "Grup Koordinasi",
      icon: Users,
      path: "/dashboard/group",
    },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: [
        { title: "MoU/PKS", path: "/dashboard/partnerships/mou-pks" },
        { title: "Tanda Kerjasama", path: "/dashboard/partnerships/coop-sign" },
      ],
    },
    {
      title: "Penomoran Surat",
      icon: MailPlus,
      path: "/dashboard/letter-numbers",
    },
    {
      title: "Pemberitaan BCF",
      icon: FileText,
      submenu: [
        { title: "Rekap Media", path: "/dashboard/recap/media" },
        { title: "Rekap Program", path: "/dashboard/recap/program" },
      ],
    },
    {
      title: "Rekap Kerjasama",
      icon: Clipboard,
      path: "/dashboard/recap/colab",
    },
    {
      title: "Partnership BCF",
      icon: Sheet,
      path: "/dashboard/bcf-partner",
    },
  ],

  lembagaInternasional: [
    {
      title: "Riset Mitra",
      icon: Search,
      submenu: [
        {
          title: "Riset Potensial",
          path: "/dashboard/research/potential-partner",
        },
        {
          title: "Riset Kolaborasi",
          path: "/dashboard/research/colab-partner",
        },
      ],
    },
    {
      title: "Audiensi",
      icon: CalendarPlus2,
      path: "/dashboard/audiences",
    },
    {
      title: "Grup Koordinasi",
      icon: Users,
      path: "/dashboard/group",
    },
    {
      title: "Legalitas Kerjasama",
      icon: MailOpen,
      submenu: [
        { title: "MoU/PKS", path: "/dashboard/partnerships/mou-pks" },
        { title: "SPK/TOR", path: "/dashboard/partnerships/spk-tor" },
        {
          title: "IA",
          path: "/dashboard/partnerships/implementation-agreements",
        },
        { title: "Tanda Kerjasama", path: "/dashboard/partnerships/coop-sign" },
      ],
    },
    {
      title: "Penomoran Surat",
      icon: MailPlus,
      path: "/dashboard/letter-numbers",
    },
    {
      title: "Rekap Kerjasama",
      icon: Clipboard,
      path: "/dashboard/recap/colab",
    },
    {
      title: "Satisfaction Survey",
      icon: FileCheck,
      path: "/dashboard/satisfaction-survey",
    },
    {
      title: "Partnership BCF",
      icon: Sheet,
      path: "/dashboard/bcf-partner",
    },
    {
      title: "Partnership Awards",
      icon: Trophy,
      path: "/dashboard/partner-awards",
    },
  ],
};
