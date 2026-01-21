import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddPks,
  asyncGetPksById,
  asyncGetPks,
  asyncDeletePksById,
  asyncUpdatePksById,
  asyncGetPksOptions,
} from './pksThunks';

const initialState = {
  pks: [],
  pksOptions: [],
  pksDetail: null,
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
      // Add
      .addCase(asyncAddPks.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = action.payload;
      })
      // Get All
      .addCase(asyncGetPks.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = action.payload;
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
      // Delete
      .addCase(asyncDeletePksById.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = state.pks.filter((item) => item.id !== action.payload.id);
      })
      // Update
      .addCase(asyncUpdatePksById.fulfilled, (state, action) => {
        state.loading = false;
        state.pks = action.payload;
        // state.pks = state.pks.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );
      })
      // Matcher untuk menangani status pending dan rejected secara umum
      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        handleRejected
      );
  },
});

export const { clearPksDetail } = pksSlice.actions;
export default pksSlice.reducer;
