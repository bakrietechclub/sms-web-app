/* istanbul ignore file */

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddTor = createAsyncThunk(
  'tor/asyncAddTor',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addTor(payload);
      const data = await api.getTor();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetTorById = createAsyncThunk(
  'tor/asyncGetTorById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getTorById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetTor = createAsyncThunk(
  'tor/asyncGetTor',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getTor({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetTorOptions = createAsyncThunk(
  'tor/asyncGetTorOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getTorOptions({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteTorById = createAsyncThunk(
  'tor/asyncDeleteTorById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteTorById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateTorById = createAsyncThunk(
  'tor/asyncUpdateTorById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateTorById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
