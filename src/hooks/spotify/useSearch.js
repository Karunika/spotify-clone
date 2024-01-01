import { useEffect, useState, useTransition } from 'react';
import { SPOTIFY_WEB_API_ENDPOINTS } from '../../util/constants/api';
import useBaseAxios from './useBaseAxios';
import useAuth from './useAuth';

const useSearch = (query, type = 'artist') => {
    const { getClientAccessToken } = useAuth();

    const [result, setResult] = useState([]);
    const [isPending, startTransition] = useTransition();

    const { spotifyAxios } = useBaseAxios();

    const fetchResponse = async (abortController) => {
        const accessToken = await getClientAccessToken();

        const response = await spotifyAxios(accessToken).get(
            SPOTIFY_WEB_API_ENDPOINTS.SEARCH,
            {
                params: {
                    q: query,
                    type,
                },
                singal: abortController.signal,
            }
        );

        setResult(response.data[type + 's']);
    };

    useEffect(() => {
        const controller = new AbortController();
        if (query === '') {
            setResult(null);
        } else {
            startTransition(() => {
                // non-urgent state updates
                fetchResponse(controller);
            });
        }
        return () => {
            controller.abort();
        };
    }, [query, type]);

    return result;
};

export default useSearch;
