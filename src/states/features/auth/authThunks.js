import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const asyncSetAuthUser = createAsyncThunk(
  'auth/asyncSetAuthUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await api.login({ email, password });
      const { accessToken, refreshToken } = data;

      api.putAccessToken(accessToken);
      api.putRefreshToken(refreshToken);

      const profile = await api.getOwnProfile();
      return profile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'auth/asyncUnsetAuthUser',
  async () => {
    api.deleteToken();
    return null;
  }
);
