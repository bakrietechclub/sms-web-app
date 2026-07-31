// Selectors for authUser slice
export const selectAuthUser = (state) => state.authUser.user;
export const selectAuthLoading = (state) => state.authUser.loading;
export const selectAuthError = (state) => state.authUser.error;

// Optionally, you can add a selector to check if user is authenticated
export const selectIsAuthenticated = (state) => !!state.authUser.user;

// Selector to get accessRole from user
export const selectAccessRole = (state) =>
  state.authUser.user?.accessRole || null;

const roleInstitutionIdMap = {
  'LSD-SMS': [1, 2],
  'SDI-SMS': [3],
  'SCP-SMS': [4, 5, 6, 7],
};

export const selectedAccess = (state) => state.authUser.selectedAccess || null;

export const selectedAccessTypeInstitutionsId = (state) => {
  const accessRole = state.authUser.selectedAccess;

  // Menggunakan object lookup. Jika accessRole tidak ditemukan, akan mengembalikan null (default behavior)
  return roleInstitutionIdMap[accessRole] || null;
};

export const selectAccessTypeInstitutionsId = (state) => {
  const accessRole = state.authUser.user?.accessRole;

  // Menggunakan object lookup. Jika accessRole tidak ditemukan, akan mengembalikan null (default behavior)
  return roleInstitutionIdMap[accessRole] || null;
};

// Peta id_first_tier_program -> label accessRole -- CERMIN dari CASE di
// back-end-sms (UsersProgramBcfRepositoryMySQL#readByUsersId), TAPI sumbernya
// beda: yang di backend itu dari tabel lama tx_users_program_bcf (attachment
// program, bukan RBAC), sedangkan ini dari role SMS_* yang SUNGGUHAN
// ditugaskan lewat SA (Atur Akses -> Akses SMS). Ini yang harusnya jadi
// otoritas UI, bukan accessRole lama.
const firstTierIdToAccessRole = { 2: 'LSD-SMS', 1: 'SDI-SMS', 3: 'SCP-SMS' };

// Divisi mana saja yang SUNGGUHAN ditugaskan ke employee ini lewat role
// SMS_MANAGER/STAFF/VIEWER (bukan accessRole lama yang cuma dari attachment
// program tx_users_program_bcf, dan bukan localStorage.selectedAccess yang
// bisa dipilih bebas). Fail-closed: kosong -> tidak ada akses ke SMS sama
// sekali.
export const selectRealAccessRoles = (state) => {
  const roles = state.authUser.user?.roles || [];
  const accessRoles = roles
    .filter((r) => r.code?.startsWith('SMS_') && r.firstTierProgramId)
    .map((r) => firstTierIdToAccessRole[r.firstTierProgramId])
    .filter(Boolean);
  return [...new Set(accessRoles)];
};

export const selectHasAccess = (state) => {
  const selectedAccess = state.authUser.selectedAccess;
  if (!selectedAccess) return false;
  return selectRealAccessRoles(state).includes(selectedAccess);
};
