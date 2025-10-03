import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const asyncAddInstitutions = createAsyncThunk(
  'institutions/asyncAddInstitutions',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.addInstitutions(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetInstitutionsById = createAsyncThunk(
  'institutions/asyncGetInstitutionsById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getInstitutionsById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetInstitutions = createAsyncThunk(
  'institutions/asyncGetInstitutions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getInstitutions();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteInstitutionsById = createAsyncThunk(
  'institutions/asyncDeleteInstitutionsById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteInstitutionsById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateInstitutionsById = createAsyncThunk(
  'institutions/asyncUpdateInstitutionsById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateInstitutionsById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetInstitutionsOptions = createAsyncThunk(
  'institutions/asyncGetInstitutionsOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getInstitutionsOptions({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetInstitutionsOptionsById = createAsyncThunk(
  'institutions/asyncGetInstitutionsOptionsById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getInstitutionsOptionsById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
