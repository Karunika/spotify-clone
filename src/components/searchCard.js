import { forwardRef } from 'react';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { useDispatch } from 'react-redux';
import { setQuery } from '../store/search';
import { Link } from 'react-router-dom';
import { usePlayer } from '../context/player';
import SpotifyService from '../hooks/spotify';

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
                width: { xs: '100%', sm: 160, lg: 200 },
                flexGrow: 1,
            }}
        >
            <CardOverflow>
                <AspectRatio ratio="1">
                    <img src={image} />
                </AspectRatio>
                {type === 'track' && (
                    <IconButton
                        size="md"
                        variant="solid"
                        color="primary"
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
                <Typography
                    level="title-md"
                    sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    level="body-sm"
                    sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {desc}
                </Typography>
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
