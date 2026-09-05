/* istanbul ignore file */

import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddSpk,
  asyncGetSpk,
  asyncGetSpkById,
  asyncDeleteSpkById,
  asyncUpdateSpkById,
} from './spkThunks';

const initialState = {
  spk: [],
  spkDetail: null,
  meta: null,
  loading: false,
  error: null,
};

const spkSlice = createSlice({
  name: 'spk',
  initialState,
  reducers: {
    clearSpkDetail(state) {
      state.spkDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddSpk.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      .addCase(asyncGetSpk.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      .addCase(asyncGetSpkById.fulfilled, (state, action) => {
        state.loading = false;
        state.spkDetail = action.payload;
      })
      // Delete -- item di `spk` pakai field `spkId`, bukan `id`.
      .addCase(asyncDeleteSpkById.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = state.spk.filter(
          (item) => item.spkId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdateSpkById.fulfilled, (state) => {
        state.loading = false;
      })
      // HARUS di-scope ke prefix 'spk/' -- lihat catatan yang sama di
      // torSlice soal kenapa endsWith('/pending') polos bikin halaman
      // detail bisa nyangkut permanen di skeleton loading.
      .addMatcher(
        (action) =>
          action.type.startsWith('spk/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('spk/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearSpkDetail } = spkSlice.actions;
export default spkSlice.reducer;
