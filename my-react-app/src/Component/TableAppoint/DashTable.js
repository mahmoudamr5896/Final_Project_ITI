import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';
import axios from 'axios';

function DoctorAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem('doctorId');

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

  return (
    <div>
      {appointments.length > 0 ? (
        <Table striped bordered hover style={{width:"100%"}}  >
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
                <td>{appointment.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.case}</td>
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
