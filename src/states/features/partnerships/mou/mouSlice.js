import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddMou,
  asyncGetMouById,
  asyncGetMou,
  asyncDeleteMouById,
  asyncUpdateMouById,
} from './mouThunks';

const initialState = {
  mous: [],
  mouDetail: null,
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
      // Add
      .addCase(asyncAddMou.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddMou.fulfilled, (state, action) => {
        state.loading = false;
        state.mous.push(action.payload);
      })
      .addCase(asyncAddMou.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All
      .addCase(asyncGetMou.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetMou.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = action.payload;
      })
      .addCase(asyncGetMou.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By Id
      .addCase(asyncGetMouById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mouDetail = action.payload;
      })
      .addCase(asyncGetMouById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(asyncDeleteMouById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = state.mous.filter((item) => item.id !== action.payload.id);
      })
      .addCase(asyncDeleteMouById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(asyncUpdateMouById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = state.mous.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncUpdateMouById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMouDetail } = mouSlice.actions;
export default mouSlice.reducer;
