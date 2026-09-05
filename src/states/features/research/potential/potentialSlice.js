import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddResearchPotential,
  asyncGetResearchPotentialById,
  asyncGetResearchPotential,
  asyncDeleteResearchPotentialById,
  asyncUpdateResearchPotentialById,
  asyncGetResearchPotentialOptions,
  asyncGetResearchPotentialOptionsById,
  asyncGetDetailResearchPotentialOptionsById,
  asyncGetResearchPotentialRecommendations,
  asyncGetResearchPotentialRecommendationDetail,
} from './potentialThunks';

const initialState = {
  potentials: [],
  potentialsRecommendations: [],
  recommendationDetail: null,
  potentialsOptions: [],
  potentialsOptionsDetail: null,
  potentialOptionDetail: null,
  potentialDetail: null,
  meta: null,
  loading: false,
  error: null,
};

const potentialSlice = createSlice({
  name: 'potential',
  initialState,
  reducers: {
    clearPotentialDetail(state) {
      state.potentialDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddResearchPotential.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      // Get All
      .addCase(asyncGetResearchPotential.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      .addCase(
        asyncGetResearchPotentialRecommendations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialsRecommendations =
            action.payload.result || action.payload;
          state.meta = action.payload.meta || null;
        },
      )
      .addCase(
        asyncGetResearchPotentialRecommendationDetail.fulfilled,
        (state, action) => {
          state.loading = false;
          state.recommendationDetail = action.payload;
        },
      )
      .addCase(asyncGetResearchPotentialOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.potentialsOptions = action.payload;
      })
      .addCase(
        asyncGetResearchPotentialOptionsById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialsOptionsDetail = action.payload;
        },
      )
      .addCase(
        asyncGetDetailResearchPotentialOptionsById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialOptionDetail = action.payload;
        },
      )
      // Get By Id
      .addCase(asyncGetResearchPotentialById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentialDetail = action.payload;
      })
      // Delete
      .addCase(asyncDeleteResearchPotentialById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.filter(
          (item) => item.researchPotentialId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdateResearchPotentialById.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('potential/') &&
          action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('potential/') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearPotentialDetail } = potentialSlice.actions;
export default potentialSlice.reducer;
