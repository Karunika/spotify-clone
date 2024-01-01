import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSelector } from 'react-redux';

import SpotifyService from '../hooks/spotify';
import { SPOTIFY_WEB_API_ENDPOINTS } from '../util/constants/api';

const Queue = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [queue, setQueue] = useState();
    const [isLaoding, setIsLoading] = useState(true);

    const { isSidePaneOpen: isOpen } = useSelector(
        (store) => store.globalUIStates
    );

    const { spotifyAxios, isLoading: initializingBaseAxios } =
        SpotifyService.useBaseAxios();
    const { getAuthCodeAccessToken } = SpotifyService.useAuth();

    const getUserQueue = async () => {
        try {
            const accessToken = await getAuthCodeAccessToken();
            setIsAuthenticated(true);

            const response = await spotifyAxios(accessToken).get(
                SPOTIFY_WEB_API_ENDPOINTS.QUEUE
            );
            console.log(response.data.queue);

            setIsLoading(false);
            setQueue(response.data.queue);
        } catch (err) {
            setIsAuthenticated(false);
        }
    };

    const handleClick = () => {
        getUserQueue();
    };

    useEffect(() => {
        if (!initializingBaseAxios) {
            getUserQueue();
        }
    }, [initializingBaseAxios]);

    if (!isAuthenticated) {
        return <div>login</div>;
    }

    if (isLaoding) {
        return <div>loading...</div>;
    }

    return (
        <List>
            <button onClick={handleClick}>refresh</button>
            queue
            {queue.map((track) => (
                <div>{JSON.stringify(track)}</div>
            ))}
            {/* <ListItem key={text} disablePadding sx={{ display: 'block' }} id={index}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: isOpen ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: isOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
                </ListItemButton>
            </ListItem> */}
        </List>
    );
};

export default Queue;
