import { useMemo } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../util/constants/localStorage';

const useSpotifyAxios = () => {
    const spotifyAxios = (accessToken) =>
        axios.create({
            baseURL: 'https://api.spotify.com/v1/',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

    return { spotifyAxios };
};

export default useSpotifyAxios;
