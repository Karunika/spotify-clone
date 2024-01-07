import spotifyAxios from './spotifyAxios';
import { SPOTIFY_WEB_API_ENDPOINTS } from '../../util/constants/api';

const { TOP_ARTISTS, TOP_TRACKS } = SPOTIFY_WEB_API_ENDPOINTS.ME;

const userSpotifyService = (accessToken) => {
    const baseAxios = spotifyAxios(accessToken);

    const getTopArtists = async () => {
        return (await baseAxios.get(TOP_ARTISTS)).data;
    };

    const getTopTracks = async () => {
        return (await baseAxios.get(TOP_TRACKS)).data;
    };

    return {
        getTopArtists,
        getTopTracks,

        baseAxios,
    };
};

export default userSpotifyService;
