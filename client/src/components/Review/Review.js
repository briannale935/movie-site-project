import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, Card, CardContent } from '@mui/material';
import MovieSelection from './MovieSelection';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import AppBar from '../AppBar'; 

function Review() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [userID] = useState('1'); 

  useEffect(() => {
    fetch('/api/getMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedMovie: false }));
    setShowConfirmation(false);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, enteredTitle: false }));
    setShowConfirmation(false);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, enteredReview: false }));
    setShowConfirmation(false);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedRating: false }));
    setShowConfirmation(false);
  };

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = {};

    if (!selectedMovie) {
      newErrors.selectedMovie = true;
      hasErrors = true;
    }
    if (!enteredTitle) {
      newErrors.enteredTitle = true;
      hasErrors = true;
    }
    if (!enteredReview) {
      newErrors.enteredReview = true;
      hasErrors = true;
    }
    if (!selectedRating) {
      newErrors.selectedRating = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setShowConfirmation(false);
    } else {
      fetch('/api/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieID: selectedMovie,
          userID: userID,
          reviewTitle: enteredTitle,
          reviewContent: enteredReview,
          reviewScore: selectedRating,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Review added:', data);
          setShowConfirmation(true);
        })
        .catch((error) => console.error('Error adding review:', error));
      
      setErrors({});
    }
  };

  return (
    <Box sx={{
      background: 'linear-gradient(111.5deg, rgba(188, 226, 245, 0.9) 21.9%, rgba(255, 180, 159, 0.9) 92.2%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <AppBar /> 
              <Grid container direction="column" alignItems="center" spacing={2} padding={2}>
                    <Typography variant="h4" sx={{
                        marginBottom: '16px',
                        marginTop: '16px',
                        color: 'white',
                        fontWeight: 600,
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                        Review a Movie
                    </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ background: 'white', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <MovieSelection
                movies={movies}
                selectedMovie={selectedMovie}
                handleMovieChange={handleMovieChange}
              />
              {errors.selectedMovie && <Typography color="red">Select your movie</Typography>}
              <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} />
              {errors.enteredTitle && <Typography color="red">Enter your review title</Typography>}
              <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} />
              {errors.enteredReview && <Typography color="red">Enter your review</Typography>}
              <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} />
              {errors.selectedRating && <Typography color="red">Select the rating</Typography>}
              <Button variant="contained" color="primary" onClick={handleSubmit} id="submit-button">
                Submit
              </Button>
              {showConfirmation && (
                <Box sx={{ marginTop: '20px' }}>
                  <Typography variant="h6" id="confirmation-message">Your review has been received</Typography>
                  <Typography variant="subtitle1">Movie: {selectedMovie}</Typography>
                  <Typography variant="subtitle1">Review Title: {enteredTitle}</Typography>
                  <Typography variant="subtitle1">Review Body: {enteredReview}</Typography>
                  <Typography variant="subtitle1">Rating: {selectedRating}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Review;
