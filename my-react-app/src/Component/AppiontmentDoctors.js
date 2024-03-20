import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

function AppointmentForm({ doctorInfo, doc_id}) {
  const userDataString = sessionStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  const [DataAppointment, setDataAppointment] = useState({
    doctor: doc_id,
    patient_name: userData.name,
    patient:userData.id,
    date_time: '',
    problems: '',
    status: false,
    Reasone_reject:'none'
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [avv, setAvv] = useState([]);
  const [isValidphone, setIsValidphone] = useState(true);
  const [isValidprps, setIsValidprps] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const userDataString = sessionStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const userId = userData.id;

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
        const allAvailabilities = [];
        response.data.forEach(doctor => {
          axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorInfo}`)
            .then(availabilityResponse => {
              const availabilityData = availabilityResponse.data;
              doctor.availability = availabilityData;
              allAvailabilities.push(...availabilityData);
              setAvv(allAvailabilities);
            })
            .catch(error => {
              console.error('Error fetching availability:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const HandelChangeAppontmentDoctor = (e) => {
    setDataAppointment({ ...DataAppointment, doctor: e.target.value });
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
      DataAppointment.date_time.trim() !== '' &&
      DataAppointment.problems.trim() !== ''
    );
  };

  const Save_Appointment = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('DataAppointment', DataAppointment);
      axios.post('http://127.0.0.1:8000/appointments/', DataAppointment)
        .then(response => {
          console.log('Appointment posted successfully:', response.data);
          // history.push(`/profile/${doctorInfo.id}`);
          DataAppointment.problems('')
          DataAppointment.date_time('')
          
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
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s"></div>
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
        <div className="bg-light rounded h-100 d-flex align-items-center p-5">
          <form onSubmit={Save_Appointment} >
            <div className="row g-3">
              <div className="col-12">
                <select
                  className="form-control border-0 m-2"
                  type="datetime-local"
                  placeholder="Date and Time"
                  style={{ height: "55px" }}
                  name="Doctor_Name"
                  onChange={HandleChangeAppointmentDate}
                  value={DataAppointment.date_time}
                >
                  <option value="">Select Day Availability</option>
                  {avv.map((availability) => (
                    <option key={availability.id} value={availability.date_time}>
                      {availability.day} {availability.start_time} - {availability.end_time}
                    </option>
                  ))}
                </select>
                <textarea
                  className="form-control border-0"
                  rows="5"
                  placeholder="Describe your problem"
                  name="Problems"
                  value={DataAppointment.problems}
                  onChange={HandelChangeAppontmentProps}
                ></textarea>
                {!isValidprps && (
                  <div className="alert alert-danger" role="alert">
                    Please enter a valid problemDescription .
                  </div>
                )}
              </div>
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
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default AppointmentForm;
{/* <div className="container-xxl py-5">
<div className="container">
  <div className="row g-5">
    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s"></div>
    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
      <div className="bg-light rounded h-100 d-flex align-items-center p-5">
        <form onSubmit={Save_Appointment} method="post">
          <div className="row g-3">
            <div className="col-12">
              <select
                className="form-control border-0 m-2"
                type="datetime-local"
                placeholder="Date and Time"
                style={{ height: "55px;" }}
                name="Doctor_Name"
                onChange={HandleChangeAppointmentDate}
                value={DataAppointment.date_time}
              >
                <option value="">Select Day Availability</option>
                {avv.map(availability => (
                  <option key={availability.id} value={availability.date_time}>
                    {availability.day} {availability.start_time} - {availability.end_time}
                  </option>
                ))}
              </select>
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
</div> */}
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// const userDataString = sessionStorage.getItem('userData');
// const userData = JSON.parse(userDataString);
// const userId = userData.id;

// function AppointmentForm({ doctorInfo, doc_id}) {
//   const [DataAppointment, setDataAppointment] = useState({
//     doctor: doc_id,
//     patient: userId,
//     date_time: '',
//     problems: '',
//     status: false,
//     Reasone_reject:'none'
//   });

//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [avv, setAvv] = useState([]);
//   const [isValidphone, setIsValidphone] = useState(true);
//   const [isValidprps, setIsValidprps] = useState(true);
//   const history = useHistory();

//   useEffect(() => {
//     // Fetch patients
//     axios.get('http://127.0.0.1:8000/patients/')
//       .then(response => {
//         setPatients(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching patients:', error);
//       });

//     // Fetch doctors
//     axios.get('http://127.0.0.1:8000/doctors/')
//       .then(response => {
//         setDoctors(response.data);
//         const allAvailabilities = [];
//         response.data.forEach(doctor => {
//           axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorInfo}`)
//             .then(availabilityResponse => {
//               const availabilityData = availabilityResponse.data;
//               doctor.availability = availabilityData;
//               allAvailabilities.push(...availabilityData);
//               setAvv(allAvailabilities);
//             })
//             .catch(error => {
//               console.error('Error fetching availability:', error);
//             });
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching doctors:', error);
//       });
//   }, []);

//   const HandelChangeAppontmentDoctor = (e) => {
//     setDataAppointment({ ...DataAppointment, doctor: e.target.value });
//   };

//   const HandelChangeAppontmentPatient = (e) => {
//     setDataAppointment({ ...DataAppointment, patient: e.target.value });
//   };

//   const HandleChangeAppointmentDate = (e) => {
//     setDataAppointment({ ...DataAppointment, date_time: e.target.value });
//   };

//   const HandelChangeAppontmentProps = (e) => {
//     setDataAppointment({ ...DataAppointment, problems: e.target.value });
//     setIsValidprps(e.target.value.trim() !== '');
//   };


//   const validateForm = () => {
//     return (
//       DataAppointment.date_time.trim() !== '' &&
//       DataAppointment.problems.trim() !== ''
//     );
//   };

//   const Save_Appointment = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       console.log('DataAppointment', DataAppointment);
//       axios.post('http://127.0.0.1:8000/appointments/', DataAppointment)
//         .then(response => {
//           console.log('Appointment posted successfully:', response.data);
//           history.push(`/profile/${doctorInfo.id}`);
//         })
//         .catch(error => {
//           console.error('Error posting Appointment:', error);
//         });
//     } else {
//       console.log('Form validation failed');
//     }
//   };

//   return (
//     <div className="container-xxl py-5">
//       <div className="container">
//         <div className="row g-5">
//           <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s"></div>
//           <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
//             <div className="bg-light rounded h-100 d-flex align-items-center p-5">
//               <form onSubmit={Save_Appointment} method="post">
//                 <div className="row g-3">
//                   <div className="col-12">
// <<<<<<< HEAD
         
//                     <select
//                       className="form-control border-0 m-2"
// =======
                  
//                     <input
//                       type="datetime-local"
//                       className="form-control border-0"
//                       placeholder="Date and Time"
// >>>>>>> origin/ahmedredaappointment
//                       style={{ height: "55px;" }}
//                       name="Doctor_Name"
//                       onChange={HandleChangeAppointmentDate}
//                       value={DataAppointment.date_time}
//                     >
//                       <option value="">Select Day Availability</option>
//                       {avv.map(availability => (
//                         <option key={availability.id} value={availability.date_time}>
//                           {availability.day} {availability.start_time} - {availability.end_time}
//                         </option>
//                       ))}
//                     </select>
//                     <textarea
//                       className="form-control border-0"
//                       rows="5"
//                       placeholder="Describe your problem"
//                       name="Problems"
//                       value={DataAppointment.problems}
//                       onChange={HandelChangeAppontmentProps}
//                     ></textarea>
//                     {!isValidprps && <div className="alert alert-danger" role="alert">Please enter a valid problemDescription  .</div>}
//                     <div className="col-12">
//                       <button
//                         type="submit"
//                         className="btn btn-success w-100 py-3"
//                         disabled={!validateForm()}
//                       >
//                         Book Appointment
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppointmentForm;
