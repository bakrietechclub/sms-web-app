import { configureStore } from "@reduxjs/toolkit";
import { authReducer, stakeholderReducer } from "../redux/index";
import activeStakeholderReducer from "../features/stakeholder/activeStakeholderSlice";
import surveyFilterReducer from "./surveyFilterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stakeholder: stakeholderReducer,
    activeStakeholder: activeStakeholderReducer,
    surveyFilter: surveyFilterReducer,
  },
});

export default store;
