import { configureStore } from '@reduxjs/toolkit';
import authReducer, { localStorageSyncMiddleware } from './auth';
import globalUIStatesReducer from './globalUIStates';
import playbackReducer from './playback';
import playlistReducer from './playlist';
import searchReducer from './search';

const store = configureStore({
    reducer: {
        auth: authReducer,
        globalUIStates: globalUIStatesReducer,
        playback: playbackReducer,
        playlist: playlistReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageSyncMiddleware),
});

export default store;
