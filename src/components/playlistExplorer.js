import { useMemo, useState } from 'react';
import { selectParsedTree, selectEntityByID } from '../store/playlist';
import { useSelector } from 'react-redux';

import MuiAccordian from '@mui/joy/Accordion';
import MuiAccordianSummary from '@mui/joy/AccordionSummary';
import MuiAccordianDetails from '@mui/joy/AccordionDetails';

const PlaylistExplorer = () => {
    return <Playlist />;
};

const Playlist = ({ parent = 'root', count = 0 }) => {
    const playlist = useSelector((store) => store.playlist);
    const tree = useMemo(() => selectParsedTree(playlist), [playlist]);

    if (!tree[parent]) return;

    const list = [];
    for (
        let curr = tree[parent][0];
        curr !== undefined;
        curr = tree[parent][curr]
    )
        list.push(
            <Entity entity={selectEntityByID(playlist, curr)} count={count} />
        );

    return list;
};

const Entity = ({ entity, count }) => {
    const [collapsed, setCollapsed] = useState(false);

    if (!entity) return;

    const { id, isPlaylist } = entity;

    return (
        <MuiAccordian
            expanded={collapsed[id]}
            onChange={() => setCollapsed((prev) => !prev)}
        >
            <MuiAccordianSummary>
                <div>{id}</div>
            </MuiAccordianSummary>
            {isPlaylist && (
                <MuiAccordianDetails>
                    <Playlist parent={id} count={count + 1} />
                </MuiAccordianDetails>
            )}
        </MuiAccordian>
    );
};

export default PlaylistExplorer;
