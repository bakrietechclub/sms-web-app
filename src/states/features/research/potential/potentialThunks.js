import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddResearchPotential = createAsyncThunk(
  'potential/asyncAddResearchPotential',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.addResearchPotential(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
  }
);

export const asyncGetResearchPotential = createAsyncThunk(
  'potential/asyncGetResearchPotential',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotential();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetResearchPotentialOptions = createAsyncThunk(
  'potential/asyncGetResearchPotentialOptions',
  async ({ q }, { rejectWithValue }) => {
    try {
      const data = await api.getResearchPotentialOptions({ q });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
  }
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
  }
);
