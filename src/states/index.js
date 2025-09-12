import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import preloadReducer from './features/preload/preloadSlice';

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    isPreload: preloadReducer,
  },
});
