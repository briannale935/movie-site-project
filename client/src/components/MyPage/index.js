import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button, Card, CardContent, Box } from '@mui/material';
import AppBar from '../AppBar';

const MyPage = () => {
    const [trailers, setTrailers] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const userID = 1; 

    const fetchTrailersWithComments = async () => {
        const response = await fetch("/api/getTrailersWithComments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.status !== 200) throw Error(data.message);

        const trailersWithComments = data.reduce((acc, row) => {
            let trailer = acc.find(trailer => trailer.trailerID === row.trailerID);
            if (!trailer) {
                trailer = {
                    trailerID: row.trailerID,
                    url: row.url,
                    movieName: row.movieName,
                    comments: []
                };
                acc.push(trailer);
            }
            if (row.commentID) {
                trailer.comments.push({
                    commentID: row.commentID,
                    userID: row.userID,
                    commentText: row.commentText
                });
            }
            return acc;
        }, []);

        setTrailers(trailersWithComments);
    };

    useEffect(() => {
        fetchTrailersWithComments();
    }, []);

    const handleAddComment = async () => {
        if (selectedTrailer && newComment.trim()) {
            const response = await fetch("/api/addComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    trailerID: selectedTrailer,
                    userID,
                    commentText: newComment,
                }),
            });
            const data = await response.json();
            if (response.status === 200) {
                fetchTrailersWithComments();
                setNewComment('');
            } else {
                console.error(data.message);
            }
        }
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
                        Browse Trailers and Comments
                    </Typography>
                </Grid>

                <Grid container spacing={2} justifyContent="center">
                    {trailers.map((trailer) => (
                        <Grid item xs={12} sm={6} md={4} key={trailer.trailerID}>
                            <Card sx={{
                                height: '100%',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                                backdropFilter: 'blur(5px)',
                                backgroundImage: 'url("path/to/texture.png")', 
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    backgroundColor: 'transparent'
                                }}>
                                    <Typography variant="h6" sx={{
                                        color: 'rgba(241, 156, 144, 1)',
                                        fontWeight: 600
                                    }}>
                                        Movie: {trailer.movieName}
                                    </Typography>
                                    <Typography variant="body1" sx={{
                                        marginBottom: '8px',
                                        color: '#4A90E2',
                                        textDecoration: 'none'
                                    }}>
                                        <a href={trailer.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                                            Watch Trailer
                                        </a>
                                    </Typography>
                                    <Box sx={{
                                        flexGrow: 1,
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        marginBottom: '8px'
                                    }}>
                                        <Typography sx={{ fontWeight: 600, marginBottom: '4px', color: '#616161' }}>Comments:</Typography>
                                        {trailer.comments.map((comment) => (
                                            <Typography key={comment.commentID} variant="body2" sx={{ color: '#555' }}>
                                                {comment.commentText}
                                            </Typography>
                                        ))}
                                    </Box>
                                    <TextField
                                        label="Add a comment"
                                        value={selectedTrailer === trailer.trailerID ? newComment : ''}
                                        onChange={(e) => {
                                            setSelectedTrailer(trailer.trailerID);
                                            setNewComment(e.target.value);
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        sx={{ marginBottom: '8px' }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleAddComment}
                                        sx={{ borderRadius: '8px', fontWeight: 500}}
                                    >
                                        Add Comment
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default MyPage;
