import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stakeholders: [],
};

const stakeholderSlice = createSlice({
  name: "stakeholder",
  initialState,
  reducers: {
    setStakeholders(state, action) {
      state.stakeholders = action.payload;
    },
    addStakeholder(state, action) {
      state.stakeholders.push(action.payload);
    },
  },
});

export const { setStakeholders, addStakeholder } = stakeholderSlice.actions;
export default stakeholderSlice.reducer;
