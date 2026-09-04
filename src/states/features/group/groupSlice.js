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
  meta: null,
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
      // Add -- thunk mengembalikan hasil refetch daftar lengkap ({result,
      // meta}), sama seperti Get All.
      .addCase(asyncAddGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.result || action.payload;
        state.meta = action.payload.meta || state.meta;
      })
      // Get All
      .addCase(asyncGetGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.result || action.payload;
        state.meta = action.payload.meta || null;
      })
      // Get By Id
      .addCase(asyncGetGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groupDetail = action.payload;
      })
      // Delete -- item di `groups` pakai field `groupId`, bukan `id`.
      .addCase(asyncDeleteGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(
          (item) => item.groupId !== action.payload.id,
        );
      })
      // Update -- endpoint PUT tidak mengembalikan record yang diperbarui,
      // dan halaman detail sudah refetch sendiri lewat onSuccess.
      .addCase(asyncUpdateGroupById.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('group/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('group/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearGroupDetail } = groupSlice.actions;
export default groupSlice.reducer;
