import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { STATUS_OPTIONS } from '../../utils';
import { getPartnershipStatusVariant } from '../../utils/partnershipStatusVariant';

// Warna dropdown mengikuti getPartnershipStatusVariant -- sumber tunggal
// yang sama dipakai <Label> di MoU/PKS/TOR/SPK/IA (lihat
// utils/partnershipStatusVariant.js). Sebelumnya file ini punya STATUS_COLOR
// sendiri yang gampang menyimpang dari label lain kalau salah satu diubah
// tanpa yang lain.
const VARIANT_CLASS = {
  success: 'bg-[#DFF2E3] text-[#28a745] focus:ring-[#28a745]',
  warning: 'bg-[#FFF6da] text-[#ffc107] focus:ring-[#ffc107]',
  danger: 'bg-[#Fae1e3] text-[#dc3545] focus:ring-[#dc3545]',
  info: 'bg-[#dbf7fd] text-[#0Dcaf0] focus:ring-[#0Dcaf0]',
  white: 'bg-[#e6e6e6] text-[#999999] focus:ring-[#999999]',
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
  const colorClass = VARIANT_CLASS[getPartnershipStatusVariant(currentLabel)] || DEFAULT_COLOR;

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
