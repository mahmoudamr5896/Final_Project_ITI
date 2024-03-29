import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './table.css';
import axios from 'axios';

function DoctorAppointmentsTable({ id }) {
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`https://retoolapi.dev/2jV2W1/Appointment?Doctor_Id=${id}`)
        .then(response => {
          setAppointments(response.data);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [id]);

  const handleApprove = (appointmentId) => {
    // Find the appointment to be approved
    const appointmentToApprove = appointments.find(appointment => appointment.id === appointmentId);

    // Update the accepted appointments table
    setAcceptedAppointments(prevAppointments => [...prevAppointments, appointmentToApprove]);

    // Remove the approved appointment from the pending appointments table
    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));

    // Make a request to your backend API to add the approved appointment
    axios.post('https://retoolapi.dev/2jV2W1/AcceptedAppointment', appointmentToApprove)
      .then(response => {
        console.log('Appointment approved and added to Accepted Appointments:', response.data);
      })
      .catch(error => {
        console.error('Error adding appointment to Accepted Appointments:', error);
      });

    // Make a request to your backend API to approve the appointment
    // Implement your approval logic here
    console.log('Appointment approved:', appointmentId);
  };

  const handleReject = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRejectionReason('');
  };

  const handleModalSubmit = () => {
    // Make a request to your backend API to delete the rejected appointment
    axios.delete(`https://retoolapi.dev/2jV2W1/Appointment/${selectedAppointmentId}`)
      .then(response => {
        console.log('Appointment rejected and removed from the API');
        setShowModal(false);
        setRejectionReason('');

        // Remove the rejected appointment from the pending appointments table
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== selectedAppointmentId));
      })
      .catch(error => {
        console.error('Error rejecting appointment:', error);
      });
  };

  const refreshAppointments = () => {
    // Fetch updated appointments after approval or rejection
    axios.get(`https://retoolapi.dev/2jV2W1/Appointment?Doctor_Id=${id}`)
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Pending Appointments</h2>
      {currentAppointments.length > 0 ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Case</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.NameUser}</td>
                  <td>{appointment.User_Phone}</td>
                  <td>{appointment.DateAppointment}</td>
                  <td>{appointment.problemDescription}</td>
                  <td>
                    <Button variant="success" onClick={() => handleApprove(appointment.id)}>Approve</Button>
                    <Button variant="danger" onClick={() => handleReject(appointment.id)}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ul className="pagination" style={{ marginLeft: '40%' }}>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage - 1)} className="page-link" disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            <li className={`page-item ${currentPage === Math.ceil(appointments.length / appointmentsPerPage) ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={currentPage === Math.ceil(appointments.length / appointmentsPerPage)}>
                Next
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <p>No pending appointments found</p>
      )}

      {/* Modal for entering rejection reason */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Rejection Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
          <Button variant="primary" onClick={handleModalSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>

      <h2>Accepted Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Case</th>
          </tr>
        </thead>
        <tbody>
          {acceptedAppointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.NameUser}</td>
              <td>{appointment.User_Phone}</td>
              <td>{appointment.DateAppointment}</td>
              <td>{appointment.problemDescription}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DoctorAppointmentsTable;
