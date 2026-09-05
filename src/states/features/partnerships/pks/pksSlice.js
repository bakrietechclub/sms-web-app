import { createSlice } from '@reduxjs/toolkit';
import { STATUS_OPTIONS } from '../../../../utils';
import {
  asyncAddPks,
  asyncGetPksById,
  asyncGetPks,
  asyncDeletePksById,
  asyncUpdatePksById,
  asyncUpdatePksStatus,
  asyncGetPksOptions,
} from './pksThunks';

const initialState = {
  pks: [],
  pksOptions: [],
  pksDetail: null,
  meta: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const pksSlice = createSlice({
  name: 'pks',
  initialState,
  reducers: {
    clearPksDetail(state) {
      state.pksDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddPks.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      // Get All
      .addCase(asyncGetPks.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })

      .addCase(asyncGetPksOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.pksOptions = action.payload;
      })
      // Get By Id
      .addCase(asyncGetPksById.fulfilled, (state, action) => {
        state.loading = false;
        state.pksDetail = action.payload;
      })
      // Delete -- item di `pks` pakai field `pksId`, bukan `id`.
      .addCase(asyncDeletePksById.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = state.pks.filter(
          (item) => item.pksId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdatePksById.fulfilled, (state) => {
        state.loading = false;
      })
      // Ganti status cepat: update langsung di tempat dari STATUS_OPTIONS FE,
      // tanpa refetch dan TANPA lewat matcher loading di bawah -- lihat
      // pengecualiannya, supaya halaman detail tidak nge-blank hanya karena
      // ganti satu dropdown status.
      .addCase(asyncUpdatePksStatus.fulfilled, (state, action) => {
        if (state.pksDetail) {
          const selected = STATUS_OPTIONS.find(
            (opt) => opt.id === action.payload.partnershipStatusId,
          );
          state.pksDetail.statusPartnership =
            selected?.label || state.pksDetail.statusPartnership;
          state.pksDetail.partnershipStatusId =
            action.payload.partnershipStatusId;
        }
      })
      // Matcher untuk menangani status pending dan rejected -- HARUS
      // di-scope ke prefix 'pks/', bukan endsWith('/pending') polos. Tanpa
      // prefix, thunk pending/rejected dari SLICE MANAPUN di seluruh app
      // ikut menyalakan/mematikan `loading` di sini, jadi halaman detail PKS
      // bisa nyangkut di skeleton kalau ada thunk tak terkait yang pending
      // setelah asyncGetPksById selesai (bug yang sama ditemukan di torSlice).
      .addMatcher(
        (action) =>
          action.type.startsWith('pks/') &&
          action.type.endsWith('/pending') &&
          !action.type.startsWith('pks/asyncUpdatePksStatus'),
        handlePending,
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('pks/') &&
          action.type.endsWith('/rejected') &&
          !action.type.startsWith('pks/asyncUpdatePksStatus'),
        handleRejected,
      );
  },
});

export const { clearPksDetail } = pksSlice.actions;
export default pksSlice.reducer;
