import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
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

import getAverageColor from 'get-average-color';
import { useSpotify } from '../context/spotify';

const Artist = () => {
    const { artistId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    // const [userSpotify, userInitialising] = useUserSpotify();
    const [spotify, initialising] = useSpotify();

    const playButtonHandler = () => {};

    useEffect(() => {
        if (!initialising) {
            spotify.getArtist(artistId).then((res) => {
                setArtist(res);
            });

            spotify.getArtistTopTracks(artistId).then((res) => {
                setArtist(res.tracks);
            });

            // spotify.getArtistAlbums(artistId).then((res) => {
            //     setArtist(res.data.album)
            // })
        }
    }, [artistId, initialising]);

    const [bannerColor, setBannerColor] = useState('#aaaaaa');

    useEffect(() => {
        if (!isLoading) {
            getAverageColor(artist.images[0].url)
                .then(({ r, g, b }) => {
                    setBannerColor(`rgb(${r}, ${g}, ${b})`);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [artist]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container sx={{ position: 'relative' }}>
            <AspectRatio ratio="16/3">
                <div style={{ backgroundColor: bannerColor }}></div>
            </AspectRatio>
            <Box justifyContent="center" flexDirection="row" display="flex">
                <AspectRatio
                    ratio="1"
                    sx={{
                        width: '32%',
                        position: 'absolute',
                        transform: 'translateY(-50%)',
                        borderRadius: '50%',
                    }}
                    variant="outlined"
                >
                    <img src={artist.images[0].url} />
                </AspectRatio>
            </Box>
            <Box alignItems="center" display="flex" flexDirection="column">
                {/* ppseudo element */}
                <AspectRatio
                    ratio="1"
                    sx={{ width: 'calc(16% + 6px)', mb: 4 }}
                    slotProps={{ root: { style: { opacity: 0 } } }}
                ></AspectRatio>
                {/* ppseudo element */}
                <Typography level="h2">{artist.name}</Typography>
                <br />
                <Box>
                    {artist.genres.map((genre) => (
                        <Chip sx={{ mr: 1 }} variant="outlined">
                            {' '}
                            {genre}{' '}
                        </Chip>
                    ))}
                </Box>
            </Box>
            <br />
            <br />
            <Typography level="h4">Top tracks</Typography>
            <br />
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
                                variant="soft"
                                color="primary"
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
