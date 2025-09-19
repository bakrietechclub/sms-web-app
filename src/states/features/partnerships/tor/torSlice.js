/* istanbul ignore file */

import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddTor,
  asyncGetTor,
  asyncGetTorById,
  asyncDeleteTorById,
  asyncUpdateTorById,
} from './torThunks';

const initialState = {
  tor: [],
  torDetail: null,
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
      .addCase(asyncAddTor.fulfilled, (state, action) => {
        state.loading = false;
        state.tor.push(action.payload);
      })
      .addCase(asyncGetTor.fulfilled, (state, action) => {
        state.loading = false;
        state.tor = action.payload;
      })
      .addCase(asyncGetTorById.fulfilled, (state, action) => {
        state.loading = false;
        state.torDetail = action.payload;
      })
      .addCase(asyncDeleteTorById.fulfilled, (state, action) => {
        state.loading = false;
        state.tor = state.tor.filter((item) => item.id !== action.payload.id);
      })
      .addCase(asyncUpdateTorById.fulfilled, (state, action) => {
        state.loading = false;
        state.tor = state.tor.map((item) =>
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

export const { clearTorDetail } = torSlice.actions;
export default torSlice.reducer;
