import { useEffect, useState, useRef, createContext, useContext } from 'react';
import useAuth from '../hooks/spotify/useAuth';
import newSpotifyService from '../hooks/service/spotify';

export const SpotifyContext = createContext([null, true]);

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    return context;
};

const SpotifyContextProvider = ({ children }) => {
    const [initialising, setInitialising] = useState(true);
    const [errored, setErrored] = useState(false);

    const { getClientAccessToken } = useAuth();

    const spotify = useRef(null);

    const initialiseSpotifyService = async () => {
        setInitialising(true);
        const accessToken = await getClientAccessToken();
        spotify.current = newSpotifyService(accessToken);

        // spotify.current.baseAxios.interceptors.request.use(
        //     (config) => config,
        //     (error) => {
        //         console.log('what is happening')
        //         console.error(error);
        //         setErrored(true);
        //     }
        // );

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
        <SpotifyContext.Provider value={[spotify.current, initialising]}>
            {children}
        </SpotifyContext.Provider>
    );
};

export default SpotifyContextProvider;
