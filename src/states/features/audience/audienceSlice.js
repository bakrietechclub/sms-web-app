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
  meta: null,
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
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddAudience.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      // Get All
      .addCase(asyncGetAudiences.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      // Get By Id
      .addCase(asyncGetAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audienceDetail = action.payload;
      })
      // Delete -- item di `audiences` pakai field `audiencesId`, bukan `id`.
      .addCase(asyncDeleteAudienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.audiences = state.audiences.filter(
          (item) => item.audiencesId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdateAudienceById.fulfilled, (state) => {
        state.loading = false;
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
