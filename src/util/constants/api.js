module.exports = {
    SPOTIFY_AUTH_URL_BASE: 'https://accounts.spotify.com',
    SPOTIFY_AUTH_URL_ENDPOINTS: {
        AUTHORIZE: '/authorize',
        TOKEN: '/api/token',
    },
    SPOTIFY_WEB_API_BASE: 'https://api.spotify.com/v1',
    SPOTIFY_WEB_API_ENDPOINTS: {
        SEARCH: `/search`,
        ALBUM: {
            NEW_RELEASES: `/browse/new-releases`,
            ALBUM: (id) => `/album/${id}`,
            TRACKS: (id) => `albums/${id}/tracks`,
        },
        ARTIST: {
            ARTIST: (id) => `/artists/${id}`,
            TOP_TRACKS: (id) => `/artists/${id}/top-tracks`,
            ALBUMS: (id) => `/artists/${id}/albums`,
            RELATED_ARTISTS: (id) => `/artists/${id}/related-artists`,
        },
        EPISODE: (id) => `/episodes/${id}`,
        PLAYLIST: {
            PLAYLIST: (id) => `/playlists/${id}`, // get
            ITEMS: (id) => `/playlists/${id}/tracks`, // get, put, post, delete
            FEATURED: `/browse/featured-playlists`,
            CATEGORY: (id) => `/browse/categories/${id}/playlists`,
            COVER_IMAGE: (id) => `/playlists/${id}/images`,
        },
        TRACK: {
            TRACK: (id) => `/tracks/${id}`,
            FEATURES: (id) => `/audio-features/${id}`,
            ANALYSIS: (id) => `/audio-analysis/${id}`,
        },
        ME: {
            ALBUM: {
                CRUD: `/me/albums`, // get, put, delete
                CHECK_SAVED: `/me/albums/contains`,
            },
            EPISODE: {
                CRUD: `/me/episodes`, // get, put, delete
                CHECK_SAVED: `/me/episodes/contains`,
            },
            PLAYLIST: {
                CRUD: `/me/playlists`,
                CHANGE_DETAILS: (id) => `/playlists/${id}`, // put
                CRUD_ITEMS: (id) => `/playlists/${id}/tracks`, // get, put, post, delete
                FOLLOW: (id) => `/playlists/${id}/follow`, // put, delete
                CHECK: (id) => `/playlists/${id}/followers/contains`,
                COVER_IMAGE: (id) => `/playlists/${id}/images`, // put
            },
            TRACK: {
                CRUD: `/me/tracks`, // get, put, delete
                CHECK_SAVED: `/me/tracks/contains`,
            },
            ARTIST_OR_USER: {
                FOLLOW: `/me/following`, // get, put, delete
                CHECK_FOLLOW: `/me/following/contains`,
            },
            USER: `/me`,
            TOP_ARTISTS: `/me/top/artists`,
            TOP_TRACKS: `/me/top/tracks`,
        },
        USER: (id) => ({
            PROFILE: `/users/${id}`,
        }),
        PLAYER: {
            TRANSFER_PLAYBACK: `/me/player`,
            RECENTLY_PLAYED: `/me/player/recently-played`,
            QUEUE: `/me/player/queue`,
        },
        GENRE_SEEDS: '/recommendations/available-genre-seeds',
        MARKETS: '/markets',
    },
};
