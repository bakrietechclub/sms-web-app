import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { STATUS_OPTIONS } from '../../utils';

// Warna badge per status -- dikelompokkan dari 13 status di md_ps_status
// supaya tetap gampang dipindai sekilas, tanpa perlu warna unik per status.
const STATUS_COLOR = {
  Selesai: 'bg-[#DFF2E3] text-[#28a745] focus:ring-[#28a745]',
  Terminasi: 'bg-[#Fae1e3] text-[#dc3545] focus:ring-[#dc3545]',
  'Perlu Follow Up': 'bg-[#FFF6da] text-[#ffc107] focus:ring-[#ffc107]',
  'Perlu Diperbarui': 'bg-[#FFF6da] text-[#ffc107] focus:ring-[#ffc107]',
};
const DEFAULT_COLOR = 'bg-[#dbe3ee] text-[#0D4690] focus:ring-[#0D4690]';

/**
 * Dropdown status kemitraan yang bisa langsung diubah dari halaman detail,
 * tanpa perlu buka form edit lengkap -- lihat asyncUpdateMouStatus /
 * asyncUpdatePksStatus (endpoint PATCH khusus status, tidak menyentuh field
 * lain).
 */
export const PartnershipStatusSelect = ({
  value,
  currentLabel,
  onChange,
  disabled,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const selectedId =
    value ?? STATUS_OPTIONS.find((opt) => opt.label === currentLabel)?.id;
  const colorClass = STATUS_COLOR[currentLabel] || DEFAULT_COLOR;

  const handleChange = async (e) => {
    const nextId = Number(e.target.value);
    if (nextId === selectedId) return;
    setIsSaving(true);
    try {
      await onChange(nextId);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='relative inline-flex items-center'>
      <select
        value={selectedId || ''}
        onChange={handleChange}
        disabled={disabled || isSaving}
        title={
          disabled
            ? 'Anda tidak memiliki izin untuk mengubah status ini'
            : 'Ubah status kemitraan'
        }
        className={`appearance-none text-sm font-medium rounded-md py-1.5 pl-2.5 pr-7 cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70 ${colorClass}`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option
            key={opt.id}
            value={opt.id}
          >
            {opt.label}
          </option>
        ))}
      </select>
      <span className='pointer-events-none absolute right-2 flex items-center'>
        {isSaving ? (
          <Loader2 className='w-3.5 h-3.5 animate-spin' />
        ) : (
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            aria-hidden='true'
          >
            <path
              d='M1 1L5 5L9 1'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default PartnershipStatusSelect;
