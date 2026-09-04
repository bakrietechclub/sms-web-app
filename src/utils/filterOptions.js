/**
 * Mendefinisikan semua opsi filter yang mungkin.
 * Menggunakan objek untuk memetakan peran pengguna ke opsi filter mereka.
 *
 * PENTING: `value` di sini BUKAN cuma label tampilan -- ini nilai yang
 * benar-benar dikirim ke backend (lihat pages/*.jsx yang memetakan
 * `activeFilters['Jenis Instansi']` ke query param `typeId`, dst).
 *
 * ID jenis institusi (`Jenis Instansi`) ada di tabel `md_institutions_type`
 * dan SAMA di semua modul (lihat roleInstitutionIdMap di authSelectors.js):
 *   1 = Universitas, 2 = Lembaga Sosial, 3 = (khusus SDI-SMS, tanpa filter
 *   Jenis Instansi di modul manapun saat ini), 4 = Pemerintah Pusat,
 *   5 = Pemerintah Daerah, 6 = Dunia Usaha, 7 = Media Masa.
 *
 * `Status Kontak` (riset potensial) pakai 1/0 persis seperti dropdown di
 * AddResearchPotentialModal. `Status` (audiensi) pakai string PERSIS seperti
 * dropdown di AddAudienceModal ('Belum audiensi' / 'Re-audiensi' / 'Selesai')
 * karena itu yang benar-benar tersimpan di kolom `status`.
 */
const ROLE_FILTERS = {
  // MOU
  ia: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
    ],
  },
  mou: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
    ],
    'SCP-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 4 },
          { label: 'Pemerintah Daerah', value: 5 },
          { label: 'Dunia Usaha', value: 6 },
          { label: 'Media Masa', value: 7 },
        ],
      },
    ],
  },
  // PKS
  pks: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
    ],
    'SCP-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 4 },
          { label: 'Pemerintah Daerah', value: 5 },
          { label: 'Dunia Usaha', value: 6 },
          { label: 'Media Masa', value: 7 },
        ],
      },
    ],
  },
  // SPK dan TOR memiliki filter yang sama.
  // Catatan: grup "Jenis Surat" (MoU/PKS) sengaja dihapus dari sini --
  // data baris SPK/TOR dari backend tidak membawa informasi itu sama
  // sekali (lihat GetSpk/GetTor di back-end-sms), jadi filter itu tidak
  // bisa benar-benar dieksekusi tanpa perubahan backend lebih lanjut.
  spk: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
    ],
  },
  tor: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
    ],
  },
  letter: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
      {
        label: 'Jenis Surat',
        options: [
          {
            label: 'Surat Permohonan Kerjasama',
            value: 'surat permohonan kerjasama',
          },
          {
            label: 'Surat Undangan Audiensi',
            value: 'surat undangan audiensi',
          },
          { label: 'MoU (Nota Kesepahaman)', value: 'MoU (nota kesepahaman)' },
          {
            label: 'PKS (Perjanjian Kerjasama)',
            value: 'PKS (perjanjian kerjasama)',
          },
          {
            label: 'IA (Implementation Agreement)',
            value: 'IA (implementation agreement)',
          },
          {
            label: 'SPK (Surat Pernyataan Komitmen)',
            value: 'SPK (surat pernyataan komitmen)',
          },
        ],
      },
    ],
  },
  potential: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
      {
        label: 'Status Kontak',
        options: [
          { label: 'Sudah dikontak', value: 1 },
          { label: 'Belum dikontak', value: 0 },
        ],
      },
    ],
    // Catatan: grup "Cluster" sengaja dihapus dari sini -- baris riset
    // potensial dari backend tidak membawa data cluster institusi sama
    // sekali (lihat GetResearchPotential di back-end-sms), jadi filter ini
    // tidak bisa benar-benar dieksekusi tanpa menambahkan field itu ke
    // query backend terlebih dulu.
    'SDI-SMS': [
      {
        label: 'Status Kontak',
        options: [
          { label: 'Sudah dikontak', value: 1 },
          { label: 'Belum dikontak', value: 0 },
        ],
      },
    ],
    'SCP-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 4 },
          { label: 'Pemerintah Daerah', value: 5 },
          { label: 'Dunia Usaha', value: 6 },
          { label: 'Media Masa', value: 7 },
        ],
      },
      {
        label: 'Status Kontak',
        options: [
          { label: 'Sudah dikontak', value: 1 },
          { label: 'Belum dikontak', value: 0 },
        ],
      },
    ],
    default: [
      {
        label: 'Status Kontak',
        options: [
          { label: 'Sudah dikontak', value: 1 },
          { label: 'Belum dikontak', value: 0 },
        ],
      },
    ],
  },
  audience: {
    'LSD-SMS': [
      {
        label: 'Status',
        options: [
          { label: 'Belum audiensi', value: 'Belum audiensi' },
          { label: 'Re-audiensi', value: 'Re-audiensi' },
          { label: 'Selesai', value: 'Selesai' },
        ],
      },
    ],
    'SCP-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 4 },
          { label: 'Pemerintah Daerah', value: 5 },
          { label: 'Dunia Usaha', value: 6 },
          { label: 'Media Masa', value: 7 },
        ],
      },
      {
        label: 'Status',
        options: [
          { label: 'Belum audiensi', value: 'Belum audiensi' },
          { label: 'Re-audiensi', value: 'Re-audiensi' },
          { label: 'Selesai', value: 'Selesai' },
        ],
      },
    ],
    default: [
      {
        label: 'Status',
        options: [
          { label: 'Belum audiensi', value: 'Belum audiensi' },
          { label: 'Re-audiensi', value: 'Re-audiensi' },
          { label: 'Selesai', value: 'Selesai' },
        ],
      },
    ],
  },
  group: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 1 },
          { label: 'Lembaga Sosial', value: 2 },
        ],
      },
    ],
    'SCP-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 4 },
          { label: 'Pemerintah Daerah', value: 5 },
          { label: 'Dunia Usaha', value: 6 },
          { label: 'Media Masa', value: 7 },
        ],
      },
    ],
  },
};

/**
 * Mengambil opsi filter berdasarkan modul dan peran pengguna.
 * @param {string} moduleName - Nama modul (mis. 'pks', 'spk', 'tor').
 * @param {string} accessRole - Peran akses pengguna.
 * @returns {Array} Array opsi filter yang relevan atau array kosong jika tidak ditemukan.
 */
export function getFiltersByModuleAndRole(moduleName, accessRole) {
  const moduleFilters = ROLE_FILTERS[moduleName];
  if (!moduleFilters) {
    return [];
  }
  return moduleFilters[accessRole] || moduleFilters.default || [];
}
