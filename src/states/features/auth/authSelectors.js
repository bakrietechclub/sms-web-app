// Selectors for authUser slice

export const selectAuthUser = (state) => state.authUser.user;
export const selectAuthLoading = (state) => state.authUser.loading;
export const selectAuthError = (state) => state.authUser.error;

// Optionally, you can add a selector to check if user is authenticated
export const selectIsAuthenticated = (state) => !!state.authUser.user;

// Selector to get accessRole from user
export const selectAccessRole = (state) =>
  state.authUser.user?.accessRole || null;

export const selectedAccess = (state) => state.authUser.selectedAccess || null;

const roleInstitutionIdMap = {
  'LSD-SMS': [1, 2],
  'SDI-SMS': [3],
  'SCL-SMS': [4, 5, 6, 7],
};

export const selectAccessTypeInstitutionsId = (state) => {
  const accessRole = state.authUser.user?.accessRole;

  // Menggunakan object lookup. Jika accessRole tidak ditemukan, akan mengembalikan null (default behavior)
  return roleInstitutionIdMap[accessRole] || null;
};
