import { SPOTIFY_WEB_API_ENDPOINTS } from '../../util/constants/api';
import spotifyAxios from './spotifyAxios';

const { SEARCH, ALBUM, ARTIST, EPISODE, TRACK, PLAYLIST, GENRE_SEEDS } =
    SPOTIFY_WEB_API_ENDPOINTS;

const spotifyService = (accessToken) => {
    const baseAxios = spotifyAxios(accessToken);

    // miscellenous
    const getSearch = async (
        query,
        type,
        limit = 20,
        offset = 0,
        abortController
    ) => {
        return await baseAxios.get(SEARCH, {
            params: {
                q: query,
                type,
                limit,
                offset,
            },
            ...(abortController && { signal: abortController.signal }),
        });
    };

    const getGenres = async () => {
        return (await baseAxios.get(GENRE_SEEDS)).data;
    };

    // Albums
    const getAlbum = async (albumId) => {
        return (await baseAxios.get(ALBUM.ALBUM(albumId))).data;
    };

    const getAlbumTracks = async (albumId, limit = 20, offset = 0) => {
        return (
            await baseAxios.get(ALBUM.TRACKS(albumId), {
                params: {
                    limit,
                    offset,
                },
            })
        ).data;
    };

    const getNewAlbumReleases = async (limit = 20, offset = 0) => {
        return (
            await baseAxios.get(ALBUM.NEW_RELEASES, {
                params: {
                    limit,
                    offset,
                },
            })
        ).data;
    };

    // Artist
    const getArtist = async (artistId) => {
        return (await baseAxios.get(ARTIST.ARTIST(artistId))).data;
    };

    const getArtistTopTracks = async (artistId) => {
        return (
            await baseAxios.get(ARTIST.TOP_TRACKS(artistId), {
                params: {
                    market: 'IT',
                },
            })
        ).data;
    };

    const getArtistAlbums = async (
        artistId,
        include_groups,
        limit = 20,
        offset = 0
    ) => {
        // @params: include_groups: album, single, appears_on, compilation
        return (
            await baseAxios.get(ARTIST.ALBUMS(artistId), {
                params: {
                    include_groups,
                    limit,
                    offset,
                },
            })
        ).data;
    };

    const getArtistRelatedArtists = async (artistId) => {
        return (await baseAxios.get(ARTIST.RELATED_ARTISTS(artistId))).data;
    };

    // episode
    const getEpisode = async (id) => {
        return (await baseAxios.get(EPISODE(id))).data;
    };

    // Track
    const getTrack = async (trackId) => {
        return (await baseAxios.get(TRACK.TRACK(trackId))).data;
    };

    const getTrackAudioFeatures = async (trackId) => {
        return (await baseAxios.get(TRACK.FEATURES(trackId))).data;
    };

    const getTrackAudioAnalysis = async (trackId) => {
        return (await baseAxios.get(TRACK.ANALYSIS(trackId))).data;
    };

    // Playlist
    const getPlaylist = async (playlistId) => {
        return (await baseAxios.get(PLAYLIST.PLAYLIST(playlistId))).data;
    };

    // const getPlaylistItems = async ()

    const getPlaylistCoverImage = async (
        playlistId,
        limit = 20,
        offset = 0
    ) => {
        return (
            await baseAxios.get(
                PLAYLIST.COVER_IMAGE(playlistId, {
                    params: {
                        limit,
                        offset,
                    },
                })
            )
        ).data;
    };

    const getFeaturedPlaylist = async () => {
        return (await baseAxios.get(PLAYLIST.FEATURED)).data;
    };

    const getCategoryPlaylist = async (playlistId) => {
        return (await baseAxios.get(PLAYLIST.CATEGORY(playlistId))).data;
    };

    return {
        getSearch,
        getGenres,

        getAlbum,
        getAlbumTracks,
        getNewAlbumReleases,

        getArtist,
        getArtistAlbums,
        getArtistTopTracks,
        getArtistRelatedArtists,

        getEpisode,

        getTrack,
        getTrackAudioFeatures,
        getTrackAudioAnalysis,

        getPlaylist,
        // getPlaylistItems
        getFeaturedPlaylist,
        getCategoryPlaylist,
        getPlaylistCoverImage,

        baseAxios,
    };
};

export default spotifyService;
