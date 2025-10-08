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
      .addCase(asyncAddSpk.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = action.payload;
      })
      .addCase(asyncGetSpk.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = action.payload;
      })
      .addCase(asyncGetSpkById.fulfilled, (state, action) => {
        state.loading = false;
        state.spkDetail = action.payload;
      })
      .addCase(asyncDeleteSpkById.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = state.spk.filter((item) => item.id !== action.payload.id);
      })
      .addCase(asyncUpdateSpkById.fulfilled, (state, action) => {
        state.loading = false;
        state.spk = state.spk.map((item) =>
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

export const { clearSpkDetail } = spkSlice.actions;
export default spkSlice.reducer;
