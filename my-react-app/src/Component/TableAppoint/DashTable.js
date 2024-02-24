import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';
import axios from 'axios';

function DoctorAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem('doctorId');

<<<<<<< HEAD
  // useEffect(() => {
  //   if (doctorId) {
  //     axios.get(`https://retoolapi.dev/ornM79/Appointment`)
  //       .then(response => {
  //         // Filter appointments based on the doctor's ID
  //         const doctorAppointments = response.data.filter(appointment => appointment.Doctor_id === doctorId);
  //         setAppointments(doctorAppointments);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching appointments:', error);
  //       });
  //   }
  // }, [doctorId]); // Include doctorId in the dependency array to re-fetch appointments when it changes

  // "Data_Appointment": "Invalid date"

  axios.get('https://retoolapi.dev/2jV2W1/Appointment')
  .then(response => {
    const numberOfAppointments = response.data.length;
     setAppointments(response.data)
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });
console.log(appointments)
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














=======
  useEffect(() => {
    if (doctorId) {
      axios.get(`https://retoolapi.dev/ornM79/Appointment`)
        .then(response => {
          // Filter appointments based on the doctor's ID
          const doctorAppointments = response.data.filter(appointment => appointment.Doctor_id === doctorId);
          setAppointments(doctorAppointments);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [doctorId]); // Include doctorId in the dependency array to re-fetch appointments when it changes
>>>>>>> 381053cf8a6582885aff893ef86c4fc05354ec04

  return (
    <div>
      {appointments.length > 0 ? (
        <Table striped bordered hover  >
          <thead>
            <tr>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Name</th>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Date</th>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Time</th>
              <th style={{ padding: "40px 40px 40px", fontWeight: "bold" }}>Case</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
<<<<<<< HEAD
                <td>{appointment.Doctor_name}</td>
                <td>{appointment.DateAppointment}</td>
                <td>{appointment.DateAppointment}</td>
                <td>{appointment.Problem}</td>
=======
                <td>{appointment.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.case}</td>
>>>>>>> 381053cf8a6582885aff893ef86c4fc05354ec04
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
