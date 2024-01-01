import { useEffect, useState } from 'react';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import SearchCard from '../components/searchCard';
import Carousel from '../components/carousel';
import SpotifyService from '../hooks/spotify';
import { SPOTIFY_WEB_API_ENDPOINTS } from '../util/constants/api';

const Home = () => {
    const [genres, setGenres] = useState([]);
    const [userGenres, setUserGenres] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const { spotifyAxios } = SpotifyService.useBaseAxios();
    const { getClientAccessToken, getAuthCodeAccessToken } =
        SpotifyService.useAuth();

    const getGenreSeeds = async () => {
        const accessToken = await getClientAccessToken();

        const response = await spotifyAxios(accessToken).get(
            SPOTIFY_WEB_API_ENDPOINTS.GENRE_SEEDS
        );
        setGenres(response.data.genres);
    };

    const getUserTopArtists = async () => {
        const accessToken = await getAuthCodeAccessToken();

        const response = await spotifyAxios(accessToken).get('/me/top/artists');
        setTopArtists(response.data.items);
    };

    useEffect(() => {
        // getGenreSeeds();
        // getUserTopArtists();
        setTopArtists(JSON.parse(localStorage.getItem('response')));
    }, []);

    return (
        <Container>
            <Typography level="h2">You top artists</Typography>
            <br />
            <Carousel>
                {topArtists.map((artist) => (
                    <SearchCard result={artist} type="artist" key={artist.id} />
                ))}
            </Carousel>
        </Container>
    );
};

export default Home;
