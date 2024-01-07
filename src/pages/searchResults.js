import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import SearchCard from '../components/searchCard';
import SpotifyService from '../hooks/spotify';
import { useSelector } from 'react-redux';

const SearchResults = () => {
    const { type, query } = useSelector((store) => store.search);
    const results = SpotifyService.useSearch(query, type);

    if (!query) return;

    return (
        <Container>
            <Grid
                container
                direction="row"
                alignItems="stretch"
                justifyContent="space-between"
                gap={4}
                sx={{ height: '100%' }}
            >
                {results &&
                    results.map((result) => (
                        <SearchCard
                            result={result}
                            type={type}
                            key={result.id}
                        />
                    ))}
            </Grid>
        </Container>
    );
};

export default SearchResults;
