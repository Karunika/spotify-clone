import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpotifyService from '../hooks/spotify/index';
import Container from '@mui/joy/Container';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import PlayArrow from '@mui/icons-material/PlayArrow';

import Carousel from '../components/carousel';
import SearchCard from '../components/searchCard';

import { SPOTIFY_WEB_API_ENDPOINTS } from '../util/constants/api';

const Artist = () => {
    const { artistId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState(null);
    const { spotifyAxios, isLoading: initializingBaseAxios } =
        SpotifyService.useBaseAxios();
    const { getClientAccessToken } = SpotifyService.useAuth();
    const { ARTIST, TOP_TRACKS, RELATED_ARTISTS } =
        SPOTIFY_WEB_API_ENDPOINTS.ARTIST(artistId);

    const getArtist = async () => {
        const accessToken = await getClientAccessToken();
        const response = await spotifyAxios(accessToken).get(ARTIST);
        console.log(response);

        return response.data;
    };

    const getTopTracks = async () => {
        const accessToken = await getClientAccessToken();
        const response = await spotifyAxios(accessToken).get(TOP_TRACKS, {
            params: {
                market: 'IT',
            },
        });

        return response.data.tracks;
    };

    const getRelatedArtists = async () => {
        const accessToken = await getClientAccessToken();
        const response = await spotifyAxios(accessToken).get(RELATED_ARTISTS);

        setRelatedArtists(response.data.artists);
    };

    const playButtonHandler = () => {};

    useEffect(() => {
        if (!initializingBaseAxios) {
            Promise.all([getArtist(), getTopTracks()]).then(
                ([artistData, topTracksData]) => {
                    setArtist(artistData);
                    setTopTracks(topTracksData);
                    // console.log(topTracksData)
                    setIsLoading(false);
                }
            );
        }
        getRelatedArtists();
    }, [artistId, initializingBaseAxios]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container>
            <img src={artist.images[0].url} />
            <Typography level="h2">{artist.name}</Typography>
            <Box>
                {artist.genres.map((genre) => (
                    <Chip sx={{ mr: 1 }} variant="solid">
                        {' '}
                        {genre}{' '}
                    </Chip>
                ))}
            </Box>
            <br />
            <Typography level="h4">Top tracks</Typography>
            <List>
                {topTracks.map((track) => (
                    <>
                        <ListItem key={track.id}>
                            <ListItemDecorator sx={{ mr: 2 }}>
                                <Avatar src={track.album.images[2].url} />
                            </ListItemDecorator>
                            <ListItemContent>
                                <Typography level="title-sm">
                                    {track.name}
                                </Typography>
                                <Typography level="body-sm">
                                    {track.artists
                                        .map((art) => art.name)
                                        .join(', ')}
                                </Typography>
                            </ListItemContent>
                            <IconButton
                                size="md"
                                variant="solid"
                                color="danger"
                                sx={{
                                    position: 'absolute',
                                    zIndex: 2,
                                    borderRadius: '50%',
                                    right: '1rem',
                                    bottom: 0,
                                }}
                                onClick={playButtonHandler}
                            >
                                <PlayArrow />
                            </IconButton>
                        </ListItem>
                        <Divider inset="gutter" sx={{ mt: 1, mb: 1 }} />
                    </>
                ))}
            </List>
            <br />
            <Typography level="h4">Related Artists</Typography>
            <br />
            <Carousel>
                {(relatedArtists || []).map((artist) => (
                    <SearchCard result={artist} type="artist" />
                ))}
            </Carousel>
        </Container>
    );
};

export default Artist;
