import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 'LEAD',
};

const surveyFilterSlice = createSlice({
  name: 'surveyFilter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.activeFilter = action.payload;
    },
  },
});

export const { setFilter } = surveyFilterSlice.actions;
export default surveyFilterSlice.reducer;
