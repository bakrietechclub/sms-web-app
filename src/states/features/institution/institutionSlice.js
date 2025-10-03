import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddInstitutions,
  asyncGetInstitutionsById,
  asyncGetInstitutions,
  asyncDeleteInstitutionsById,
  asyncUpdateInstitutionsById,
  asyncGetInstitutionsOptions,
  asyncGetInstitutionsOptionsById,
} from './institutionThunks';

const initialState = {
  institutions: [],
  institutionDetail: null,
  institutionsOptions: [],
  institutionsOptionsDetail: null,
  loading: false,
  error: null,
};

const institutionSlice = createSlice({
  name: 'institutions',
  initialState,
  reducers: {
    clearInstitutionDetail(state) {
      state.institutionDetail = null;
    },
    clearInstitutionsOptionsDetail(state) {
      state.institutionsOptionsDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddInstitutions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddInstitutions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions.push(action.payload);
      })
      .addCase(asyncAddInstitutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetInstitutions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetInstitutions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions = action.payload;
      })
      .addCase(asyncGetInstitutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetInstitutionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetInstitutionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionDetail = action.payload;
      })
      .addCase(asyncGetInstitutionsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncDeleteInstitutionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteInstitutionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions = state.institutions.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(asyncDeleteInstitutionsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncUpdateInstitutionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateInstitutionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions = state.institutions.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncUpdateInstitutionsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetInstitutionsOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetInstitutionsOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionsOptions = action.payload;
      })
      .addCase(asyncGetInstitutionsOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetInstitutionsOptionsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetInstitutionsOptionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionsOptionsDetail = action.payload;
      })
      .addCase(asyncGetInstitutionsOptionsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInstitutionDetail, clearInstitutionsOptionsDetail } =
  institutionSlice.actions;
export default institutionSlice.reducer;
