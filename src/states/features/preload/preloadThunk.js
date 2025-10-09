// src/features/preload/preloadThunk.js
import api from '../../../utils/api';
import { setAuthUser, setSelectedAccess } from '../auth/authSlice'; // dari slice kamu
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

export const asyncPreloadSelectedAccess = () => async (dispatch) => {
  try {
    const selectedAccess = localStorage.getItem('selectedAccess');
    if (selectedAccess) {
      dispatch(setSelectedAccess(selectedAccess));
    } else {
      dispatch(setSelectedAccess(null));
    }
  } catch (err) {
    dispatch(setSelectedAccess(null));
    localStorage.removeItem('selectedAccess');
  }
};
