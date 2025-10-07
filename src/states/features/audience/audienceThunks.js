import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const asyncAddAudience = createAsyncThunk(
  'audience/asyncAddAudience',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addAudience(payload);
      const data = await api.getAudiences();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetAudienceById = createAsyncThunk(
  'audience/asyncGetAudienceById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getAudienceById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetAudiences = createAsyncThunk(
  'audience/asyncGetAudiences',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAudiences();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteAudienceById = createAsyncThunk(
  'audience/asyncDeleteAudienceById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteAudienceById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateAudienceById = createAsyncThunk(
  'audience/asyncUpdateAudienceById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateAudienceById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
