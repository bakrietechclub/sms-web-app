import { createPortal } from 'react-dom';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Info,
  Loader2,
  X,
} from 'lucide-react';

// Palet & ikon per varian -- konsisten dengan warna Label (elements/Label.jsx)
// dan pesan error yang sebelumnya tampil sebagai banner inline di form.
const VARIANTS = {
  error: {
    icon: AlertTriangle,
    iconWrap: 'bg-[#FDECEC] text-[#DC3545]',
    confirmBtn: 'bg-[#DC3545] hover:bg-[#c82333]',
  },
  warning: {
    icon: AlertTriangle,
    iconWrap: 'bg-[#FFF6da] text-[#B9660A]',
    confirmBtn: 'bg-[#0D4690] hover:bg-blue-800',
  },
  success: {
    icon: CheckCircle2,
    iconWrap: 'bg-[#DFF2E3] text-[#28a745]',
    confirmBtn: 'bg-[#0D4690] hover:bg-blue-800',
  },
  info: {
    icon: Info,
    iconWrap: 'bg-[#E7EDF4] text-[#0D4690]',
    confirmBtn: 'bg-[#0D4690] hover:bg-blue-800',
  },
  confirm: {
    icon: HelpCircle,
    iconWrap: 'bg-[#E7EDF4] text-[#0D4690]',
    confirmBtn: 'bg-[#0D4690] hover:bg-blue-800',
  },
};

/**
 * Modal alert/confirm generik -- satu komponen dipakai untuk dua kasus:
 *   - ALERT (cuma info sepihak, mis. pesan error submit gagal): jangan
 *     kirim `onConfirm` -> cuma tombol "Tutup" yang tampil.
 *   - CONFIRM (butuh persetujuan user sebelum aksi destruktif/penting,
 *     mis. hapus data): kirim `onConfirm` -> tombol "Batal" + tombol aksi
 *     tampil berdampingan.
 *
 * Di-render lewat portal ke document.body -- supaya aman dipanggil dari
 * dalam form manapun (mis. dari dalam form Tambah MoU/PKS/IA/SPK untuk
 * menampilkan error submit) tanpa risiko form bersarang, pelajaran dari bug
 * nomor surat sebelumnya (lihat AddModalLetterNumbering.jsx).
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title?: string,
 *   message: string,
 *   variant?: 'error' | 'warning' | 'success' | 'info' | 'confirm',
 *   confirmText?: string,
 *   cancelText?: string,
 *   onConfirm?: () => void,
 *   isConfirming?: boolean,
 * }} props
 */
export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
  confirmText,
  cancelText = 'Batal',
  onConfirm,
  isConfirming = false,
}) {
  if (!isOpen) return null;

  const isConfirmMode = typeof onConfirm === 'function';
  const config = VARIANTS[variant] || VARIANTS.info;
  const Icon = config.icon;
  const resolvedTitle =
    title ||
    (isConfirmMode
      ? 'Konfirmasi'
      : variant === 'error'
        ? 'Terjadi Kesalahan'
        : variant === 'success'
          ? 'Berhasil'
          : 'Informasi');

  return createPortal(
    <>
      <div
        className='fixed inset-0 z-[80] bg-black opacity-40'
        onClick={onClose}
      />
      <div className='fixed inset-0 z-[90] flex items-center justify-center p-4'>
        <div
          role='dialog'
          aria-modal='true'
          aria-labelledby='alert-modal-title'
          className='bg-white w-full max-w-sm rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='px-5 pt-5 pb-2 flex items-start justify-between gap-3'>
            <div className='flex items-start gap-3'>
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.iconWrap}`}
              >
                <Icon size={20} />
              </div>
              <div>
                <h2
                  id='alert-modal-title'
                  className='text-base font-semibold text-gray-800'
                >
                  {resolvedTitle}
                </h2>
                <p className='mt-1 text-sm text-gray-600 whitespace-pre-line'>
                  {message}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg flex-shrink-0'
              aria-label='Close'
            >
              <X size={18} />
            </button>
          </div>

          <div className='px-5 py-4 flex justify-end gap-2'>
            {isConfirmMode && (
              <button
                type='button'
                onClick={onClose}
                disabled={isConfirming}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {cancelText}
              </button>
            )}
            <button
              type='button'
              onClick={isConfirmMode ? onConfirm : onClose}
              disabled={isConfirming}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[90px] justify-center ${config.confirmBtn}`}
            >
              {isConfirming ? (
                <Loader2
                  size={16}
                  className='animate-spin'
                />
              ) : (
                confirmText || (isConfirmMode ? 'Ya, Lanjutkan' : 'Tutup')
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
