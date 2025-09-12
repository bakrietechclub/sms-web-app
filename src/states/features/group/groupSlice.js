import { createSlice } from '@reduxjs/toolkit';
import {
  asyncAddGroup,
  asyncGetGroupById,
  asyncGetGroups,
  asyncDeleteGroupById,
  asyncUpdateGroupById,
} from './groupThunks';

const initialState = {
  groups: [],
  groupDetail: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearGroupDetail(state) {
      state.groupDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(asyncAddGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
      })
      .addCase(asyncAddGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All
      .addCase(asyncGetGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(asyncGetGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By Id
      .addCase(asyncGetGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groupDetail = action.payload;
      })
      .addCase(asyncGetGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(asyncDeleteGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDeleteGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(asyncDeleteGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(asyncUpdateGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(asyncUpdateGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGroupDetail } = groupSlice.actions;
export default groupSlice.reducer;
