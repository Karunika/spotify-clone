import { useDispatch, useSelector } from 'react-redux';
import { setIsSidePaneOpen } from '../store/globalUIStates';
import { styled } from '@mui/joy/styles';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FormControl from '@mui/joy/FormControl';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import SearchIcon from '@mui/icons-material/Search';

import { setQuery, setType } from '../store/search';
import Profile from './profile';

const AppBar = styled('div')(({ theme, open }) => ({
    zIndex: theme.zIndex.AppBar,
    position: 'sticky',
    top: 0,
    width: '100%',
    padding: 12,
}));

const options = ['artist', 'track', 'album', 'playlist'];

const Header = () => {
    const dispatch = useDispatch();
    const { isSidePaneOpen } = useSelector((store) => store.globalUIStates);
    const { query } = useSelector((store) => store.search);
    const search = useSelector((store) => store.search);

    return (
        <AppBar>
            <Stack fullWidth spacing={2} direction="row" alignItems="center">
                {!isSidePaneOpen && (
                    <IconButton
                        variant="plain"
                        // color='inherit'
                        aria-label="open drawer"
                        onClick={() => dispatch(setIsSidePaneOpen(true))}
                        sx={{
                            ...(isSidePaneOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Input
                    fullWidth
                    placeholder="Search a track, artist, album or playlist"
                    variant="soft"
                    size="sm"
                    value={query}
                    startDecorator={<SearchIcon />}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                />
                <FormControl size="sm" sx={{ minWidth: 120 }}>
                    {/* <FormLabel id='' htmlFor='search_typ'>
                        Type
                    </FormLabel> */}
                    <Select
                        slotProps={{
                            button: {
                                id: 'search_type',
                                'aria-labelledby': 'select-label select-button',
                            },
                        }}
                        variant="soft"
                        placeholder="type"
                        value={search.type}
                        onChange={(_, val) => dispatch(setType(val))}
                    >
                        {options.map((option) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                </FormControl>
                <Profile />
            </Stack>
        </AppBar>
    );
};

export default Header;
