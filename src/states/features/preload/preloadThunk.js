// src/features/preload/preloadThunk.js
import api from '../../../utils/api';
import { setAuthUser } from '../auth/authSlice'; // dari slice kamu
import { setIsPreload } from './preloadSlice';

export const asyncPreloadProcess = () => async (dispatch) => {
  try {
    const token = api.getAccessToken();
    if (token) {
      api.putAccessToken(token);
      const profile = await api.getOwnProfile();
      dispatch(setAuthUser(profile));
    } else {
      dispatch(setAuthUser(null));
    }
  } catch (err) {
    dispatch(setAuthUser(null));
    api.deleteToken();
  } finally {
    dispatch(setIsPreload(false));
  }
};
