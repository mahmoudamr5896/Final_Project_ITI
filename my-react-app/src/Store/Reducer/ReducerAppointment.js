// reducer.js
import { ADD_Appiontment } from '../Actions/ActionAppointment';

const initialState = {
  data: [],
};




export const Appiontemtreducer = (state = initialState, action) => {
    // Your reducer logic  
    switch (action.type) {
    case ADD_Appiontment:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}