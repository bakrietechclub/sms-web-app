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
      .addCase(asyncAddResearchPotential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddResearchPotential.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
      })
      .addCase(asyncAddResearchPotential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All
      .addCase(asyncGetResearchPotential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetResearchPotential.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
      })
      .addCase(asyncGetResearchPotential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(asyncGetResearchPotentialRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        asyncGetResearchPotentialRecommendations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialsRecommendations = action.payload;
        }
      )
      .addCase(
        asyncGetResearchPotentialRecommendations.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(asyncGetResearchPotentialOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetResearchPotentialOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.potentialsOptions = action.payload;
      })
      .addCase(asyncGetResearchPotentialOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(asyncGetResearchPotentialOptionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        asyncGetResearchPotentialOptionsById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialsOptionsDetail = action.payload;
        }
      )
      .addCase(
        asyncGetResearchPotentialOptionsById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(asyncGetDetailResearchPotentialOptionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        asyncGetDetailResearchPotentialOptionsById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.potentialOptionDetail = action.payload;
        }
      )
      .addCase(
        asyncGetDetailResearchPotentialOptionsById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // Get By Id
      .addCase(asyncGetResearchPotentialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetResearchPotentialById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentialDetail = action.payload;
      })
      .addCase(asyncGetResearchPotentialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(asyncDeleteResearchPotentialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteResearchPotentialById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.filter(
          (item) => item.researchPotentialId !== action.payload.id
        );
      })
      .addCase(asyncDeleteResearchPotentialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(asyncUpdateResearchPotentialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateResearchPotentialById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncUpdateResearchPotentialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPotentialDetail } = potentialSlice.actions;
export default potentialSlice.reducer;
