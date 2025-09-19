/* istanbul ignore file */

import { createSelector } from '@reduxjs/toolkit';

export const selectAllSpk = (state) => state.spk.spk;
export const selectSpkDetail = (state) => state.spk.spkDetail;
export const selectSpkLoading = (state) => state.spk.loading;
export const selectSpkError = (state) => state.spk.error;

export const selectSpkById = createSelector(
  [selectAllSpk, (state, spkId) => spkId],
  (spks, spkId) => spks.find((item) => item.id === spkId)
);
