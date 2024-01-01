import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import { useDispatch } from 'react-redux';
import { setQuery } from '../store/search';

const SidePaneListWrapper = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const linkClickHandler = () => {
        navigate('/');
        dispatch(setQuery(''));
    };

    return (
        <List
            fullWidth
            size="sm"
            sx={{
                gap: 1,
                '--ListItem-radius': (theme) => theme.vars.radius.sm,
            }}
        >
            <ListItem>
                <ListItemButton onClick={linkClickHandler}>
                    <ListItemDecorator sx={{ mr: 1, justifyContent: 'center' }}>
                        <HomeIcon />
                    </ListItemDecorator>
                    <ListItemContent>Home</ListItemContent>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => navigate('/')}>
                    <ListItemDecorator sx={{ mr: 1, justifyContent: 'center' }}>
                        <HistoryIcon />
                    </ListItemDecorator>
                    <ListItemContent>Recent</ListItemContent>
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default SidePaneListWrapper;
