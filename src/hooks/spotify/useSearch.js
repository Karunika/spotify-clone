import { useEffect, useState, useTransition } from 'react';
import { useSpotify } from '../../context/spotify';

const useSearch = (query, type = 'artist', limit = 20) => {
    const [spotify, initialising] = useSpotify();

    const [result, setResult] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        console.log(isLoading, 'loading value');
        if (isLoading) return;

        const scrollSheet = document.getElementById('scroll-sheet');

        const scrollEventHandler = ({ target }) => {
            const { scrollTop, scrollHeight, offsetHeight } = target;

            if (scrollTop + 5 >= scrollHeight - offsetHeight) {
                setOffset((prev) => prev + 1);
            }
        };

        scrollSheet.addEventListener('scrollend', scrollEventHandler);

        return () => {
            scrollSheet.removeEventListener('scrollend', scrollEventHandler);
        };
    }, [isLoading]);

    useEffect(() => {
        if (initialising || query === '') return;
        setLoading(true);

        const controller = new AbortController();

        startTransition(() => {
            spotify
                .getSearch(query, type, limit, 0, controller)
                .then((res) => setResult(res.data[type + 's'].items))
                .then(() => setLoading(false))
                .catch(() => console.log('aborted'));
        });

        return () => {
            controller.abort();
        };
    }, [query, type, initialising]);

    useEffect(() => {
        if (offset === 0) return;
        setLoading(true);
        spotify
            .getSearch(query, type, limit, limit * offset)
            .then((res) => {
                setResult((result) => [
                    ...result,
                    ...res.data[type + 's'].items,
                ]);
            })
            .then(() => setLoading(false))
            .catch(() => console.log('aborted'));
    }, [offset]);

    return result;
};

export default useSearch;
