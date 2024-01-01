import { useState, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

import SpotifyService from '../hooks/spotify/index';

const Profile = ({}) => {
    const { authorise, getAuthCodeAccessToken } = SpotifyService.useAuth();
    const { spotifyAxios } = SpotifyService.useBaseAxios();

    const [isLoading, setIsLoading] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const handleLoginClick = () => {
        authorise();
    };

    const fetchUserConditionally = async () => {
        try {
            const accessToken = await getAuthCodeAccessToken();
            setIsAuthenticated(true);

            const response = await spotifyAxios(accessToken).get('/me');
            const { display_name, images } = response.data;

            // smallest image
            const { image } = images.reduce(
                (acc, img) => {
                    if (img.height <= acc.min) {
                        return {
                            min: img.height,
                            image: img,
                        };
                    }
                    return acc;
                },
                { min: 500, image: {} }
            );

            setUser({
                display_name,
                image,
            });
        } catch (err) {
            // do nothing
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUserConditionally();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <Stack direction="row" alignItems="center">
            <Avatar src={user?.image?.url} />
            <Link href={''}></Link>
            <Typography level="title-lg">{user.display_name}</Typography>
        </Stack>
    ) : (
        <Button variant="contained" onClick={handleLoginClick}>
            Authenticate with spotify
        </Button>
    );
};

export default Profile;
