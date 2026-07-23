import { createSlice } from '@reduxjs/toolkit';
import {
  asyncGetClassifications,
  asyncGetSubClassificationsList,
  asyncGetLetterTypes,
} from './classificationThunks';

const initialState = {
  classifications: [],
  subClassifications: [],
  letterTypes: [],
  loading: false,
  error: null,
};

const classificationSlice = createSlice({
  name: 'classification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetClassifications.fulfilled, (state, action) => {
        state.loading = false;
        state.classifications = action.payload;
      })
      .addCase(asyncGetSubClassificationsList.fulfilled, (state, action) => {
        state.loading = false;
        state.subClassifications = action.payload;
      })
      .addCase(asyncGetLetterTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.letterTypes = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('classification/') &&
          action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('classification/') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('classification/') &&
          action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        },
      );
  },
});

export default classificationSlice.reducer;
