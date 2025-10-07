import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const asyncAddGroup = createAsyncThunk(
  'group/asyncAddGroup',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addGroup(payload);
      const data = await api.getGroups();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetGroupById = createAsyncThunk(
  'group/asyncGetGroupById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getGroupById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetGroups = createAsyncThunk(
  'group/asyncGetGroups',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getGroups();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteGroupById = createAsyncThunk(
  'group/asyncDeleteGroupById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteGroupById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateGroupById = createAsyncThunk(
  'group/asyncUpdateGroupById',
  async ({ id, groupUrl }, { rejectWithValue }) => {
    try {
      const data = await api.updateGroupById({ id, groupUrl });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
