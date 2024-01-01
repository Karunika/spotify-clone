import { createSlice } from '@reduxjs/toolkit';

const obj = (id, parent, previous, isPlaylist) => {
    return { id, parent, previous, isPlaylist };
};

const list = [
    obj('a', 'root', 'b', true),
    obj('root', null, null, true),
    obj('b', 'root', null, true),
    obj('c', 'root', 'a', false),
    obj('d', 'a', null, false),
    obj('e', 'a', 'd', true),
    obj('f', 'a', 'e', false),
    obj('g', 'b', null, true),
    obj('h', 'b', 'i', false),
    obj('i', 'b', 'g', false),
    obj('j', 'g', null, false),
];

const initialState = {
    records: list,
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    selectors: {
        // TODO: memoize this
        selectParsedTree: (state) => {
            const tree = {};

            state.records.forEach((item) => {
                if (item.id === 'root') {
                    return;
                }
                if (tree[item.parent] === undefined) {
                    tree[item.parent] = {};
                }
                if (item.previous === null) {
                    tree[item.parent][0] = item.id;
                } else {
                    tree[item.parent][item.previous] = item.id;
                }
            });
            console.log(tree);

            return tree;
        },
        selectEntityByID: (state, id) => {
            const res = state.records.filter((record) => record.id === id);
            return res.length === 1 ? res[0] : null;
        },
    },
});

export default playlistSlice.reducer;
export const { selectParsedTree, selectEntityByID } =
    playlistSlice.getSelectors();
