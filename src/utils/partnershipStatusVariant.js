// Warna badge status kerjasama -- SATU sumber untuk semua halaman (MoU,
// PKS, TOR, SPK, IA). Sebelumnya tiap halaman detail (Ia.jsx, IaDetail.jsx,
// TorDetail.jsx, SpkDetail.jsx, ColabPartnerDetail.jsx) hardcode
// `status='success'` pada <Label>, jadi 'Terminasi' dan 'Kadaluarsa' ikut
// tampil hijau. Dikelompokkan dari phase md_ps_status (back-end/db/
// migrations/2026-09-08-01_partnership_validity.sql) supaya konsisten
// dengan definisi yang sama dibaca CLP & web-app-clp -- warnanya boleh
// beda tampilan per halaman, tapi maknanya (mengikat/belum/dihentikan)
// harus sama di mana-mana.
const VARIANT_BY_LABEL = {
  // md_ps_status.phase = MENGIKAT (baik-baik saja)
  'Ditanda Tangani Oleh BCF': 'success',
  'Sudah Kirim Dokumen ke Mitra': 'success',
  Selesai: 'success',
  // MENGIKAT, tapi butuh tindak lanjut -- tetap "berlaku", bukan hijau polos
  'Perlu Follow Up': 'warning',
  'Perlu Diperbarui': 'warning',
  // md_ps_status.phase = DIHENTIKAN
  Terminasi: 'danger',
  // Turunan validity_state (v_ps_mou_validity), dipetakan di SQL jadi label
  // Indonesia yang sama -- lihat ResearchCollabRepositoryMySQL.js &
  // PartnershipResearchPotentialRepositoryMySQL.js
  'Sedang Berlangsung': 'success',
  Kadaluarsa: 'danger',
  Dihentikan: 'danger',
  'Belum Aktif': 'default',
  'Belum Mengikat': 'default',
  'Tanpa Status': 'white',
  // Fallback lama saat id_partnership_status belum diisi sama sekali
  Draft: 'default',
};

export const getPartnershipStatusVariant = (label) =>
  VARIANT_BY_LABEL[label] || 'default';

export default getPartnershipStatusVariant;
