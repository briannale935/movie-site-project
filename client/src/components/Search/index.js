import React from 'react';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
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
        <div style={{
            background: 'linear-gradient(111.5deg, rgba(188, 226, 245, 0.9) 21.9%, rgba(255, 180, 159, 0.9) 92.2%)',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <AppBar />
            <Grid container direction="column" alignItems="center" spacing={2} padding={2}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" sx={{
                        marginBottom: '16px',
                        color: 'white',
                        fontWeight: 600,
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                        Search for Movies
                    </Typography>
                </Grid>

                <Grid item xs={12} md={8} container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Search by movie"
                            id="search-title"
                            value={searchMovie}
                            onChange={handleInputChange(setSearchMovie)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                marginBottom: '8px',
                                '& .MuiInputBase-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FF6F61',
                                    },
                                },
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
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                marginBottom: '8px',
                                '& .MuiInputBase-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FF6F61',
                                    },
                                },
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
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                marginBottom: '8px',
                                '& .MuiInputBase-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#aaa',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FF6F61',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            id="search-button"
                            variant="contained"
                            onClick={handleSearch}
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 500,
                                backgroundColor: 'rgba(241, 156, 144, 1)'
                            }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>

                {renderSearchResults && (
                    <Grid item xs={12} md={10} lg={8} container justifyContent="center">
                        <Box sx={{
                            padding: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            maxWidth: '100%'
                        }}>
                            {searchResults.map((result, index) => (
                                <Box key={index} sx={{ marginBottom: '20px' }}>
                                    <Typography variant="h6" sx={{ color: '#FF6F61' }} id="movie-title">
                                        Movie Title: {result.movie_name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#4A90E2' }}>
                                        Director: {result.director_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#555' }}>
                                        Average Rating: {result.average_score}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#555' }}>
                                        Reviews:
                                    </Typography>
                                    {result.all_reviews ? (
                                        result.all_reviews.split('|').map((review, reviewIndex) => (
                                            <Typography key={reviewIndex} variant="body2" sx={{ color: '#555', marginBottom: '4px' }}>
                                                “{review.trim()}”
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                            No reviews available
                                        </Typography>
                                    )}
                                    {index < searchResults.length - 1 && (
                                        <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid lightgray' }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default Search;
