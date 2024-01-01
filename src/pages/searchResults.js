import { useState } from 'react';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import SearchCard from '../components/searchCard';
import SpotifyService from '../hooks/spotify';
import { useSelector } from 'react-redux';

const SearchResults = () => {
    const { type, query } = useSelector((store) => store.search);
    const results = SpotifyService.useSearch(query, type);
    console.log('results', results);

    if (!query) return;

    return (
        <Container>
            <Grid
                container
                spacing={3}
                direction="row"
                alignItems="stretch"
                sx={{ justifyContent: 'space-between' }}
            >
                {results &&
                    results.items &&
                    results.items.map((result) => (
                        <Grid key={result.id} sx={{ flexGrow: 1 }}>
                            <SearchCard result={result} type={type} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default SearchResults;
