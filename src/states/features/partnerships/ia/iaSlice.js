/* istanbul ignore file */

import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddImplementationAgreement,
  asyncGetImplementationAgreements,
  asyncGetImplementationAgreementById,
  asyncDeleteImplementationAgreementById,
  asyncUpdateImplementationAgreementById,
} from './iaThunks';

const initialState = {
  ia: [],
  iaDetail: null,
  loading: false,
  error: null,
};

const iaSlice = createSlice({
  name: 'ia',
  initialState,
  reducers: {
    clearImplementationAgreementDetail(state) {
      state.iaDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddImplementationAgreement.fulfilled, (state, action) => {
        state.loading = false;
        state.ia.push(action.payload);
      })
      .addCase(asyncGetImplementationAgreements.fulfilled, (state, action) => {
        state.loading = false;
        state.ia = action.payload;
      })
      .addCase(
        asyncGetImplementationAgreementById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.iaDetail = action.payload;
        }
      )
      .addCase(
        asyncDeleteImplementationAgreementById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.ia = state.ia.filter((item) => item.id !== action.payload.id);
        }
      )
      .addCase(
        asyncUpdateImplementationAgreementById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.ia = state.ia.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearImplementationAgreementDetail } = iaSlice.actions;
export default iaSlice.reducer;
