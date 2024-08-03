import React from 'react';
import { TextField } from '@mui/material';

function ReviewBody({ enteredReview, handleReviewChange }) {
  return (
    <TextField
      id="review-body"
      label="Enter your review"
      value={enteredReview}
      onChange={handleReviewChange}
      multiline
      rows={4}
      fullWidth
      inputProps={{ maxLength: 200 }}
    />
  );
}

export default ReviewBody;
