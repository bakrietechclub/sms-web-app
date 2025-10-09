/* istanbul ignore file */

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/api';

export const asyncAddImplementationAgreement = createAsyncThunk(
  'ia/asyncAddImplementationAgreement',
  async (payload, { rejectWithValue }) => {
    try {
      await api.addImplementationAgreement(payload);
      const data = await api.getImplementationAgreements();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetImplementationAgreements = createAsyncThunk(
  'ia/asyncGetImplementationAgreements',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getImplementationAgreements({ q: query, typeId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetImplementationAgreementsOptions = createAsyncThunk(
  'ia/asyncGetImplementationAgreementsOptions',
  async ({ query, typeId }, { rejectWithValue }) => {
    try {
      const data = await api.getImplementationAgreementsOptions({
        q: query,
        typeId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncGetImplementationAgreementById = createAsyncThunk(
  'ia/asyncGetImplementationAgreementById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await api.getImplementationAgreementById({ id });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteImplementationAgreementById = createAsyncThunk(
  'ia/asyncDeleteImplementationAgreementById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const message = await api.deleteImplementationAgreementById({ id });
      return { id, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncUpdateImplementationAgreementById = createAsyncThunk(
  'ia/asyncUpdateImplementationAgreementById',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await api.updateImplementationAgreementById({ id, payload });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
