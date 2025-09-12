import { createSlice } from '@reduxjs/toolkit';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './authThunks';

const authSlice = createSlice({
  name: 'authUser',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // opsional kalau ingin set manual
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    unsetAuthUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(asyncSetAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(asyncUnsetAuthUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setAuthUser, unsetAuthUser } = authSlice.actions;

export default authSlice.reducer;
