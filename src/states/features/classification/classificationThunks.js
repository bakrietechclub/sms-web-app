import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

// --- Klasifikasi ---

export const asyncGetClassifications = createAsyncThunk(
  'classification/asyncGetClassifications',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getClassifications();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncAddClassification = createAsyncThunk(
  'classification/asyncAddClassification',
  async (payload, { rejectWithValue }) => {
    try {
      return await api.addClassification(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpdateClassificationById = createAsyncThunk(
  'classification/asyncUpdateClassificationById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      await api.updateClassificationById({ id, payload });
      return { id, ...payload };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDeleteClassificationById = createAsyncThunk(
  'classification/asyncDeleteClassificationById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteClassificationById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// --- Sub-Klasifikasi ---

export const asyncGetSubClassificationsList = createAsyncThunk(
  'classification/asyncGetSubClassificationsList',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getSubClassificationsList();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncAddSubClassification = createAsyncThunk(
  'classification/asyncAddSubClassification',
  async (payload, { rejectWithValue }) => {
    try {
      return await api.addSubClassification(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpdateSubClassificationById = createAsyncThunk(
  'classification/asyncUpdateSubClassificationById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      await api.updateSubClassificationById({ id, payload });
      return { id, ...payload };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDeleteSubClassificationById = createAsyncThunk(
  'classification/asyncDeleteSubClassificationById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteSubClassificationById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// --- Jenis Surat ---

export const asyncGetLetterTypes = createAsyncThunk(
  'classification/asyncGetLetterTypes',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getLetterTypes();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncAddLetterType = createAsyncThunk(
  'classification/asyncAddLetterType',
  async (payload, { rejectWithValue }) => {
    try {
      return await api.addLetterType(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpdateLetterTypeById = createAsyncThunk(
  'classification/asyncUpdateLetterTypeById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      await api.updateLetterTypeById({ id, payload });
      return { id, ...payload };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDeleteLetterTypeById = createAsyncThunk(
  'classification/asyncDeleteLetterTypeById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteLetterTypeById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
