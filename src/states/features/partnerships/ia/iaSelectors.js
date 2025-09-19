/* istanbul ignore file */

import { createSelector } from '@reduxjs/toolkit';

export const selectAllIAs = (state) => state.ia.ia;
export const selectIADetail = (state) => state.ia.iaDetail;
export const selectIALoading = (state) => state.ia.loading;
export const selectIAError = (state) => state.ia.error;

export const selectIAById = createSelector(
  [selectAllIAs, (state, iaId) => iaId],
  (ias, iaId) => ias.find((item) => item.id === iaId)
);
