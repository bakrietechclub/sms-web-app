import { configureStore } from "@reduxjs/toolkit";
import { authReducer, stakeholderReducer } from "../redux/index";
import activeStakeholderReducer from "../features/stakeholder/activeStakeholderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stakeholder: stakeholderReducer,
    activeStakeholder: activeStakeholderReducer,
  },
});

export default store;
