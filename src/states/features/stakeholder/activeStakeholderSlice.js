import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStakeholder: null,
};

const activeStakeholderSlice = createSlice({
  name: 'activeStakeholder',
  initialState,
  reducers: {
    setActiveStakeholder(state, action) {
      state.activeStakeholder = action.payload;
    },
    resetActiveStakeholder(state) {
      state.activeStakeholder = null;
    },
  },
});

export const { setActiveStakeholder, resetActiveStakeholder } =
  activeStakeholderSlice.actions;
export default activeStakeholderSlice.reducer;
