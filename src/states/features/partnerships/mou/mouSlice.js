import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddMou,
  asyncGetMouById,
  asyncGetMou,
  asyncDeleteMouById,
  asyncUpdateMouById,
  asyncGetMouOptions,
} from './mouThunks';

const initialState = {
  mous: [],
  mousOptions: [],
  mouDetail: null,
  meta: null,
  loading: false,
  error: null,
};

const mouSlice = createSlice({
  name: 'mou',
  initialState,
  reducers: {
    clearMouDetail(state) {
      state.mouDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All, jadi bentuknya harus diperlakukan sama
      // supaya tidak menimpa `mous` (array) dengan objek wrapper.
      .addCase(asyncAddMou.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      // Get All
      .addCase(asyncGetMou.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      .addCase(asyncGetMouOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.mousOptions = action.payload;
      })
      // Get By Id
      .addCase(asyncGetMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mouDetail = action.payload;
      })
      // Delete -- item di `mous` pakai field `mouId` (lihat GetMou entity di
      // back-end-sms), bukan `id`, jadi filter berdasarkan `id` tidak pernah
      // match dan item yang dihapus tetap terlihat sampai refetch berikutnya.
      .addCase(asyncDeleteMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = state.mous.filter(
          (item) => item.mouId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT backend tidak mengembalikan record yang
      // diperbarui (cuma pesan sukses), dan halaman detail sudah refetch
      // sendiri lewat onSuccess, jadi di sini cukup selesaikan loading state.
      .addCase(asyncUpdateMouById.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('mou/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('mou/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearMouDetail } = mouSlice.actions;
export default mouSlice.reducer;
