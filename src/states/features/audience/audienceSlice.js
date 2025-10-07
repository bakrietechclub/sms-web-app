import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddAudience,
  asyncGetAudienceById,
  asyncGetAudiences,
  asyncDeleteAudienceById,
  asyncUpdateAudienceById,
} from './audienceThunks';

const initialState = {
  audiences: [],
  audienceDetail: null,
  loading: false,
  error: null,
};

const audienceSlice = createSlice({
  name: 'audience',
  initialState,
  reducers: {
    clearAudienceDetail(state) {
      state.audienceDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(asyncAddAudience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddAudience.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = action.payload;
      })
      .addCase(asyncAddAudience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All
      .addCase(asyncGetAudiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetAudiences.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = action.payload;
      })
      .addCase(asyncGetAudiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By Id
      .addCase(asyncGetAudienceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audienceDetail = action.payload;
      })
      .addCase(asyncGetAudienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(asyncDeleteAudienceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = state.audiences.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(asyncDeleteAudienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(asyncUpdateAudienceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = state.audiences.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncUpdateAudienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAudienceDetail } = audienceSlice.actions;
export default audienceSlice.reducer;
