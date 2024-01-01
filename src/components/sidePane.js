import { styled, useTheme } from '@mui/joy/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSidePaneOpen } from '../store/globalUIStates';
import Stack from '@mui/joy/Stack';
import List from '@mui/joy/List';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import SidePaneListWrapper from './sidePaneListWrapper';

const SidePane = () => {
    const dispatch = useDispatch();
    const { isSidePaneOpen: isOpen } = useSelector(
        (store) => store.globalUIStates
    );
    const theme = useTheme();

    return (
        <List
            variant="soft"
            sx={{ p: 1, height: '100%', borderRadius: '0 12px 12px 0' }}
        >
            <Stack
                fullWidth
                direction="row"
                sx={{ justifyContent: 'space-between', px: 2 }}
            >
                <p>logo</p>
                <IconButton onClick={() => dispatch(setIsSidePaneOpen(false))}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </Stack>
            <Divider inset="gutter" />
            <SidePaneListWrapper />
            {/* <Queue /> */}
        </List>
    );
};

export default SidePane;
