import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddResearchCollab,
  asyncGetResearchCollabById,
  asyncGetResearchCollab,
  asyncDeleteResearchCollabById,
  asyncUpdateResearchCollabById,
  asyncGetResearchCollabOptions,
} from './collabThunks';

const initialState = {
  collabs: [],
  collabsOptions: [],
  collabDetail: null,
  loading: false,
  error: null,
};

const potentialSlice = createSlice({
  name: 'collab',
  initialState,
  reducers: {
    clearCollabDetail(state) {
      state.collabDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(asyncAddResearchCollab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddResearchCollab.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
      })
      .addCase(asyncAddResearchCollab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All
      .addCase(asyncGetResearchCollab.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetResearchCollab.fulfilled, (state, action) => {
        state.loading = false;
        state.collabs = action.payload;
      })
      .addCase(asyncGetResearchCollab.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(asyncGetResearchCollabOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetResearchCollabOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.potentialsOptions = action.payload;
      })
      .addCase(asyncGetResearchCollabOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By Id
      .addCase(asyncGetResearchCollabById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetResearchCollabById.fulfilled, (state, action) => {
        state.loading = false;
        state.collabDetail = action.payload;
      })
      .addCase(asyncGetResearchCollabById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(asyncDeleteResearchCollabById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteResearchCollabById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(asyncDeleteResearchCollabById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(asyncUpdateResearchCollabById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateResearchCollabById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncUpdateResearchCollabById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPotentialDetail } = potentialSlice.actions;
export default potentialSlice.reducer;
