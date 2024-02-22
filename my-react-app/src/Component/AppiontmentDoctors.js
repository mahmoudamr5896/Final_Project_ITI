import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm({ doctorInfo }) {
  const [DataAppointment, setDataAppointment] = useState({
    NameUser: '',
    EmailUser: '',
    PhoneUser: '',
    DateAppointment: '',
    problemDescription: '',
    Doctot_name: doctorInfo.Doctor_Name,
    Data_Appointment: '',
    User_id: 3,
    Doctot_id: doctorInfo.id
  });

  const HandelChangeAppontmentName = (e) => {
    setDataAppointment({ ...DataAppointment, NameUser: e.target.value });
  };

  const HandelChangeAppontmentEmail = (e) => {
    setDataAppointment({ ...DataAppointment, EmailUser: e.target.value });
  };

  const HandelChangeAppontmentPhone = (e) => {
    setDataAppointment({ ...DataAppointment, PhoneUser: e.target.value });
  };

  const HandelChangeAppontmentDate = (e) => {
    setDataAppointment({ ...DataAppointment, DateAppointment: e.target.value });
  };

  const HandelChangeAppontmentProps = (e) => {
    setDataAppointment({ ...DataAppointment, problemDescription: e.target.value });
  };

  const validateForm = () => {
    // Your validation logic goes herehttps://retoolapi.dev/15YN0H/Appointment
    // Return true if form is valid, otherwise false
    return true;
  };

  const Save_Appointment = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('https://retoolapi.dev/ornM79/Appointment', DataAppointment)
        .then(response => {
          console.log('Appointment posted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error posting Appointment:', error);
        });
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div class="container-xxl py-5">
 <div class="container">
     <div class="row g-5">
         <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
             <p class="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
             <h1 class="mb-4">Make An Appointment To Visit DR./{doctorInfo.Doctor_Name}</h1>
             <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
             <div class="bg-light rounded d-flex align-items-center p-5 mb-4">
                 <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px;", height: "55px;"}}>
                     <i class="fa fa-phone-alt text-primary"></i>
                 </div>
                 <div class="ms-4">
                     <p class="mb-2">Call Us Now</p>
                     <h5 class="mb-0">{doctorInfo.Phone}</h5>
                 </div>
             </div>
             <div class="bg-light rounded d-flex align-items-center p-5">
                 <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px;", height: "55px;"}}>
                     <i class="fa fa-envelope-open text-primary"></i>
                 </div>
                 <div class="ms-4">
                     <p class="mb-2">Mail Us Now</p>
                     <h5 class="mb-0">{doctorInfo.Email}</h5>
                 </div>
             </div>
         </div>
         <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
             <div class="bg-light rounded h-100 d-flex align-items-center p-5">
                 <form onSubmit={Save_Appointment}>
                     <div class="row g-3">              
        <div class="col-12"> 
                         </div>
                       <input
                           type="text"
                           name="NameUser"
                           value={DataAppointment.NameUser}
                           onChange={HandelChangeAppontmentName}
                           class="form-control border-0"
                           placeholder="Your Name"
                           style={{ height: "55px;" }}
                       />
                       <input
                           type="email"
                           class="form-control border-0"
                           placeholder="Your Email"
                           style={{ height: "55px;" }}
                           onChange={HandelChangeAppontmentEmail}
                           value={DataAppointment.EmailUser}
                           name="EmailUser"
                       />
                       <input
                           type="text"
                           class="form-control border-0"
                           placeholder="Your Mobile"
                           style={{ height: "55px;" }}
                           name="PhoneUser"
                           onChange={HandelChangeAppontmentPhone}
                           value={DataAppointment.PhoneUser}
                       />
                       <input
                           type="date"
                           class="form-control border-0 datetimepicker-input"
                           placeholder="Choose Date"
                           style={{ height: "55px;" }}
                           name="DateAppointment"
                           onChange={HandelChangeAppontmentDate}
                           value={DataAppointment.DateAppointment}
                       />
                       <textarea
                           class="form-control border-0"
                           rows="5"
                           placeholder="Describe your problem"
                           name="problemDescription"
                           value={DataAppointment.problemDescription}
                           onChange={HandelChangeAppontmentProps}
                       ></textarea>
                         <div class="col-12">
                             <button class="btn btn-primary w-100 py-3" type="submit">Book Appointment</button>
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



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// function AppointmentForm({ doctorInfo }) {
//  const [DataAppointment, setDataAppointment] = useState({})
//  const[NameUser,setNameUser]=useState('')
//  const[EmailUser,setEmailUser]=useState('')
//  const[PhoneUser,setPhoneUser]=useState('')
//  const[DateAppointment,setDateAppointment]=useState('')
//  const[problemDescription,setproblemDescription]=useState('')
      
//  const HandelChangeAppontmentName=(e)=>{
//     setNameUser(e.target.value)
       
       
//  }
//  const HandelChangeAppontmentEmail=(e)=>{
//    setEmailUser(e.target.value)
      
//  }
//  const HandelChangeAppontmentPhone=(e)=>{
//    setPhoneUser(e.target.value)
    
//  }
//  const HandelChangeAppontmentDate=(e)=>{
//    setDateAppointment(e.target.value)
    
//  }
//  const HandelChangeAppontmentProps=(e)=>{
//    setproblemDescription(e.target.value)
    
//  }
//  const validateForm = () => {
//      let valid = true;
//      const newErrors = {};
      
//      // Validation rules
//      if (!formData.NameUser.trim()) {
//        newErrors.NameUser = 'Name is required';
//        valid = false;
//      }
      
//      if (!formData.EmailUser.trim()) {
//        newErrors.EmailUser = 'Email is required';
//        valid = false;
//      } else if (!/^\S+@\S+\.\S+$/.test(formData.EmailUser)) {
//        newErrors.EmailUser = 'Email is invalid';
//        valid = false;
//      }
      
//      if (!formData.PhoneUser.trim()) {
//        newErrors.PhoneUser = 'Phone is required';
//        valid = false;
//      } else if (!/^\d{10}$/.test(formData.PhoneUser)) {
//        newErrors.PhoneUser = 'Phone is invalid';
//        valid = false;
//      }
      
//      if (!formData.DateAppointment.trim()) {
//        newErrors.DateAppointment = 'Date is required';
//        valid = false;
//      }
      
//      if (!formData.problemDescription.trim()) {
//        newErrors.problemDescription = 'Problem description is required';
//        valid = false;
//      }
      
//      setErrors(newErrors);
//      return valid;
//    };
      
//  const Save_Appointment =(event)=>{
//      event.preventDefault()
//      setDataAppointment({
//      Name: NameUser,
//      Email: EmailUser,
//      Phone: PhoneUser,
//      Problem: problemDescription,
//      Doctot_name: doctorInfo.Doctor_Name,
//      Data_Appointment: DateAppointment,
//      User_id:3,
//      Doctot_id:doctorInfo.id
//        })
//    axios
//    .post('https://retoolapi.dev/15YN0H/Appointment', DataAppointment)
//      .then(response => {
//        console.log('Appointment posted successfully:', response.data);
//      })
//      .catch(error => {
//        console.error('Error posting Appointment:', error);
//      }); 
//    }
// //   return (
//  <div class="container-xxl py-5">
//  <div class="container">
//      <div class="row g-5">
//          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
//              <p class="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
//              <h1 class="mb-4">Make An Appointment To Visit DR./{doctorInfo.Doctor_Name}</h1>
//              <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
//              <div class="bg-light rounded d-flex align-items-center p-5 mb-4">
//                  <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px;", height: "55px;"}}>
//                      <i class="fa fa-phone-alt text-primary"></i>
//                  </div>
//                  <div class="ms-4">
//                      <p class="mb-2">Call Us Now</p>
//                      <h5 class="mb-0">{doctorInfo.Phone}</h5>
//                  </div>
//              </div>
//              <div class="bg-light rounded d-flex align-items-center p-5">
//                  <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px;", height: "55px;"}}>
//                      <i class="fa fa-envelope-open text-primary"></i>
//                  </div>
//                  <div class="ms-4">
//                      <p class="mb-2">Mail Us Now</p>
//                      <h5 class="mb-0">{doctorInfo.Email}</h5>
//                  </div>
//              </div>
//          </div>
//          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
//              <div class="bg-light rounded h-100 d-flex align-items-center p-5">
//                  <form onSubmit={Save_Appointment}>
//                      <div class="row g-3">
//                      {/* NameUser:'',
//    EmailUser:'',
//    PhoneUser:'',
//    DateAppointment:'',
//    problemDescription:'',
//    Doctor_name:doctorInfo.Doctor_Name,
//    id_Doctor:doctorInfo.id,
//    id_User:'',   */}               
//         <div class="col-12"> 
//                          </div>
//                        <input
//                            type="text"
//                            name="NameUser"
//                            value={DataAppointment.NameUser}
//                            onChange={HandelChangeAppontmentName}
//                            class="form-control border-0"
//                            placeholder="Your Name"
//                            style={{ height: "55px;" }}
//                        />
//                        <input
//                            type="email"
//                            class="form-control border-0"
//                            placeholder="Your Email"
//                            style={{ height: "55px;" }}
//                            onChange={HandelChangeAppontmentEmail}
//                            value={DataAppointment.EmailUser}
//                            name="EmailUser"
//                        />
//                        <input
//                            type="text"
//                            class="form-control border-0"
//                            placeholder="Your Mobile"
//                            style={{ height: "55px;" }}
//                            name="PhoneUser"
//                            onChange={HandelChangeAppontmentPhone}
//                            value={DataAppointment.PhoneUser}
//                        />
//                        <input
//                            type="date"
//                            class="form-control border-0 datetimepicker-input"
//                            placeholder="Choose Date"
//                            style={{ height: "55px;" }}
//                            name="DateAppointment"
//                            onChange={HandelChangeAppontmentDate}
//                            value={DataAppointment.DateAppointment}
//                        />
//                        <textarea
//                            class="form-control border-0"
//                            rows="5"
//                            placeholder="Describe your problem"
//                            name="problemDescription"
//                            value={DataAppointment.problemDescription}
//                            onChange={HandelChangeAppontmentProps}
//                        ></textarea>
//                          <div class="col-12">
//                              <button class="btn btn-primary w-100 py-3" type="submit">Book Appointment</button>
//                          </div>
//                      </div>
//                  </form>
//              </div>
//          </div>
//      </div>
//  </div>
//  </div> 
// //   );
// // }

// // export default AppointmentForm;
