import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidePaneOpen: false,
};

const globalUIStates = createSlice({
    name: 'globalUIStates',
    initialState,
    reducers: {
        setIsSidePaneOpen: (state, action) => {
            state.isSidePaneOpen = action.payload;
        },
    },
});

export default globalUIStates.reducer;
export const { setIsSidePaneOpen } = globalUIStates.actions;
