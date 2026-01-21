import { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AlertBox = ({ alertType, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [alertMessages, setAlertMessages] = useState(null);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    if (alertType === 'errorLogin') {
      setAlertMessages(
        <>
          Email dan kata sandi tidak cocok. Hubungi{' '}
          <strong>Super Admin.</strong>
        </>,
      );
    } else if (alertType === 'successCreate') {
      setAlertMessages(
        <>
          Selamat! Data baru yang kamu buat telah{' '}
          <strong>berhasil ditambahkan.</strong>
        </>,
      );
    } else if (alertType === 'successCopyLink') {
      setAlertMessages('Tautan berhasil disalin!');
    } else {
      setAlertMessages(
        <>
          Selamat! Data baru yang telah kamu perbarui{' '}
          <strong>berhasil disimpan.</strong>
        </>,
      );
    }

    const showTimer = setTimeout(() => setVisible(true), 10);

    const autoCloseTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [alertType, onClose]);

  return (
    <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
      <div
        className={`inline-flex items-center justify-between border ${
          alertType === 'errorLogin'
            ? 'border-red-400 bg-red-50 text-red-700'
            : 'border-[#28a745] bg-[#eaf6ec] text-[#28a745]'
        } px-4 py-2 rounded-lg shadow-md transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
      >
        <div className='flex items-center gap-2'>
          {alertType === 'errorLogin' ? (
            <AlertTriangle className='w-5 h-5 text-red-500' />
          ) : (
            <CheckCircle2 className='w-5 h-5 text-[#28a745]' />
          )}
          <p className='text-xs'>{alertMessages}</p>
        </div>
        <button
          onClick={handleClose}
          className={`${
            alertType === 'errorLogin'
              ? 'text-red-500 hover:text-red-700'
              : 'text-[#28a745] hover:text-[#24963e]'
          } cursor-pointer`}
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};
