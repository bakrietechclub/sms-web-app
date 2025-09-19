import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import preloadReducer from './features/preload/preloadSlice';
import potentialReducer from './features/research/potential/potentialSlice';
import audienceReducer from './features/audience/audienceSlice';
import groupReducer from './features/group/groupSlice';
import contactReducer from './features/group/contact/contactSlice';
import mouReducer from './features/partnerships/mou/mouSlice';

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    isPreload: preloadReducer,
    potential: potentialReducer,
    audience: audienceReducer,
    group: groupReducer,
    contact: contactReducer,
    mou: mouReducer,
  },
});
