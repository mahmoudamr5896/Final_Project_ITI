export const ADD_Appiontment = 'ADD_Appiontment';

export const addAppiontment = (AppointmentData) => {
  return {
    type: ADD_Appiontment,
    payload: AppointmentData,
  };
};