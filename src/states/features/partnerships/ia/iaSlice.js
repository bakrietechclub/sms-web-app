/* istanbul ignore file */

import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddImplementationAgreement,
  asyncGetImplementationAgreements,
  asyncGetImplementationAgreementById,
  asyncDeleteImplementationAgreementById,
  asyncUpdateImplementationAgreementById,
  asyncGetImplementationAgreementsOptions,
} from './iaThunks';

const initialState = {
  ia: [],
  iaOptions: [],
  iaDetail: null,
  meta: null,
  loading: false,
  error: null,
};

const iaSlice = createSlice({
  name: 'ia',
  initialState,
  reducers: {
    clearImplementationAgreementDetail(state) {
      state.iaDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddImplementationAgreement.fulfilled, (state, action) => {
        state.loading = false;
        state.ia = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      .addCase(asyncGetImplementationAgreements.fulfilled, (state, action) => {
        state.loading = false;
        state.ia = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      .addCase(
        asyncGetImplementationAgreementsOptions.fulfilled,
        (state, action) => {
          state.loading = false;
          state.iaOptions = action.payload;
        },
      )
      .addCase(
        asyncGetImplementationAgreementById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.iaDetail = action.payload;
        },
      )
      // Delete -- item di `ia` pakai field `iaId`, bukan `id`.
      .addCase(
        asyncDeleteImplementationAgreementById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.ia = state.ia.filter(
            (item) => item.iaId !== action.payload.id,
          );
        },
      )
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdateImplementationAgreementById.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearImplementationAgreementDetail } = iaSlice.actions;
export default iaSlice.reducer;
