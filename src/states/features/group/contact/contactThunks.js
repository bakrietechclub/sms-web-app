import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddContact = createAsyncThunk(
  'contact/asyncAddContact',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addContact(payload);
      const data = await api.getContactByGroupId({ groupId: payload.groupId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetContactByGroupId = createAsyncThunk(
  'contact/asyncGetContactByGroupId',
  async ({ groupId }, { rejectWithValue }) => {
    try {
      const data = await api.getContactByGroupId({ groupId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetContactById = createAsyncThunk(
  'contact/asyncGetContactById',
  async ({ groupId, contactId }, { rejectWithValue }) => {
    try {
      const data = await api.getContactById({ groupId, contactId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDeleteContactById = createAsyncThunk(
  'contact/asyncDeleteContactById',
  async ({ groupsId, contactId }, { rejectWithValue }) => {
    try {
      const message = await api.deleteContactById({ groupsId, contactId });
      return { contactId, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpdateContactById = createAsyncThunk(
  'contact/asyncUpdateContactById',
  async ({ groupId, contactId, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateContactById({ groupId, contactId, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
