import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddResearchCollab = createAsyncThunk(
  'collab/asyncAddResearchCollab',
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
  },
);

export const asyncGetResearchCollabById = createAsyncThunk(
  'collab/asyncGetResearchCollabById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchCollabById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchCollab = createAsyncThunk(
  'collab/asyncGetResearchCollab',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchCollab({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchCollabOptions = createAsyncThunk(
  'collab/asyncGetResearchCollabOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchCollabOptions({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDeleteResearchCollabById = createAsyncThunk(
  'collab/asyncDeleteResearchCollabById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteResearchCollabById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpdateResearchCollabById = createAsyncThunk(
  'collab/asyncUpdateResearchCollabById',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.updateResearchCollabById(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
