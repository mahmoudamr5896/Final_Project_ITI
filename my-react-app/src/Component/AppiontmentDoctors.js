import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

function AppointmentForm({ doctorInfo, UserR_id }) {
  const [DataAppointment, setDataAppointment] = useState({
    doctor: '',
    patient: '',
    date_time: '',
    problems: '',
    status: false
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [isValidphone, setIsValidphone] = useState(true);
  const [isValidprps, setIsValidprps] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Fetch patients
    axios.get('http://127.0.0.1:8000/patients/')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });

    // Fetch doctors
    axios.get('http://127.0.0.1:8000/doctors/')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const HandelChangeAppontmentDoctor = (e) => {
    setDataAppointment({ ...DataAppointment, doctor: e.target.value });
  };

  const HandelChangeAppontmentPatient = (e) => {
    setDataAppointment({ ...DataAppointment, patient: e.target.value });
  };

  const HandleChangeAppointmentDate = (e) => {
    setDataAppointment({ ...DataAppointment, date_time: e.target.value });
  };

  const HandelChangeAppontmentProps = (e) => {
    setDataAppointment({ ...DataAppointment, problems: e.target.value });
    setIsValidprps(e.target.value.trim() !== '');
  };

  const validateForm = () => {
    return (
      DataAppointment.doctor.trim() !== '' &&
      DataAppointment.patient.trim() !== '' &&
      DataAppointment.date_time.trim() !== '' &&
      DataAppointment.problems.trim() !== ''
    );
  };

  const Save_Appointment = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://127.0.0.1:8000/appointments/', DataAppointment)
        .then(response => {
          console.log('Appointment posted successfully:', response.data);
          history.push(`/profile/${doctorInfo.id}`);
        })
        .catch(error => {
          console.error('Error posting Appointment:', error);
        });
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          {/* Doctor info */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            {/* Doctor contact info */}
          </div>
          {/* Appointment form */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              <form onSubmit={Save_Appointment} method="post">
                <div className="row g-3">
                  <div className="col-12">
                    <select
                      className="form-control border-0"
                      style={{ height: "55px;" }}
                      name="Doctor_Name"
                      onChange={HandelChangeAppontmentDoctor}
                      value={DataAppointment.doctor}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                      ))}
                    </select>
                    <select
                      className="form-control border-0"
                      style={{ height: "55px;" }}
                      name="Patient_Name"
                      onChange={HandelChangeAppontmentPatient}
                      value={DataAppointment.patient}
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="datetime-local"
                      className="form-control border-0"
                      placeholder="Date and Time"
                      style={{ height: "55px;" }}
                      name="Date_time"
                      onChange={HandleChangeAppointmentDate}
                      value={DataAppointment.date_time}
                    />
                    <textarea
                      className="form-control border-0"
                      rows="5"
                      placeholder="Describe your problem"
                      name="Problems"
                      value={DataAppointment.problems}
                      onChange={HandelChangeAppontmentProps}
                    ></textarea>
                    {!isValidprps && <div className="alert alert-danger" role="alert">Please enter a valid problemDescription  .</div>}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-success w-100 py-3"
                        disabled={!validateForm()}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
