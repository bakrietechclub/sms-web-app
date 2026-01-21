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
      .addCase(asyncAddInstitutions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions.push(action.payload);
      })
      .addCase(asyncGetInstitutions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions = action.payload;
      })
      .addCase(asyncGetInstitutionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionDetail = action.payload;
      })
      .addCase(asyncDeleteInstitutionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions = state.institutions.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(asyncUpdateInstitutionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutions = state.institutions.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncGetInstitutionsOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionsOptions = action.payload;
      })
      .addCase(asyncGetInstitutionsOptionsById.fulfilled, (state, action) => {
        state.loading = false;
        state.institutionsOptionsDetail = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('institutions/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('institutions/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearInstitutionDetail, clearInstitutionsOptionsDetail } =
  institutionSlice.actions;
export default institutionSlice.reducer;
