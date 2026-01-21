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
      .addCase(asyncAddResearchCollab.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = action.payload;
      })
      // Get All
      .addCase(asyncGetResearchCollab.fulfilled, (state, action) => {
        state.loading = false;
        state.collabs = action.payload;
      })
      .addCase(asyncGetResearchCollabOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.potentialsOptions = action.payload;
      })
      // Get By Id
      .addCase(asyncGetResearchCollabById.fulfilled, (state, action) => {
        state.loading = false;
        state.collabDetail = action.payload;
      })
      // Delete
      .addCase(asyncDeleteResearchCollabById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.filter(
          (item) => item.id !== action.payload.id,
        );
      })
      // Update
      .addCase(asyncUpdateResearchCollabById.fulfilled, (state, action) => {
        state.loading = false;
        state.potentials = state.potentials.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('collab/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('collab/') &&
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
