import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import preloadReducer from './features/preload/preloadSlice';
import potentialReducer from './features/research/potential/potentialSlice';
import audienceReducer from './features/audience/audienceSlice';
import groupReducer from './features/group/groupSlice';
import contactReducer from './features/group/contact/contactSlice';
import mouReducer from './features/partnerships/mou/mouSlice';
import pksReducer from './features/partnerships/pks/pksSlice';
import iaReducer from './features/partnerships/ia/iaSlice';
import torReducer from './features/partnerships/tor/torSlice';
import spkReducer from './features/partnerships/spk/spkSlice';

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    isPreload: preloadReducer,
    potential: potentialReducer,
    audience: audienceReducer,
    group: groupReducer,
    contact: contactReducer,
    mou: mouReducer,
    pks: pksReducer,
    ia: iaReducer,
    tor: torReducer,
    spk: spkReducer,
  },
});
