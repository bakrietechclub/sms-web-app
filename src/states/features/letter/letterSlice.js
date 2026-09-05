import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddLetter,
  asyncDeleteLetterById,
  asyncGetLastLetterNumber,
  asyncGetLetterById,
  asyncGetLetters,
  asyncGetSubClassifications,
  asyncUpdateLetterById,
} from './letterThunks';

const initialState = {
  letters: [],
  letterSuccessAdd: null,
  letterDetail: null,
  lastLetterNumber: null,
  subClassifications: null,
  meta: null,
  loading: false,
  error: null,
};

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.letterSuccessAdd = action.payload;
      })
      .addCase(asyncGetLetterById.fulfilled, (state, action) => {
        state.loading = false;
        state.letterDetail = action.payload;
      })
      .addCase(asyncGetLetters.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      .addCase(asyncGetLastLetterNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.lastLetterNumber = action.payload;
      })
      .addCase(asyncGetSubClassifications.fulfilled, (state, action) => {
        state.loading = false;
        state.subClassifications = action.payload;
      })
      .addCase(asyncDeleteLetterById.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = state.letters.filter(
          (item) => item.id !== action.payload.id,
        );
      })
      .addCase(asyncUpdateLetterById.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = state.letters.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      // `asyncGetSubClassifications` sengaja DIKECUALIKAN dari matcher
      // loading umum di bawah -- itu dipanggil di dalam UpdateLetterModal
      // (untuk mengisi opsi Sub Klasifikasi saat form edit dibuka), yang
      // di-mount berdampingan dengan halaman detail. Kalau ikut menyalakan
      // `loading` yang sama dipakai skeleton halaman detail, hasilnya
      // adalah unmount/dispatch/mount berulang tanpa henti (lihat catatan
      // di UpdateLetterModal.jsx) -- halaman detail nyangkut permanen di
      // skeleton.
      .addMatcher(
        (action) =>
          action.type.startsWith('letter/') &&
          action.type.endsWith('/pending') &&
          action.type !== 'letter/asyncGetSubClassifications/pending',
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('letter/') &&
          action.type.endsWith('/rejected') &&
          action.type !== 'letter/asyncGetSubClassifications/rejected',
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export default letterSlice.reducer;
