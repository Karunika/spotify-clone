import { useEffect, useState, useRef, createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyService from '../hooks/spotify';
import { setPaused, update } from '../store/playback';

export const PlayerContext = createContext({ hello: 'hello' });

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    return context;
};

const PlayerContextProvider = ({ children }) => {
    const [ready, setReady] = useState(false);
    const [playerLoaded, setPlayerLoaded] = useState(false);

    const { getAuthCodeAccessToken } = SpotifyService.useAuth();
    const { spotifyAxios } = SpotifyService.useBaseAxios();

    const dispatch = useDispatch();

    const player = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.defer = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            setReady(true);
        };

        return () => {
            script.remove();
        };
    }, []);

    const instantiatePlayer = async () => {
        try {
            const accessToken = await getAuthCodeAccessToken();

            player.current = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb) => {
                    cb(accessToken);
                },
            });

            player.current.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);

                player.current.setRepeatMode = (repeatMode) => {
                    const modes = ['off', 'context', 'track'];
                    return spotifyAxios(accessToken).put(
                        '/me/player/repeat',
                        null,
                        {
                            params: {
                                state: modes[repeatMode],
                            },
                        }
                    );
                };

                spotifyAxios(accessToken).put('/me/player', {
                    device_ids: [device_id],
                });

                setPlayerLoaded(true);
            });

            if (process.env.NODE_ENV === 'development') {
                player.current.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
            }

            player.current.addListener('player_state_changed', (state) => {
                // console.log('player state changed');
                if (!state) return;

                // console.log('state:', state);
                dispatch(update(state));
                dispatch(setPaused(state.paused));
            });

            player.current.connect();
        } catch (err) {
            // user not authenticated
        }
    };

    useEffect(() => {
        if (ready) {
            instantiatePlayer();
        }

        return () => {
            if (player.current) {
                player.current.disconnect();
            }
        };
    }, [ready]);

    return (
        <PlayerContext.Provider value={player.current}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
