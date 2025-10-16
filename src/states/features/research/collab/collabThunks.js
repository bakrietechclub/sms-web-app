import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddResearchCollab = createAsyncThunk(
  'potential/asyncAddResearchCollab',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addResearchCollab(payload);
      const data = await api.getResearchCollab({
        q: payload.query,
        typeId: payload.typeId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetResearchCollabById = createAsyncThunk(
  'potential/asyncGetResearchCollabById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchCollabById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetResearchCollab = createAsyncThunk(
  'potential/asyncGetResearchCollab',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchCollab({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetResearchCollabOptions = createAsyncThunk(
  'potential/asyncGetResearchCollabOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchCollabOptions({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteResearchCollabById = createAsyncThunk(
  'potential/asyncDeleteResearchCollabById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteResearchCollabById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateResearchCollabById = createAsyncThunk(
  'potential/asyncUpdateResearchCollabById',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.updateResearchCollabById(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
