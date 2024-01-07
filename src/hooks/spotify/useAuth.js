import axios from 'axios';
import {
    AUTH_CODE_ACCESS_TOKEN,
    AUTH_CODE_REFRESH_TOKEN,
    CODE_VERIFIER,
    AUTH_CODE_EXPIRES_IN,
    CLIENT_ACCESS_TOKEN,
    CLIENT_EXPIRES_IN,
} from '../../util/constants/localStorage';
import {
    SPOTIFY_AUTH_URL_BASE,
    SPOTIFY_AUTH_URL_ENDPOINTS,
} from '../../util/constants/api';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../util/config';
import { setAuthCode, setClientCred } from '../../store/auth';
import { generateRandomString, sha256, base64encode } from '../../util/auth';
import { useDispatch, useSelector } from 'react-redux';
import scopes from '../../util/scopes';

const useAuthService = () => {
    const authStore = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const authorise = async () => {
        const codeVerifier = generateRandomString(64);
        localStorage.setItem(CODE_VERIFIER, codeVerifier);

        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        const params = {
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope: scopes.join(' '),
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: 'http://localhost:3000/callback',
        };

        const authUrl = new URL(
            SPOTIFY_AUTH_URL_BASE + SPOTIFY_AUTH_URL_ENDPOINTS.AUTHORIZE
        );

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    };

    const fetchAccessToken = async (code) => {
        const cv = window.localStorage.getItem(CODE_VERIFIER);
        const url = SPOTIFY_AUTH_URL_BASE + SPOTIFY_AUTH_URL_ENDPOINTS.TOKEN;

        const body = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:3000/callback',
            client_id: SPOTIFY_CLIENT_ID,
            code_verifier: cv,
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post(url, new URLSearchParams(body), {
            headers,
        });

        const now = new Date().getTime();

        const { access_token, refresh_token, expires_in } = response.data;
        dispatch(
            setAuthCode({
                access_token,
                refresh_token,
                expires_in: now + expires_in * 1000,
            })
        );
    };

    const fetchRefreshToken = async () => {
        const refreshToken = authStore[AUTH_CODE_REFRESH_TOKEN];
        const url = SPOTIFY_AUTH_URL_BASE + SPOTIFY_AUTH_URL_ENDPOINTS.TOKEN;

        const body = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: SPOTIFY_CLIENT_ID,
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post(url, new URLSearchParams(body), {
            headers,
        });

        const now = new Date().getTime();

        const { access_token, refresh_token, expires_in } = response.data;
        dispatch(
            setAuthCode({
                access_token,
                refresh_token,
                expires_in: now + expires_in * 1000,
            })
        );
    };

    const getAuthCodeAccessToken = async (callback) => {
        const accessToken = authStore[AUTH_CODE_ACCESS_TOKEN];
        const expiresIn = +authStore[AUTH_CODE_EXPIRES_IN];

        if (!accessToken) {
            throw new Error('');
        }

        const now = new Date().getTime();

        // -100 to fetch in a little advance
        if (now > expiresIn - 100) {
            await fetchRefreshToken(callback);
        }

        return accessToken;
    };

    const getClientAccessToken = async () => {
        const accessToken = authStore[CLIENT_ACCESS_TOKEN];
        const expiresIn = +authStore[CLIENT_EXPIRES_IN];

        const now = new Date().getTime();

        if (!accessToken || now > expiresIn - 100) {
            const url =
                SPOTIFY_AUTH_URL_BASE + SPOTIFY_AUTH_URL_ENDPOINTS.TOKEN;
            const body = {
                grant_type: 'client_credentials',
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            };
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const response = await axios.post(url, body, { headers });
            const now = new Date().getTime();

            const { access_token, expires_in } = response.data;
            dispatch(
                setClientCred({
                    access_token,
                    expires_in: now + expires_in * 1000,
                })
            );

            return response.data.access_token;
        }

        return accessToken;
    };

    return {
        authorise,
        fetchAccessToken,
        getAuthCodeAccessToken,
        getClientAccessToken,
    };
};

export default useAuthService;
