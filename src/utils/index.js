const STATUS_OPTIONS = [
  {
    id: 1,
    label: 'Dikontak',
  },
  {
    id: 2,
    label: 'Draft sudah dikirim oleh Mitra',
  },
  {
    id: 3,
    label: 'Sudah diperiksa oleh Mitra',
  },
  {
    id: 4,
    label: 'Finalisasi Oleh Mitra',
  },
  {
    id: 5,
    label: 'Sudah Diperiksa Oleh BCF',
  },
  {
    id: 6,
    label: 'Finalisasi Oleh BCF',
  },
  {
    id: 7,
    label: 'Ditanda Tangani Oleh Mitra',
  },
  {
    id: 8,
    label: 'Ditanda Tangani Oleh BCF',
  },
  {
    id: 9,
    label: 'Sudah Kirim Dokumen ke Mitra',
  },
  {
    id: 10,
    label: 'Selesai',
  },
  {
    id: 11,
    label: 'Perlu Follow Up',
  },
  {
    id: 12,
    label: 'Perlu Diperbarui',
  },
  {
    id: 13,
    label: 'Terminasi',
  },
];

// PROGRAM_OPTIONS (hardcode) DIHAPUS -- id-nya ('BCF': 7) tidak sinkron
// dengan data sungguhan di md_second_tier_program dan pernah menyebabkan
// penerbitan nomor surat gagal. Dropdown "Program" sekarang mengambil
// daftar dinamis dari back-end lewat asyncGetPrograms (lihat
// LetterNumberingField.jsx, UpdateLetterModal.jsx, dan modal Riset
// Potensial/Mitra untuk "Program LSD").

const BATCH_OPTIONS = [
  { id: 1, label: 'Batch 8' },
  { id: 2, label: 'Batch 9' },
  { id: 3, label: 'Batch 10' },
  { id: 4, label: 'Batch 11' },
];

const LETTER_OPTIONS = [
  { id: 1, label: 'Administrasi' },
  { id: 2, label: 'Finance' },
];

const formatDateInput = (dateString) => {
  if (!dateString) return '';
  // Check if matches DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  return dateString;
};

/**
 * Creates an array of numbers from start to end (inclusive)
 * @param {number} start - Starting number
 * @param {number} end - Ending number
 * @returns {number[]} Array of numbers
 */
const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export {
  STATUS_OPTIONS,
  BATCH_OPTIONS,
  LETTER_OPTIONS,
  formatDateInput,
  range,
};
