import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddContact,
  asyncGetContactById,
  asyncDeleteContactById,
  asyncUpdateContactById,
  asyncGetContactByGroupId,
} from './contactThunks';

const initialState = {
  contacts: [],
  contactDetail: null,
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactDetail(state) {
      state.contactDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(asyncGetContactByGroupId.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(asyncGetContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactDetail = action.payload;
      })
      .addCase(asyncDeleteContactById.fulfilled, (state) => {
        state.loading = false;
        state.contactDetail = null;
      })
      .addCase(asyncUpdateContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactDetail = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('contact/') &&
          action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('contact/') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearContactDetail } = contactSlice.actions;
export default contactSlice.reducer;
