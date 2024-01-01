import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home';
// import SearchResults from './pages/searchResults';
import Artist from './pages/artist';
import Track from './pages/track';
import Callback from './pages/callback';
import Playlist from './pages/playlist';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="artist/:artistId" element={<Artist />} />
                    <Route path="track/:trackId" element={<Track />} />
                    <Route path="playlist/:playlistId" element={<Playlist />} />
                    <Route path="callback" element={<Callback />} />
                    {/* <Route path='my-playlists' element={<Playlist />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
