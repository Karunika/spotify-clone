import { useEffect, useState } from 'react';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import SearchCard from '../components/searchCard';
import Carousel from '../components/carousel';
import { useUserSpotify } from '../context/userSpotify';
import { useSpotify } from '../context/spotify';

const Home = () => {
    const [genres, setGenres] = useState([]);
    const [userGenres, setUserGenres] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    const [userSpotify, userInitialising] = useUserSpotify();
    const [spotify, initialising] = useSpotify();

    useEffect(() => {
        if (!userInitialising) {
            // userSpotify.getTopArtists().then((res) => {
            //     setTopArtists(res.items);
            // });
            // userSpotify.getTopTracks().then((res) => {
            //     setTopTracks(res.items);
            // });
        }
    }, [userInitialising]);

    useEffect(() => {
        if (!initialising) {
            // spotify.getNewAlbumReleases().then((res) => {
            //     setNewReleases(res.albums.items);
            // });
        }
    }, [initialising]);

    return (
        <Container>
            <br />
            <Typography level="h4">Your favourite artists</Typography>
            <br />
            <Carousel>
                {topArtists.map((artist) => (
                    <SearchCard result={artist} type="artist" key={artist.id} />
                ))}
            </Carousel>
            <br />
            <Typography level="h4">Your top tracks</Typography>
            <br />
            <Carousel>
                {topTracks.map((track) => (
                    <SearchCard result={track} type="track" key={track.id} />
                ))}
            </Carousel>
            <br />
            <Typography level="h4">New Releases</Typography>
            <br />
            <Carousel>
                {newReleases.map((track) => (
                    <SearchCard result={track} type="album" key={track.id} />
                ))}
            </Carousel>
        </Container>
    );
};

export default Home;
