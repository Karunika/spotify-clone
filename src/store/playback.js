import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    context: {
        uri: 'spotify:album:xxx',
        metadata: {},
    },
    disallows: {
        pausing: false,
        peeking_next: false,
        peeking_prev: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false,
    },
    paused: false,
    position: 0,
    repeat_mode: 0,
    shuffle: false,
    track_window: {
        current_track: {},
    },
    volume: 0,
};

const playbackSlice = createSlice({
    name: 'playback',
    initialState,
    reducers: {
        update: (state, { payload }) => {
            state = payload;
            console.log(payload);
            // state.track_window.current_track = payload.track_window.current_track;
            return state;
        },
        setPaused: (state, { payload }) => {
            state.paused = payload;
        },
    },
});

export default playbackSlice.reducer;
export const { update, setPaused } = playbackSlice.actions;
