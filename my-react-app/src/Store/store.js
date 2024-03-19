// store.js
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../Store/Reducer/authReducer';

const store = createStore(authReducer, composeWithDevTools());

export default store;
