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
      .addCase(asyncAddAudience.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = action.payload;
      })
      // Get All
      .addCase(asyncGetAudiences.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = action.payload;
      })
      // Get By Id
      .addCase(asyncGetAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audienceDetail = action.payload;
      })
      // Delete
      .addCase(asyncDeleteAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = state.audiences.filter(
          (item) => item.id !== action.payload.id,
        );
      })
      // Update
      .addCase(asyncUpdateAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audienceDetail = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('audience/') &&
          action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('audience/') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearAudienceDetail } = audienceSlice.actions;
export default audienceSlice.reducer;
