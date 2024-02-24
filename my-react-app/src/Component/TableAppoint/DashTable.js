import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';
import axios from 'axios';

function DoctorAppointmentsTable({id}) {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem('doctorId');
  useEffect(() => {
    if (id) {
      // axios.get(`https://retoolapi.dev/ornM79/Appointment`)
      //   .then(response => {
      //     // Filter appointments based on the doctor's ID
      //     const doctorAppointments = response.data.filter(appointment => appointment.Doctor_id === doctorId);
      //     setAppointments(doctorAppointments);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching appointments:', error);
      //   });

  axios.get(`https://retoolapi.dev/2jV2W1/Appointment?Doctor_Id=${id}`)
  .then(response => {
    const numberOfAppointments = response.data.length;
     setAppointments(response.data)
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });

      axios.get(`https://retoolapi.dev/2jV2W1/Appointment?Doctor_Id=${id}`)
        .then(response => {
          // Filter appointments based on the doctor's ID
          // const doctorAppointments = response.data.filter(appointment => appointment.Doctor_id === doctorId);
          setAppointments(response.data);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [id]); // Include doctorId in the dependency array to re-fetch appointments when it changes

  // "Data_Appointment": "Invalid date"

// console.log(appointments)
// "id": 2,
// "Name": "Stuart Bartel",
// "Paid": true,
// "Price": 8,
// "Problem": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
// "User_id": "user_379",
// "Doctor_Id": "user_899",
// "UserEmail": "groddie12@icio.us",
// "User_Phone": "(555) 274-9755",
// "Doctor_name": "Nye Albin",
// "Data_Appointment": "Invalid date"


  // useEffect(() => {
  //   if (id) {

  //   }
  // }, [id]); // Include doctorId in the dependency array to re-fetch appointments when it changes

  return (
    <div>
      {appointments.length > 0 ? (
        <Table striped bordered hover  >
          <thead>
            <tr>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Name</th>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Phone</th>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Date</th>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Case</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.NameUser}</td>
                <td>{appointment.User_Phone}</td>
                <td>{appointment.DateAppointment}</td>
                <td>{appointment.problemDescription}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No appointments found</p>
      )}
    </div>
  );
}

export default DoctorAppointmentsTable;
