import { createSlice } from '@reduxjs/toolkit';
import {
    AUTH_CODE_ACCESS_TOKEN,
    AUTH_CODE_REFRESH_TOKEN,
    AUTH_CODE_EXPIRES_IN,
    CLIENT_ACCESS_TOKEN,
    CLIENT_EXPIRES_IN,
} from '../util/constants/localStorage';

const AUTH_CODE_KEYS = [
    AUTH_CODE_ACCESS_TOKEN,
    AUTH_CODE_REFRESH_TOKEN,
    AUTH_CODE_EXPIRES_IN,
];
const CLIENT_KEYS = [CLIENT_ACCESS_TOKEN, CLIENT_EXPIRES_IN];

const AUTH_CODE_PREFIX = 'auth_code_';
const CLIENT_PREFIX = 'client_';

const initialState = [...AUTH_CODE_KEYS, ...CLIENT_KEYS].reduce(
    (a, key) => ({
        ...a,
        [key]: localStorage.getItem(key),
    }),
    {}
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthCode: (state, { payload }) => {
            AUTH_CODE_KEYS.forEach((key) => {
                state[key] = payload[key.replace(AUTH_CODE_PREFIX, '')];
            });
        },
        setClientCred: (state, { payload }) => {
            CLIENT_KEYS.forEach((key) => {
                state[key] = payload[key.replace(CLIENT_PREFIX, '')];
            });
        },
    },
});

export default authSlice.reducer;
export const { setAuthCode, setClientCred } = authSlice.actions;

export const localStorageSyncMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    const { type } = action;

    const { auth } = store.getState();

    if (setAuthCode.type === type) {
        AUTH_CODE_KEYS.forEach((key) => {
            localStorage.setItem(key, auth[key]);
        });
    }

    if (setClientCred.type === type) {
        CLIENT_KEYS.forEach((key) => {
            localStorage.setItem(key, auth[key]);
        });
    }

    return result;
};
