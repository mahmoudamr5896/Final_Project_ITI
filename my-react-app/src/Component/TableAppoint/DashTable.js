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



// Appointment status true 
  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/appointments/`)
        .then(response => {
          // Filter appointments with status true
          const filteredAppointments = response.data.filter(appointment => appointment.status === true);
          setAcceptedAppointments(filteredAppointments);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [id]);
// Appointment status false 
useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/appointments/`)
        .then(response => {
          // Filter appointments with status true
          const filteredAppointments = response.data.filter(appointment => appointment.status === false && appointment.Reasone_reject === 'none');
          setAppointments(filteredAppointments);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [id]);
//________________________________________________________________________________________________________________

  const handleApprove = (appointmentId) => {
      // Make a PUT request to update the status of the consultation
      axios.patch(`http://127.0.0.1:8000/appointments/${appointmentId}/`, { status: true })
        .then(response => {
          console.log('Consultation approved successfully:', response.data);
          // Handle any further actions you need after approving the consultation
        })
        .catch(error => {
          console.error('Error approving consultation:', error);
        });
    
   
  };

//_______________________________________________________________________________________________________

  const handleReject = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

//__________________________________________________________________________________________________________
  const handleModalClose = () => {
    setShowModal(false);
    setRejectionReason('');
  };
console.log(selectedAppointmentId)
const handleModalSubmit = () => {
  if (selectedAppointmentId) {
    axios.patch(`http://127.0.0.1:8000/appointments/${selectedAppointmentId}/`, { Reasone_reject: rejectionReason })
      .then(response => {
        console.log('Appointment rejected successfully:', response.data);
        const updatedAppointments = appointments.map(appointment => {
          if (appointment.id === selectedAppointmentId) {
            console.log(rejectionReason)
            // return { ...appointment, status: false, Reasone_reject: rejectionReason };
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
        setRejectionReason(""); // Clear rejection reason input
      })
      .catch(error => {
        console.error('Error rejecting appointment:', error);
      });
  }
};

//___________________________________________________________________________

//_____________________________________________________________________________
  const refreshAppointments = () => {
    // Fetch updated appointments after approval or rejection
    // axios.get(`https://retoolapi.dev/2jV2W1/Appointment?Doctor_Id=${id}`)
    //   .then(response => {
    //     setAppointments(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching appointments:', error);
    //   });
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
//_____________________________________________________________________________
const[Select_Appiont,setSelect_Appiont]=useState(null)
const Select_Appiontment=()=>{
const data =(
  <>
   <h2>Pending Appointments</h2>
      {appointments.length > 0 ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Case</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.doctor_name}</td>
                  <td>{appointment.doctor_phone}</td>
                  <td>{appointment.date_time}</td>
                  <td>{appointment.problems}</td>
                  <td>
                  <Button variant="success" onClick={() => handleApprove(appointment.id)}>Approve</Button>
                    </td>
                    <td>
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

  </>
  
)
setSelect_Appiont_a(null)
setSelect_Appiont(data)
}
const[Select_Appiont_a,setSelect_Appiont_a]=useState(null)
const Select_Appiontment_accept=()=>{
const data= (
  <>
        <h2>Accepted Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name Of Patient</th>
            <th>Date</th>
            <th>Case</th>
          </tr>
        </thead>
        <tbody>
          {acceptedAppointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.patient_name}</td>
              {/* <td>{appointment.doctor_phone}</td> */}
              <td>{appointment.date_time}</td>
              <td>{appointment.problems}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  </>
)
setSelect_Appiont_a(data)
setSelect_Appiont(null)
}
//_________________________________________________________________________________________________________________
  return (
    <div>
       <h3 style={{ marginBottom:"5%",color:"var(--black)",fontFamily:"'Inter', sans-serif"}}>Current Appointments</h3><br></br>
      <div className='col-12'>
        <button className='btn btn-warning m-4' onClick={Select_Appiontment}>Pending Appointment</button>
        <button className='btn btn-success' onClick={Select_Appiontment_accept}>Accepted Appiontemt</button>
      </div>
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
          {Select_Appiont_a}
          {Select_Appiont}

    </div>
  );
}

export default DoctorAppointmentsTable;


 // Find the appointment to be approved
    // const appointmentToApprove = appointments.find(appointment => appointment.id === appointmentId);

    // // Update the accepted appointments table
    // setAcceptedAppointments(prevAppointments => [...prevAppointments, appointmentToApprove]);

    // // Remove the approved appointment from the pending appointments table
    // setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));

    // // Make a request to your backend API to add the approved appointment
    // axios.post('http://127.0.0.1:8000/appointments/', appointmentToApprove)
    //   .then(response => {
    //     console.log('Appointment approved and added to Accepted Appointments:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error adding appointment to Accepted Appointments:', error);
    //   });

    // // Make a request to your backend API to approve the appointment
    // // Implement your approval logic here
    // console.log('Appointment approved:', appointmentId);   // Make a request to your backend API to delete the rejected appointment
    // axios.delete(`https://retoolapi.dev/2jV2W1/Appointment/${selectedAppointmentId}`)
    //   .then(response => {
    //     console.log('Appointment rejected and removed from the API');
    //     setShowModal(false);
    //     setRejectionReason('');

    //     // Remove the rejected appointment from the pending appointments table
    //     setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== selectedAppointmentId));
    //   })
    //   .catch(error => {
    //     console.error('Error rejecting appointment:', error);
    //   });