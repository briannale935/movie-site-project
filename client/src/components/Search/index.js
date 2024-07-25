import React from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import AppBar from '../AppBar';

const Search = () => {
    const [searchMovie, setSearchMovie] = React.useState('');
    const [searchActor, setSearchActor] = React.useState('');
    const [searchDirector, setSearchDirector] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [renderSearchResults, setRenderSearchResults] = React.useState(false);

    const serverURL = "";

    const handleSearch = () => {
        callApiFindMovie()
            .then(res => {
                const parsed = JSON.parse(res.express);
                setSearchResults(parsed);
            });
        setRenderSearchResults(searchMovie || searchActor || searchDirector);
    }

    const callApiFindMovie = async () => {
        const url = serverURL + "/api/Search";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                searchMovie,
                searchActor,
                searchDirector
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    return (
        <div>
            <AppBar />
            <Grid container direction="column" alignItems="center" spacing={2} padding={2}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" sx={{ marginBottom: '16px' }}>
                        Search for Movies
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Search by movie"
                            id="search-title"
                            value={searchMovie}
                            onChange={handleInputChange(setSearchMovie)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                height: '80px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Search by actor"
                            id="search-actor"
                            value={searchActor}
                            onChange={handleInputChange(setSearchActor)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                height: '80px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Search by director"
                            id="search-director"
                            value={searchDirector}
                            onChange={handleInputChange(setSearchDirector)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                height: '80px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            id="search-button"
                            variant="contained"
                            onClick={handleSearch}
                            color="primary"
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {renderSearchResults && (
                <div style={{ padding: '10px', width: '100%' }}>
                    {searchResults.map((result, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <Typography variant="h6">Movie Title: {result.movie_name}</Typography>
                            <Typography variant="body1">Director: {result.director_name}</Typography>
                            <Typography variant="body2">Average Rating: {result.average_score}</Typography>
                            <Typography variant="body2">Reviews: {result.all_reviews}</Typography>
                            {index < searchResults.length - 1 && (
                                <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid lightgray' }} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
