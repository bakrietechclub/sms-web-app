/* istanbul ignore file */

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddSpk = createAsyncThunk(
  'spk/asyncAddSpk',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.addSpk(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetSpkById = createAsyncThunk(
  'spk/asyncGetSpkById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getSpkById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetSpk = createAsyncThunk(
  'spk/asyncGetSpk',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getSpk();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteSpkById = createAsyncThunk(
  'spk/asyncDeleteSpkById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteSpkById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateSpkById = createAsyncThunk(
  'spk/asyncUpdateSpkById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateSpkById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
