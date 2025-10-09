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
      .addCase(asyncAddContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(asyncAddContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetContactByGroupId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetContactByGroupId.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(asyncGetContactByGroupId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactDetail = action.payload;
      })
      .addCase(asyncGetContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncDeleteContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteContactById.fulfilled, (state) => {
        state.loading = false;
        state.contactDetail = null;
      })
      .addCase(asyncDeleteContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncUpdateContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactDetail = action.payload;
      })
      .addCase(asyncUpdateContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactDetail } = contactSlice.actions;
export default contactSlice.reducer;
