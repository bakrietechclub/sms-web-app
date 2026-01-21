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
      .addCase(asyncAddMou.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = action.payload;
      })
      // Get All
      .addCase(asyncGetMou.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = action.payload;
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
      // Delete
      .addCase(asyncDeleteMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = state.mous.filter((item) => item.id !== action.payload.id);
      })
      // Update
      .addCase(asyncUpdateMouById.fulfilled, (state, action) => {
        state.loading = false;
        state.mous = action.payload;
        // state.mous = state.mous.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );
      })
      .addMatcher(
        (action) => action.type.startsWith('mou/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('mou/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearMouDetail } = mouSlice.actions;
export default mouSlice.reducer;
