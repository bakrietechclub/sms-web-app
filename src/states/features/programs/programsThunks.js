import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

// `isProgram` dipakai sebagai bagian dari cache key (lihat slice) supaya
// hasil "hanya program sungguhan" (Program LSD) dan "semua, termasuk BCF"
// (Penomoran Surat) tidak saling menimpa di store.
export const asyncGetPrograms = createAsyncThunk(
  'programs/asyncGetPrograms',
  async ({ isProgram } = {}, { rejectWithValue }) => {
    try {
      const data = await api.getPrograms({ isProgram });
      return { isProgram, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
