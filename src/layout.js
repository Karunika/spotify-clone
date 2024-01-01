import { Outlet } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Header from './components/Header';
import SearchResults from './pages/searchResults';
import SidePane from './components/sidePane';
import PlayerContextProvider from './hooks/context/player';

import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import PlayerFooter from './components/playerFooter';

import theme from './util/muiTheme';
import { useSelector } from 'react-redux';
import PanelSplitter from './components/panelSplitter';

const Layout = () => {
    const { query } = useSelector((store) => store.search);

    return (
        <PlayerContextProvider>
            <CssVarsProvider defaultMode={'dark'} theme={theme}>
                <CssBaseline />

                <Stack sx={{ height: '100vh' }}>
                    <PanelSplitter>
                        <SidePane />
                        <>
                            <Sheet
                                sx={{
                                    scroll: 'auto',
                                    overflow: 'scroll',
                                    height: '100%',
                                }}
                            >
                                <Header />
                                {query === '' ? <Outlet /> : <SearchResults />}
                            </Sheet>
                        </>
                    </PanelSplitter>

                    <PlayerFooter />
                </Stack>
            </CssVarsProvider>
        </PlayerContextProvider>
    );
};

export default Layout;
