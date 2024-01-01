import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    query: '',
    type: 'artist',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, { payload }) => {
            state.query = payload;
            return state;
        },
        setType: (state, { payload }) => {
            state.type = payload;
            return state;
        },
    },
});

export default searchSlice.reducer;
export const { setQuery, setType } = searchSlice.actions;
