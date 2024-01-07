import { useEffect, useState, useRef, createContext, useContext } from 'react';
import useAuth from '../hooks/spotify/useAuth';
import newUserSpotifyService from '../hooks/service/userSpotify';

export const UserSpotifyContext = createContext([null, true]);

export const useUserSpotify = () => {
    const context = useContext(UserSpotifyContext);
    return context;
};

const UserSpotifyContextProvider = ({ children }) => {
    const [initialising, setInitialising] = useState(true);
    const [errored, setErrored] = useState(false);

    const { getAuthCodeAccessToken } = useAuth();

    const spotify = useRef(null);

    const initialiseSpotifyService = async () => {
        setInitialising(true);
        const accessToken = await getAuthCodeAccessToken();
        spotify.current = newUserSpotifyService(accessToken);

        spotify.current.baseAxios.interceptors.request.use(
            (config) => config,
            (error) => {
                console.error(error);
                setErrored(true);
            }
        );

        setInitialising(false);
    };

    useEffect(() => {
        initialiseSpotifyService();
    }, []);

    useEffect(() => {
        if (errored) {
            initialiseSpotifyService();
        }
    }, [errored]);

    return (
        <UserSpotifyContext.Provider value={[spotify.current, initialising]}>
            {children}
        </UserSpotifyContext.Provider>
    );
};

export default UserSpotifyContextProvider;
