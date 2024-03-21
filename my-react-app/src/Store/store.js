// store.js
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../Store/Reducer/authReducer';
import reviewReducer from '../Store/Reducer/Reducerreview';
import { Appiontemtreducer } from './Reducer/ReducerAppointment';
// Combine multiple reducers into a single reducer
const rootReducer = combineReducers({
  auth: authReducer,
  review: reviewReducer,
  data:Appiontemtreducer
});

// Create the Redux store with the combined reducer
const store = createStore(rootReducer, composeWithDevTools());

export default store;
