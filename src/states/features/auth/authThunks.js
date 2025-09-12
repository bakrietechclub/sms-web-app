import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAction, logoutAction } from '../../../utils/action';

export const asyncSetAuthUser = createAsyncThunk(
  'auth/asyncSetAuthUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await loginAction({ email, password });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'auth/asyncUnsetAuthUser',
  async () => {
    logoutAction();
    return null;
  }
);
