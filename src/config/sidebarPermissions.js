import { PERM } from '../constants/permissions';

// Peta path route -> permission VIEW yang dibutuhkan, dipakai SidebarMenu
// untuk menonaktifkan (grey-out) item yang tidak diizinkan -- bukan
// menyembunyikannya, supaya employee tetap tahu modul itu ada tapi tidak
// bisa diaksesnya (konsisten dengan pola web-app-clp/we-app-hol-admin).
export const SIDEBAR_PATH_PERMISSION = {
  '/dashboard/research/potential-recommendations': PERM.RESEARCH_POTENTIAL_VIEW,
  '/dashboard/research/potential-partner': PERM.RESEARCH_POTENTIAL_VIEW,
  '/dashboard/research/colab-partner': PERM.RESEARCH_COLLAB_VIEW,
  '/dashboard/audiences': PERM.AUDIENCES_VIEW,
  '/dashboard/groups': PERM.GROUPS_VIEW,
  '/dashboard/partnerships/mou': PERM.PARTNERSHIPS_MOU_VIEW,
  '/dashboard/partnerships/pks': PERM.PARTNERSHIPS_PKS_VIEW,
  '/dashboard/partnerships/implementation-agreements': PERM.PARTNERSHIPS_IA_VIEW,
  '/dashboard/partnerships/tor': PERM.PARTNERSHIPS_TOR_VIEW,
  '/dashboard/partnerships/spk': PERM.PARTNERSHIPS_SPK_VIEW,
  '/dashboard/letter-numbers': PERM.LETTER_NUMBERS_VIEW,
  '/dashboard/letter-classifications': PERM.LETTER_CLASSIFICATIONS_VIEW,
};
