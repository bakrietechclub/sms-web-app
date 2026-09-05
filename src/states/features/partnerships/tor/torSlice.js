/* istanbul ignore file */

import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddTor,
  asyncGetTor,
  asyncGetTorById,
  asyncDeleteTorById,
  asyncUpdateTorById,
  asyncGetTorOptions,
} from './torThunks';

const initialState = {
  tor: [],
  torOptions: [],
  torDetail: null,
  meta: null,
  loading: false,
  error: null,
};

const torSlice = createSlice({
  name: 'tor',
  initialState,
  reducers: {
    clearTorDetail(state) {
      state.torDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddTor.fulfilled, (state, action) => {
        state.loading = false;
        state.tor = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      .addCase(asyncGetTor.fulfilled, (state, action) => {
        state.loading = false;
        state.tor = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      .addCase(asyncGetTorOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.torOptions = action.payload;
      })
      .addCase(asyncGetTorById.fulfilled, (state, action) => {
        state.loading = false;
        state.torDetail = action.payload;
      })
      // Delete -- item di `tor` pakai field `torId`, bukan `id`.
      .addCase(asyncDeleteTorById.fulfilled, (state, action) => {
        state.loading = false;
        state.tor = state.tor.filter(
          (item) => item.torId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdateTorById.fulfilled, (state) => {
        state.loading = false;
      })
      // HARUS di-scope ke prefix 'tor/' -- endsWith('/pending') polos akan
      // ikut cocok dengan thunk pending dari slice MANAPUN di seluruh app.
      // Kalau ada thunk lain yang kebetulan pending setelah asyncGetTorById
      // selesai, `loading` di sini akan menyala lagi dan tidak pernah
      // dimatikan (karena tidak ada lagi action 'tor/*/fulfilled' atau
      // 'tor/*/rejected' yang menyusul) -- itulah sebabnya halaman detail
      // TOR bisa nyangkut permanen di skeleton loading.
      .addMatcher(
        (action) =>
          action.type.startsWith('tor/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('tor/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearTorDetail } = torSlice.actions;
export default torSlice.reducer;
