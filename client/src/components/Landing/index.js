import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import AppBar from '../AppBar';

const Landing = () => {
    return (
        <div style={{
            background: 'linear-gradient(111.5deg, rgba(188, 226, 245, 0.9) 21.9%, rgba(255, 180, 159, 0.9) 92.2%)',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <AppBar />
            <Container maxWidth="md" sx={{ marginTop: '80px' }}>
                <Box sx={{ textAlign: 'center', my: 5 }}>
                <Typography variant="h2" sx={{
                    marginBottom: '16px',
                    color: 'white',
                    fontWeight: 600,
                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                    Welcome to MovieMatrix!
                </Typography>

                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ background: '#ffffffcc', borderRadius: '8px', p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ 
                            color: 'rgb(105,105,105)', 
                            fontWeight: 'bold', 
                            }}>
                                Search for Movies
                            </Typography>
                            <Typography variant="body1">
                                Search for movies, and see their reviews.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ background: '#ffffffcc', borderRadius: '8px', p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                            color: 'rgb(105,105,105)',
                            fontWeight: 'bold', 
                            }}>
                                Review a Movie
                            </Typography>
                            <Typography variant="body1">
                                Add your review and ratings for a movie.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ background: '#ffffffcc', borderRadius: '8px', p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                            color: 'rgb(105,105,105)',
                            fontWeight: 'bold', 
                            }}>
                                Browse Trailers
                            </Typography>
                            <Typography variant="body1">
                                Browse trailers for movies and add your comments.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Landing;
