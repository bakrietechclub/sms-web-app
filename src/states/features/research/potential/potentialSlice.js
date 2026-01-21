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
} from './potentialThunks';

const initialState = {
  potentials: [],
  potentialsRecommendations: [],
  potentialsOptions: [],
  potentialsOptionsDetail: null,
  potentialOptionDetail: null,
  potentialDetail: null,
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
      // Add
      .addCase(asyncAddResearchPotential.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
      })
      // Get All
      .addCase(asyncGetResearchPotential.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
      })
      .addCase(
        asyncGetResearchPotentialRecommendations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialsRecommendations = action.payload;
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
      // Update
      .addCase(asyncUpdateResearchPotentialById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
        // state.potentials = state.potentials.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );
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
