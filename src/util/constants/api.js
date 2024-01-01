module.exports = {
    SPOTIFY_AUTH_URL_BASE: 'https://accounts.spotify.com',
    SPOTIFY_AUTH_URL_ENDPOINTS: {
        AUTHORIZE: '/authorize',
        TOKEN: '/api/token',
    },
    SPOTIFY_WEB_API_BASE: 'https://api.spotify.com/v1',
    SPOTIFY_WEB_API_ENDPOINTS: {
        SEARCH: `/search`,
        ARTIST: (id) => ({
            ARTIST: `/artists/${id}`,
            TOP_TRACKS: `/artists/${id}/top-tracks`,
            RELATED_ARTISTS: `/artists/${id}/related-artists`,
        }),
        TRACK: (id) => ({
            ANALYSIS: `/audio-analysis/${id}`,
        }),
        QUEUE: '/me/player/queue',
        GENRE_SEEDS: '/recommendations/available-genre-seeds',
    },
};
