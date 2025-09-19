import { createSelector } from '@reduxjs/toolkit';

// Selector dasar untuk mengambil bagian state PKS dari store
export const selectAllPks = (state) => state.pks.pks;
export const selectPksDetail = (state) => state.pks.pksDetail;
export const selectPksLoading = (state) => state.pks.loading;
export const selectPksError = (state) => state.pks.error;

// Selector memoized untuk menemukan PKS berdasarkan ID
export const selectPksById = createSelector(
  [selectAllPks, (state, pksId) => pksId],
  (pks, pksId) => pks.find((item) => item.id === pksId)
);
