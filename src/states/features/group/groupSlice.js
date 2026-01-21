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
      .addCase(asyncAddGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      // Get All
      .addCase(asyncGetGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      // Get By Id
      .addCase(asyncGetGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groupDetail = action.payload;
      })
      // Delete
      .addCase(asyncDeleteGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(
          (item) => item.id !== action.payload.id
        );
      })
      // Update
      .addCase(asyncUpdateGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groupDetail = action.payload;
        // state.groups = state.groups.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );
      })
      .addMatcher(
        (action) => action.type.startsWith('group/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('group/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearGroupDetail } = groupSlice.actions;
export default groupSlice.reducer;
