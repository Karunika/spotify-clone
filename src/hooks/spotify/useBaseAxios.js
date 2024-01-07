import axios from 'axios';

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
