import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AppointmentForm({ doctorInfo , UserR_id }) {
  const [DataAppointment, setDataAppointment] = useState({
    UserEmail: '',
    User_Phone: '',
    DateAppointment: '',
    TimeAppointment : '',
    problemDescription: '',
    Doctor_name: doctorInfo.Doctor_Name,
    User_id: UserR_id,
    Doctor_Id: doctorInfo.id,
    Price:100,
    Paid:true
  });

  const HandelChangeAppontmentName = (e) => {
    setDataAppointment({ ...DataAppointment, NameUser: e.target.value });
  };

  const HandelChangeAppontmentEmail = (e) => {
    setDataAppointment({ ...DataAppointment, UserEmail: e.target.value });
  };

  const HandelChangeAppontmentPhone = (e) => {
    setDataAppointment({ ...DataAppointment, User_Phone: e.target.value });
  };

  const HandelChangeAppontmentDate = (e) => {
    setDataAppointment({ ...DataAppointment, DateAppointment: e.target.value });
  };
  const HandelChangeAppontmentTime = (e) => {
    setDataAppointment({ ...DataAppointment, TimeAppointment: e.target.value });
  };


  const HandelChangeAppontmentProps = (e) => {
    setDataAppointment({ ...DataAppointment, problemDescription: e.target.value });
  };

  const validateForm = () => {
    // Your validation logic goes herehttps://retoolapi.dev/15YN0H/Appointment
    // Return true if form is valid, otherwise false
    return true;
  };
      const    history = useHistory()

  const Save_Appointment = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('https://retoolapi.dev/2jV2W1/Appointment', DataAppointment)
        .then(response => {
          console.log('Appointment posted successfully:', response.data);
          history.push(`/profile/${doctorInfo.id}`)
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
                           value={DataAppointment.UserEmail}
                           name="UserEmail"
                       />
                       <input
                           type="text"
                           class="form-control border-0"
                           placeholder="Your Mobile"
                           style={{ height: "55px;" }}
                           name="User_Phone"
                           onChange={HandelChangeAppontmentPhone}
                           value={DataAppointment.User_Phone}
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
                       <input
                           type="time"
                           class="form-control border-0 datetimepicker-input"
                           placeholder="Choose Date"
                           style={{ height: "55px;" }}
                           name="TimeAppointment"
                           onChange={HandelChangeAppontmentTime}
                           value={DataAppointment.TimeAppointment}
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
//  const[UserEmail,setUserEmail]=useState('')
//  const[User_Phone,setUser_Phone]=useState('')
//  const[DateAppointment,setDateAppointment]=useState('')
//  const[problemDescription,setproblemDescription]=useState('')
      
//  const HandelChangeAppontmentName=(e)=>{
//     setNameUser(e.target.value)
       
       
//  }
//  const HandelChangeAppontmentEmail=(e)=>{
//    setUserEmail(e.target.value)
      
//  }
//  const HandelChangeAppontmentPhone=(e)=>{
//    setUser_Phone(e.target.value)
    
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
      
//      if (!formData.UserEmail.trim()) {
//        newErrors.UserEmail = 'Email is required';
//        valid = false;
//      } else if (!/^\S+@\S+\.\S+$/.test(formData.UserEmail)) {
//        newErrors.UserEmail = 'Email is invalid';
//        valid = false;
//      }
      
//      if (!formData.User_Phone.trim()) {
//        newErrors.User_Phone = 'Phone is required';
//        valid = false;
//      } else if (!/^\d{10}$/.test(formData.User_Phone)) {
//        newErrors.User_Phone = 'Phone is invalid';
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
//      Email: UserEmail,
//      Phone: User_Phone,
//      Problem: problemDescription,
//      Doctor_name: doctorInfo.Doctor_Name,
//      Data_Appointment: DateAppointment,
//      User_id:3,
//      Doctor_Id:doctorInfo.id
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
//    UserEmail:'',
//    User_Phone:'',
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
//                            value={DataAppointment.UserEmail}
//                            name="UserEmail"
//                        />
//                        <input
//                            type="text"
//                            class="form-control border-0"
//                            placeholder="Your Mobile"
//                            style={{ height: "55px;" }}
//                            name="User_Phone"
//                            onChange={HandelChangeAppontmentPhone}
//                            value={DataAppointment.User_Phone}
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
