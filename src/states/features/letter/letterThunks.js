import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const asyncAddLetter = createAsyncThunk(
  'letter/asyncAddLetter',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.addLetter(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetLetterById = createAsyncThunk(
  'letter/asyncGetLetterById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getLetterById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetLastLetterNumber = createAsyncThunk(
  'letter/asyncGetLastLetterNumber',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getLastLetterNumber();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetSubClassifications = createAsyncThunk(
  'letter/asyncGetSubClassifications',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getSubClassifications({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetLetters = createAsyncThunk(
  'letter/asyncGetLetters',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getLetter();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteLetterById = createAsyncThunk(
  'letter/asyncDeleteLetterById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteLetterById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateLetterById = createAsyncThunk(
  'letter/asyncUpdateLetterById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateLetterById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
