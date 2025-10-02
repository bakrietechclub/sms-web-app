import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddLetter,
  asyncDeleteLetterById,
  asyncGetLetterById,
  asyncGetLetters,
  asyncUpdateLetterById,
} from './letterThunks';

const initialState = {
  letters: [],
  letterDetail: null,
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
        state.letters.push(action.payload);
      })
      .addCase(asyncGetLetterById.fulfilled, (state, action) => {
        state.loading = false;
        state.letterDetail = action.payload;
      })
      .addCase(asyncGetLetters.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = action.payload;
      })
      .addCase(asyncDeleteLetterById.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = state.letters.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(asyncUpdateLetterById.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = state.letters.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default letterSlice.reducer;
