// Selectors for authUser slice

export const selectAuthUser = (state) => state.authUser.user;
export const selectAuthLoading = (state) => state.authUser.loading;
export const selectAuthError = (state) => state.authUser.error;

// Optionally, you can add a selector to check if user is authenticated
export const selectIsAuthenticated = (state) => !!state.authUser.user;

// Selector to get accessRole from user
export const selectAccessRole = (state) =>
  state.authUser.user?.accessRole || null;
