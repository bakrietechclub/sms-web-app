/**
 * Mendefinisikan semua opsi filter yang mungkin.
 * Menggunakan objek untuk memetakan peran pengguna ke opsi filter mereka.
 */
const ROLE_FILTERS = {
  // MOU
  ia: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
    ],
  },
  mou: {
    'LSD-SMS': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
    ],
    'LSD-SCP': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 'pemerintah pusat' },
          { label: 'Pemerintah Daerah', value: 'pemerintah daerah' },
          { label: 'Dunia Usaha', value: 'dunia usaha' },
          { label: 'Media Massa', value: 'media massa' },
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
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
    ],
    'LSD-SCP': [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 'Pemerintah Pusat' },
          { label: 'Pemerintah Daerah', value: 'Pemerintah Daerah' },
          { label: 'Dunia Usaha', value: 'Dunia Usaha' },
          { label: 'Media Massa', value: 'Media Massa' },
        ],
      },
    ],
  },
  // SPK dan TOR memiliki filter yang sama
  spk: {
    'LSD-SMS': [
      {
        label: 'Jenis Surat',
        options: [
          { label: 'MoU', value: 'mou' },
          { label: 'PKS', value: 'pks' },
        ],
      },
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga', value: 'lembaga' },
        ],
      },
    ],
    'SDI-SMS': [
      {
        label: 'Jenis Surat',
        options: [
          { label: 'MoU', value: 'mou' },
          { label: 'PKS', value: 'pks' },
        ],
      },
    ],
  },
  tor: {
    'LSD-SMS': [
      {
        label: 'Jenis Surat',
        options: [
          { label: 'MoU', value: 'mou' },
          { label: 'PKS', value: 'pks' },
        ],
      },
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga', value: 'lembaga' },
        ],
      },
    ],
    'SDI-SMS': [
      {
        label: 'Jenis Surat',
        options: [
          { label: 'MoU', value: 'mou' },
          { label: 'PKS', value: 'pks' },
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
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
    ],
    default: [
      {
        label: 'Cluster',
        options: [
          { label: 'Kesehatan', value: 'kesehatan' },
          { label: 'Pendidikan', value: 'pendidikan' },
          { label: 'Lingkungan', value: 'lingkungan' },
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
