import { useEffect, useState } from 'react';
import Container from '@mui/joy/Container';
import { useSelector } from 'react-redux';
import SpotifyService from '../hooks/spotify';
import { SPOTIFY_WEB_API_ENDPOINTS } from '../util/constants/api';

const FullScreenPlayer = () => {
    const {
        volume,
        paused,
        track_window: { current_track },
    } = useSelector((store) => store.playback);
    const { spotifyAxios } = SpotifyService.useBaseAxios();
    const { getClientAccessToken } = SpotifyService.useAuth();
    const [analysis, setAnalysis] = useState([]);

    const { TRACK } = SPOTIFY_WEB_API_ENDPOINTS;

    const getAudioAnalysis = async () => {
        const accessToken = await getClientAccessToken();

        const response = await spotifyAxios(accessToken).get(
            TRACK.ANALYSIS(current_track.id)
        );
        setAnalysis(response.data);
    };

    useEffect(() => {
        if (current_track.id) {
            getAudioAnalysis();
        }
    }, [current_track.id]);

    if (!current_track) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {/* <img src={(current_track.album.images[2].url)} /> */}
            {JSON.stringify(current_track)}
            {/* <button onClick={() => instantiatePlayer(localStorage.getItem(AUTH_CODE_ACCESS_TOKEN))}>play</button> */}
        </Container>
    );
};

export default FullScreenPlayer;
