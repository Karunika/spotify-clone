import { Outlet } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import SearchResults from './pages/searchResults';
import SidePane from './components/sidePane';
import PlayerFooter from './components/playerFooter';
import Header from './components/header';
import PlayerContextProvider from './context/player';
import SpotifyContextProvider from './context/spotify';
import UserSpotifyContextProvider from './context/userSpotify';

import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';

import theme from './util/muiTheme';
import { useSelector } from 'react-redux';
import PanelSplitter from './components/panelSplitter';

import { Provider } from 'react-redux';
import store from './store/store';

const Layout = () => {
    const { query } = useSelector((store) => store.search);

    return (
        <Provider store={store}>
            <PlayerContextProvider>
                <SpotifyContextProvider>
                    <UserSpotifyContextProvider>
                        <CssVarsProvider defaultMode={'dark'} theme={theme}>
                            <CssBaseline />

                            <Stack sx={{ height: '100vh' }}>
                                <PanelSplitter>
                                    <SidePane />
                                    <>
                                        <Sheet
                                            sx={{
                                                scroll: 'auto',
                                                overflowY: 'scroll',
                                                height: '100%',
                                            }}
                                            slotProps={{
                                                root: {
                                                    id: 'scroll-sheet',
                                                },
                                            }}
                                        >
                                            <Header />
                                            {query === '' ? (
                                                <Outlet />
                                            ) : (
                                                <SearchResults />
                                            )}
                                        </Sheet>
                                    </>
                                </PanelSplitter>

                                <PlayerFooter />
                            </Stack>
                        </CssVarsProvider>
                    </UserSpotifyContextProvider>
                </SpotifyContextProvider>
            </PlayerContextProvider>
        </Provider>
    );
};

export default Layout;
