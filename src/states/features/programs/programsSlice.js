import { createSlice } from '@reduxjs/toolkit';
import { asyncGetPrograms } from './programsThunks';

const initialState = {
  // Dipisah per varian filter -- "programs" untuk Program LSD (is_program=1),
  // "allPrograms" untuk Penomoran Surat (semua baris, termasuk BCF).
  programs: [],
  allPrograms: [],
  loading: false,
  error: null,
};

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetPrograms.fulfilled, (state, action) => {
        state.loading = false;
        const { isProgram, data } = action.payload;
        if (isProgram === 1) {
          state.programs = data;
        } else {
          state.allPrograms = data;
        }
      })
      .addCase(asyncGetPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default programsSlice.reducer;
