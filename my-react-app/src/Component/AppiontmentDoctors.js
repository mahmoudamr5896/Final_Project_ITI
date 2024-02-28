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
    Activate : false,
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
   
    return true;
  };
  

// handell cheekout 
const [cardNumber, setCardNumber] = useState('');
const [validCardNumber, setValidCardNumber] = useState(true);
const [cardholderName, setCardholderName] = useState('');
const [validCardholderName, setValidCardholderName] = useState(true);

const [startDate, setStartDate] = useState('');
const [validStartDate, setValidStartDate] = useState(true);
const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable

const [expirationDate, setExpirationDate] = useState('');
const [validExpirationDate, setValidExpirationDate] = useState(true);

const [cvv, setCvv] = useState('');
const [validCvv, setValidCvv] = useState(true);


const handleCardNumberChange = (e) => {
  const value = e.target.value;
  setCardNumber(value);
  setValidCardNumber(validateCardNumber(value));
};

const handleCardholderNameChange = (e) => {
  const value = e.target.value;
  setCardholderName(value);
  setValidCardholderName(validateCardholderName(value));
};

const handleStartDateChange = (e) => {
  const value = e.target.value;
  setStartDate(value);
  setValidStartDate(validateStartDate(value));
};

const handleExpirationDateChange = (e) => {
  const value = e.target.value;
  setExpirationDate(value);
  setValidExpirationDate(validateExpirationDate(value));
};

const handleCvvChange = (e) => {
  const value = e.target.value;
  setCvv(value);
  setValidCvv(validateCvv(value));
};

const validateCardNumber = (value) => {
  return /^\d{16}$/.test(value);
};

const validateCardholderName = (value) => {
  return /^[a-zA-Z\s]+$/.test(value);
};

const validateStartDate = (value) => {
  return /^[0-9]{1,2}\/[0-9]{4}$/.test(value);
};

const validateExpirationDate = (value) => {
  return /^[0-9]{1,2}\/[0-9]{4}$/.test(value);
};

const validateCvv = (value) => {
  return /^\d{3,4}$/.test(value);
};
const history = useHistory()
const handleSubmit = (e) => {
  e.preventDefault();
 
  const isCardNumberValid = validateCardNumber(cardNumber);
  const isCardholderNameValid = validateCardholderName(cardholderName);
  const isStartDateValid = validateStartDate(startDate);
  const isExpirationDateValid = validateExpirationDate(expirationDate);
  const isCvvValid = validateCvv(cvv);
  if (isCardNumberValid && isCardholderNameValid && isStartDateValid && isExpirationDateValid && isCvvValid) {
    console.log('Form is valid. Proceed with payment.');
    Save_Appointment()
    setShowSuccessMessage(true);

  } else {
    console.log('Form has validation errors. Cannot proceed with payment.');
  }
};

const Save_Appointment = (event) => {
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
                                <button type="button" class="btn btn-success w-100 py-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Book Appointment</button>
                            </div>
                           </div>                           
                </div>
            </div>  {/* <form onSubmit={Save_Appointment}></form> */}
            </div>
           </div>
           <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form className="form-card border border-3 p-3" onSubmit={handleSubmit}>
                                        <div className="row">
                                          <div className="row main">
                                            <div className="col-12">
                                              <span>Cart</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                              <span>Shipping confirmation</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                              <span>Credit card checkout</span>
                                            </div>
                                          </div>

                                          <div className="row justify-content-center mrow">
                                            <div className="col-12">
                                              <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" width="35px" height="35px" alt="Mastercard" />
                                              <img src="https://img.icons8.com/color/48/000000/visa.png" width="35px" height="35px" alt="Visa" />
                                              <img src="https://img.icons8.com/color/48/000000/paypal.png" width="35px" height="35px" alt="Paypal" />
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="form-group">
                                              <input
                                                type="text"
                                                className={`form-control p-0 ${!validCardNumber && 'is-invalid'}`}
                                                id="number"
                                                required
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                              />
                                              <label className="form-control-placeholder p-0" htmlFor="number">
                                                Card Number
                                              </label>
                                              {!validCardNumber && <div className="invalid-feedback">Invalid card number</div>}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-12">
                                            <div className="form-group">
                                              <input
                                                type="text"
                                                className={`form-control p-0 ${!validCardholderName && 'is-invalid'}`}
                                                id="name"
                                                required
                                                value={cardholderName}
                                                onChange={handleCardholderNameChange}
                                              />
                                              <label className="form-control-placeholder p-0" htmlFor="name">
                                                Cardholder's Name
                                              </label>
                                              {!validCardholderName && <div className="invalid-feedback">Invalid cardholder name</div>}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-sm-4 col-12">
                                            <div className="form-group">
                                              <input
                                                type="text"
                                                className={`form-control p-0 ${!validStartDate && 'is-invalid'}`}
                                                id="sdate"
                                                required
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                              />
                                              <label className="form-control-placeholder p-0" htmlFor="sdate">
                                                Start Date
                                              </label>
                                              {!validStartDate && <div className="invalid-feedback">Invalid start date</div>}
                                            </div>
                                          </div>
                                          <div className="col-sm-4 col-12">
                                            <div className="form-group">
                                              <input
                                                type="text"
                                                className={`form-control p-0 ${!validExpirationDate && 'is-invalid'}`}
                                                id="expdate"
                                                required
                                                value={expirationDate}
                                                onChange={handleExpirationDateChange}
                                              />
                                              <label className="form-control-placeholder p-0" htmlFor="expdate">
                                                Expiration Date
                                              </label>
                                              {!validExpirationDate && <div className="invalid-feedback">Invalid expiration date</div>}
                                            </div>
                                          </div>
                                          <div className="col-sm-4 col-12">
                                            <div className="form-group">
                                              <input
                                                type="password"
                                                className={`form-control p-0 ${!validCvv && 'is-invalid'}`}
                                                id="passw"
                                                required
                                                value={cvv}
                                                onChange={handleCvvChange}
                                              />
                                              <label className="form-control-placeholder p-0" htmlFor="passw">
                                                CVV
                                              </label>
                                              {!validCvv && <div className="invalid-feedback">Invalid CVV</div>}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row lrow mt-4 mb-3">
                                          <div className="col-sm-8 col-12">
                                            <h3>Grand Total:</h3>
                                          </div>
                                          <div className="col-sm-4 col-12">
                                            <h5>1222</h5>
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-sm-12">
                                            <button type="submit" className="btn btn-primary btn-block" data-bs-dismiss="modal" >
                                              Pay
                                            </button>
                                            {showSuccessMessage && (
                                          <div className="alert alert-success" role="alert">
                                            Payment successful! You will be redirected shortly.
                                          </div>
                                        )}
                                          </div>
                                        </div>
                      </form>


                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      {/* <button type="button" class="btn btn-primary">Send message</button> */}
                    </div>
                  </div>
                </div>
                  </div> 
            </div>
  );
}
export default AppointmentForm;


{/* <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Show a second modal and hide this one with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Hide this modal and show the first with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button>
      </div>
    </div>
  </div>
</div>
<button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Open first modal</button>
 */}



















































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
