/* istanbul ignore file */

import { createSelector } from '@reduxjs/toolkit';

export const selectAllTors = (state) => state.tor.tor;
export const selectTorDetail = (state) => state.tor.torDetail;
export const selectTorLoading = (state) => state.tor.loading;
export const selectTorError = (state) => state.tor.error;

export const selectTorById = createSelector(
  [selectAllTors, (state, torId) => torId],
  (tors, torId) => tors.find((item) => item.id === torId)
);
