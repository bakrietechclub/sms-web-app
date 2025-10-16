import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddMou = createAsyncThunk(
  'mou/asyncAddMou',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addMou(payload);
      const data = await api.getMou();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetMouById = createAsyncThunk(
  'mou/asyncGetMouById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getMouById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetMou = createAsyncThunk(
  'mou/asyncGetMou',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getMou({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetMouOptions = createAsyncThunk(
  'mou/asyncGetMouOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getMouOptions({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteMouById = createAsyncThunk(
  'mou/asyncDeleteMouById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteMouById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateMouById = createAsyncThunk(
  'mou/asyncUpdateMouById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateMouById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
