import { configureStore } from "@reduxjs/toolkit";
import { authReducer, stakeholderReducer } from "../redux/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stakeholder: stakeholderReducer,

  },
});

export default store;
