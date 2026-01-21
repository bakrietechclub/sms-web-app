import { useState, useEffect } from 'react';
import { X, Calendar, FileText } from 'lucide-react';

const sampleNotifications = [
  {
    id: 1,
    type: 'audiensis',
    title: 'Audiensi',
    description:
      'anda dengan Universitas Indonesia akan dilaksanakan pada tanggal 05/11/2024.',
    date: '28 Oktober 2024',
    isRead: false,
  },
  {
    id: 2,
    type: 'mou',
    title: 'MoU',
    description:
      'dengan Politeknik Negeri Jakarta akan segera berakhir. Hubungi mitra untuk perbarui kerja sama.',
    date: '28 Oktober 2024',
    isRead: false,
  },
  {
    id: 3,
    type: 'audiensis',
    title: 'Audiensi',
    description:
      'anda dengan Universitas Indonesia akan dilaksanakan pada tanggal 05/11/2024.',
    date: '28 Oktober 2024',
    isRead: false,
  },
  {
    id: 4,
    type: 'mou',
    title: 'MoU',
    description:
      'dengan Politeknik Negeri Jakarta akan segera berakhir. Hubungi mitra untuk perbarui kerja sama.',
    date: '28 Oktober 2024',
    isRead: false,
  },
  {
    id: 5,
    type: 'audiensis',
    title: 'Audiensi',
    description:
      'anda dengan Universitas Indonesia akan dilaksanakan pada tanggal 05/11/2024.',
    date: '28 Oktober 2024',
    isRead: false,
  },
  {
    id: 6,
    type: 'mou',
    title: 'MoU',
    description:
      'dengan Politeknik Negeri Jakarta akan segera berakhir. Hubungi mitra untuk perbarui kerja sama.',
    date: '28 Oktober 2024',
    isRead: false,
  },
];

const NotificationsModal = ({ isOpen, onClose, updateUnreadCount }) => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  useEffect(() => {
    if (updateUnreadCount) {
      updateUnreadCount(notifications);
    }
  }, [notifications, updateUnreadCount]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 z-40 bg-black opacity-40'
        onClick={onClose}
      />
      <div className='fixed top-0 right-0 h-screen w-110 bg-white z-50 shadow-xl rounded-l-xl'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-6 border-b border-gray-200'>
          <h2 className='text-xl font-bold text-gray-900'>Notifikasi</h2>
          <button
            onClick={onClose}
            className='p-1 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X
              size={20}
              className='text-gray-700'
            />
          </button>
        </div>

        {/* Date Label */}
        <div className='relative text-center py-2 border-b border-gray-100'>
          <hr className='absolute top-1/2 left-0 w-full border-t border-gray-200 -z-10' />
          <span className='bg-white px-3 text-sm text-gray-400'>
            28 Oktober 2024
          </span>
        </div>

        {/* Notification List */}
        <div className='overflow-y-auto h-[calc(100vh-108px)]'>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className='px-5 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors'
              onClick={() => markAsRead(notif.id)}
            >
              <div className='flex items-start space-x-3'>
                <div className='relative flex-shrink-0'>
                  <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                    {notif.type === 'audiensis' ? (
                      <Calendar
                        size={16}
                        className='text-blue-600'
                      />
                    ) : (
                      <FileText
                        size={16}
                        className='text-blue-600'
                      />
                    )}
                  </div>
                  {!notif.isRead && (
                    <div className='absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full' />
                  )}
                </div>
                <div className='text-sm'>
                  <p className='leading-snug'>
                    <span
                      className={`font-semibold ${
                        notif.isRead ? 'text-black' : 'text-[#0D4690]'
                      }`}
                    >
                      {notif.title}
                    </span>{' '}
                    <span
                      className={`${
                        notif.isRead ? 'text-black' : 'text-[#3B82F6]'
                      }`}
                    >
                      {notif.description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationsModal;
