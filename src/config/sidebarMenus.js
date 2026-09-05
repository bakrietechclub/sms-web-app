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
  Settings2,
} from 'lucide-react';

export const sidebarMenus = {
  'LSD-SMS': [
    {
      title: 'Riset Mitra',
      icon: Search,
      submenu: [
        {
          title: 'Riset Rekomendasi',
          path: '/research/potential-recommendations',
        },
        {
          title: 'Riset Potensial',
          path: '/research/potential-partner',
        },
        {
          title: 'Riset Kolaborasi',
          path: '/research/colab-partner',
        },
      ],
    },
    {
      title: 'Audiensi',
      icon: CalendarPlus2,
      path: '/audiences',
    },
    {
      title: 'Grup Koordinasi',
      icon: Users,
      path: '/groups',
    },
    {
      title: 'Legalitas Kerjasama',
      icon: MailOpen,
      path: '/partnerships',
      submenu: [
        { title: 'MoU', path: '/partnerships/mou' },
        { title: 'PKS', path: '/partnerships/pks' },
        {
          title: 'IA',
          path: '/partnerships/implementation-agreements',
        },
        { title: 'TOR', path: '/partnerships/tor' },
        { title: 'SPK', path: '/partnerships/spk' },
      ],
    },
    {
      title: 'Penomoran Surat',
      icon: MailPlus,
      path: '/letter-numbers',
    },
    {
      title: 'Klasifikasi Surat',
      icon: Settings2,
      path: '/letter-classifications',
    },
    // { title: 'Rekap PTA', icon: Clipboard, path: '/recap/pta' },
    // {
    //   title: 'Satisfaction Survey',
    //   icon: FileCheck,
    //   path: '/satisfaction-survey',
    // },
    // {
    //   title: 'Partnership BCF',
    //   icon: Sheet,
    //   path: '/bcf-partner',
    // },
    // {
    //   title: 'Partnership Awards',
    //   icon: Trophy,
    //   path: '/partner-awards',
    // },
  ],

  'SCP-SMS': [
    {
      title: 'Riset Mitra',
      icon: Search,
      path: '/research/potential-partner',
    },
    {
      title: 'Audiensi',
      icon: CalendarPlus2,
      path: '/audiences',
    },
    {
      title: 'Grup Koordinasi',
      icon: Users,
      path: '/groups',
    },
    {
      title: 'Legalitas Kerjasama',
      icon: MailOpen,
      path: '/partnerships',
      submenu: [
        { title: 'MoU', path: '/partnerships/mou' },
        { title: 'PKS', path: '/partnerships/pks' },
        // { title: 'Tanda Kerjasama', path: '/partnerships/coop-sign' },
      ],
    },
    {
      title: 'Penomoran Surat',
      icon: MailPlus,
      path: '/letter-numbers',
    },
    {
      title: 'Klasifikasi Surat',
      icon: Settings2,
      path: '/letter-classifications',
    },
    // {
    //   title: 'Pemberitaan BCF',
    //   icon: FileText,
    //   submenu: [
    //     { title: 'Rekap Media', path: '/recap/media' },
    //     { title: 'Rekap Program', path: '/recap/program' },
    //   ],
    // },
    // {
    //   title: 'Rekap Kerjasama',
    //   icon: Clipboard,
    //   path: '/recap/colab',
    // },
    // {
    //   title: 'Partnership BCF',
    //   icon: Sheet,
    //   path: '/bcf-partner',
    // },
  ],

  'SDI-SMS': [
    {
      title: 'Riset Mitra',
      icon: Search,
      submenu: [
        {
          title: 'Riset Potensial',
          path: '/research/potential-partner',
        },
        {
          title: 'Riset Kolaborasi',
          path: '/research/colab-partner',
        },
      ],
    },
    {
      title: 'Audiensi',
      icon: CalendarPlus2,
      path: '/audiences',
    },
    {
      title: 'Grup Koordinasi',
      icon: Users,
      path: '/groups',
    },
    {
      title: 'Legalitas Kerjasama',
      icon: MailOpen,
      path: '/partnerships',
      submenu: [
        { title: 'MoU', path: '/partnerships/mou' },
        { title: 'PKS', path: '/partnerships/pks' },
        {
          title: 'IA',
          path: '/partnerships/implementation-agreements',
        },
        { title: 'TOR', path: '/partnerships/tor' },
        { title: 'SPK', path: '/partnerships/spk' },
        // { title: 'Tanda Kerjasama', path: '/partnerships/coop-sign' },
      ],
    },
    {
      title: 'Penomoran Surat',
      icon: MailPlus,
      path: '/letter-numbers',
    },
    {
      title: 'Klasifikasi Surat',
      icon: Settings2,
      path: '/letter-classifications',
    },
    // {
    //   title: 'Rekap Kerjasama',
    //   icon: Clipboard,
    //   path: '/recap/colab',
    // },
    // {
    //   title: 'Satisfaction Survey',
    //   icon: FileCheck,
    //   path: '/satisfaction-survey',
    // },
    // {
    //   title: 'Partnership BCF',
    //   icon: Sheet,
    //   path: '/bcf-partner',
    // },
    // {
    //   title: 'Partnership Awards',
    //   icon: Trophy,
    //   path: '/partner-awards',
    // },
  ],
};
