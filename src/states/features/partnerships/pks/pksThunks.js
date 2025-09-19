import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddPks = createAsyncThunk(
  'pks/asyncAddPks',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.addPks(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetPksById = createAsyncThunk(
  'pks/asyncGetPksById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getPksById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetPks = createAsyncThunk(
  'pks/asyncGetPks',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getPks();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeletePksById = createAsyncThunk(
  'pks/asyncDeletePksById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deletePksById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdatePksById = createAsyncThunk(
  'pks/asyncUpdatePksById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updatePksById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
