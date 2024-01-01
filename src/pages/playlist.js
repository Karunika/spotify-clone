import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Container from '@mui/joy/Container';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { useParams } from 'react-router-dom';

const Playlist = ({ playlist }) => {
    const { playlistId } = useParams();
    return <Container></Container>;
};

export default Playlist;
