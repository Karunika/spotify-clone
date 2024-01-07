import axios from 'axios';

const spotifyAxios = (accessToken) => {
    return axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export default spotifyAxios;
