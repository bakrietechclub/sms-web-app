import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sidebarMenus = {
  universitas: [
    {
      title: 'Riset Mitra',
      submenu: ['Riset Potensial', 'Riset Kolaborasi']
    },
    { title: 'Audiensi' },
    { title: 'Grup Koordinasi' },
    {
      title: 'Legalitas Kerjasama',
      submenu: ['MoU/PKS', 'SPK/TOR', 'IA']
    },
    { title: 'Penomoran Surat' },
    { title: 'Rekap PTA' },
    { title: 'Satisfaction Survey' },
    { title: 'Partnership BCF' },
    { title: 'Partnership Awards' }
  ],
  media: [
    {
      title: 'Riset Mitra'
    },
    { title: 'Audiensi' },
    { title: 'Grup Koordinasi' },
    {
      title: 'Legalitas Kerjasama',
      submenu: ['MoU/PKS', 'Tanda Kerjasama']
    },
    { title: 'Penomoran Surat' },
    {
      title: 'Pemberitaan BCF',
      submenu: ['Rekap Media', 'Rekap Program']
    },
    { title: 'Rekap Kerjasama' },
    { title: 'Partnership BCF' },
    { title: 'Partnership Awards' }
  ],
  lembagaInternasional: [
    {
      title: 'Riset Mitra',
      submenu: ['Riset Potensial', 'Riset Kolaborasi']
    },
    { title: 'Audiensi' },
    { title: 'Grup Koordinasi' },
    {
      title: 'Legalitas Kerjasama',
      submenu: ['MoU/PKS', 'SPK/TOR', 'IA', 'Tanda Kerjasama']
    },
    { title: 'Penomoran Surat' },
    { title: 'Rekap Kerjasama' },
    { title: 'Satisfaction Survey' },
    { title: 'Partnership BCF' },
    { title: 'Partnership Awards' }
  ]
};

const Sidebar = () => {
  const { role } = useSelector(state => state.auth);
  const [openMenu, setOpenMenu] = useState('');

  const menus =
    role === 'universitas'
      ? sidebarMenus.universitas
      : role === 'media'
      ? sidebarMenus.media
      : sidebarMenus.lembagaInternasional;

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-4">
      <div className="flex flex-col gap-2">
        {menus.map((menu, idx) => (
          <div key={idx}>
            <div
              className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setOpenMenu(openMenu === menu.title ? '' : menu.title)}
            >
              <span>{menu.title}</span>
              {menu.submenu && (openMenu === menu.title ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </div>
            {menu.submenu && openMenu === menu.title && (
              <div className="ml-4 mt-1 flex flex-col gap-1">
                {menu.submenu.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    className="text-sm text-gray-700 cursor-pointer p-1 hover:bg-gray-200 rounded-md"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
