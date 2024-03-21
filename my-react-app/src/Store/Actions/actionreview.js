// actions.js
// actionTypes.js
export const ADD_REVIEW = 'ADD_REVIEW';

export const addReview = (reviewData) => {
  return {
    type: ADD_REVIEW,
    payload: reviewData,
  };
};
