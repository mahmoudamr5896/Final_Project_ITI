import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';
import axios from 'axios';

function DoctorAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = sessionStorage.getItem('doctorId'); // Retrieve doctor ID from session storage

  useEffect(() => {
    if (doctorId) {
      axios.get(`https://retoolapi.dev/ornM79/Appointment`)
        .then(response => {
          // Filter appointments based on the doctor's ID
          const doctorAppointments = response.data.filter(appointment => appointment.Doctor_Id === doctorId);
          setAppointments(doctorAppointments);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [doctorId]); // Include doctorId in the dependency array to re-fetch appointments when it changes

  return (
    <div>
      {appointments.length > 0 ? (
       <Table striped bordered hover className="tableContainer">
          <thead>
            <tr>
              <th className='Dash_th'>Name</th>
              <th >Phone</th>
              <th >Date</th>
              <th >Case</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.Name}</td> {/* Change to appointment.Name */}
                <td>{appointment.User_Phone}</td>
                <td>{appointment.Data_Appointment}</td> {/* Change to appointment.Data_Appointment */}
                <td>{appointment.Problem}</td> {/* Change to appointment.Problem */}
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
