// reducer.js
import { ADD_REVIEW } from '../Actions/actionreview';

const initialState = {
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
