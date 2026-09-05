import { PERM } from '../constants/permissions';

// Peta path route -> permission VIEW yang dibutuhkan, dipakai SidebarMenu
// untuk menonaktifkan (grey-out) item yang tidak diizinkan -- bukan
// menyembunyikannya, supaya employee tetap tahu modul itu ada tapi tidak
// bisa diaksesnya (konsisten dengan pola web-app-clp/we-app-hol-admin).
export const SIDEBAR_PATH_PERMISSION = {
  '/research/potential-recommendations': PERM.RESEARCH_POTENTIAL_VIEW,
  '/research/potential-partner': PERM.RESEARCH_POTENTIAL_VIEW,
  '/research/colab-partner': PERM.RESEARCH_COLLAB_VIEW,
  '/audiences': PERM.AUDIENCES_VIEW,
  '/groups': PERM.GROUPS_VIEW,
  '/partnerships/mou': PERM.PARTNERSHIPS_MOU_VIEW,
  '/partnerships/pks': PERM.PARTNERSHIPS_PKS_VIEW,
  '/partnerships/implementation-agreements': PERM.PARTNERSHIPS_IA_VIEW,
  '/partnerships/tor': PERM.PARTNERSHIPS_TOR_VIEW,
  '/partnerships/spk': PERM.PARTNERSHIPS_SPK_VIEW,
  '/letter-numbers': PERM.LETTER_NUMBERS_VIEW,
  '/letter-classifications': PERM.LETTER_CLASSIFICATIONS_VIEW,
};
