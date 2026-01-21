import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddResearchPotential = createAsyncThunk(
  'potential/asyncAddResearchPotential',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addResearchPotential(payload);
      const data = await api.getResearchPotential({
        q: payload.query,
        typeId: payload.typeId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchPotentialById = createAsyncThunk(
  'potential/asyncGetResearchPotentialById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotentialById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchPotential = createAsyncThunk(
  'potential/asyncGetResearchPotential',
  async ({ query, typeId, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotential({ q: query, typeId, page });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchPotentialRecommendations = createAsyncThunk(
  'potential/asyncGetResearchPotentialRecommendations',
  async ({ query, typeId, provincieId }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotentialRecommendations({
        q: query,
        typeId,
        provincieId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchPotentialOptions = createAsyncThunk(
  'potential/asyncGetResearchPotentialOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotentialOptions({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetResearchPotentialOptionsById = createAsyncThunk(
  'potential/asyncGetResearchPotentialOptionsById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotentialOptionsById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetDetailResearchPotentialOptionsById = createAsyncThunk(
  'potential/asyncGetDetailResearchPotentialOptionsById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getDetailResearchPotentialOptionsById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDeleteResearchPotentialById = createAsyncThunk(
  'potential/asyncDeleteResearchPotentialById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteResearchPotentialById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpdateResearchPotentialById = createAsyncThunk(
  'potential/asyncUpdateResearchPotentialById',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.updateResearchPotentialById(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
