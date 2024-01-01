import { forwardRef } from 'react';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import PlayArrow from '@mui/icons-material/PlayArrow';
import SpotifyService from '../hooks/spotify';
import { useDispatch } from 'react-redux';
import { setQuery } from '../store/search';
import { Link } from 'react-router-dom';
import { usePlayer } from '../hooks/context/player';

const SearchCard = forwardRef(({ result, type }, ref) => {
    const { name, image, desc, link } =
        SpotifyService.useSearchPageRelevantDetails(result, type);
    const dispatch = useDispatch();
    const player = usePlayer();

    const { spotifyAxios } = SpotifyService.useBaseAxios();
    const { getAuthCodeAccessToken } = SpotifyService.useAuth();

    const handleLinkClick = () => {
        dispatch(setQuery(''));
    };

    const playButtonHandler = async () => {
        try {
            const accessToken = await getAuthCodeAccessToken();

            await spotifyAxios(accessToken).post('/me/player/queue', null, {
                params: {
                    uri: result.uri,
                },
            });

            player.nextTrack();
        } catch (err) {
            // do nothing
        }
    };

    return (
        <Card
            ref={ref}
            sx={{
                height: '100%',
                width: { xs: '100%', sm: 200, md: 240, lg: 260 },
            }}
        >
            <CardOverflow>
                <AspectRatio ratio="0.98">
                    <img src={image} />
                </AspectRatio>
                {type === 'track' && (
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
                            transform: 'translateY(26%)',
                        }}
                        onClick={playButtonHandler}
                    >
                        <PlayArrow />
                    </IconButton>
                )}
            </CardOverflow>
            <CardContent>
                <Typography level="title-md">{name}</Typography>
                <Typography level="body-sm">{desc}</Typography>
            </CardContent>
            <CardOverflow variant="soft">
                {link && (
                    <Link onClick={handleLinkClick} to={link}>
                        go
                    </Link>
                )}
            </CardOverflow>
        </Card>
    );
});

export default SearchCard;
