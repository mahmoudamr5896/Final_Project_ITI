import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Css/Doctors.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StarRating from "../Component/Rate";
import { Button } from "bootstrap";
import MinMaxText from "../Component/Minimaize";
import CommentSection from '../Component/ReviewComponent'
import AppointmentRequestCard from '../Component/RequastApp'
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import CheckoutForm from '../Component/CheekoutForm'
import EditUserPage from '../Component/CompnentFormEdit'

function DoctorDetails() {

  const { id } = useParams();
  console.log("id:", id);
  const [doctorInfo, setDoctorInfo] = useState({
      Bio: '',
      Img: '',
      name: '',
      Email: '',
      Phone: '',
      Location: '',
      Payment_Appointment: '',
      Password:'',
  });
  useEffect(() => {
      axios(`https://retoolapi.dev/EBWb8G/Doctors/${id}`)
          .then((res) => setDoctorInfo(res.data))
          .catch((err) => console.log(err));
  }, []);

// handel review _____________________________________________________________________________________________
const [newReview, setNewReview] = useState();
const handleNameChange = (event) => {
  const inputName = event.target.value;
  setNewReview(inputName);
};
// handell review 
const[id_,setid_]=useState()
useEffect(() => {
  axios(`https://retoolapi.dev/NJuvHL/Reviews`)
      .then((res) => setid_(res.data.id))
      .catch((err) => console.log(err));
}, []); 

// handle posting a review
const handleReview = (event) => {
event.preventDefault();
 const reviewData = {
      "id": id_ + 1,
      "Rate": "⭐️⭐️⭐️",
      "Review": newReview,
      "User_id": 1,
      "Doctor_id": doctorInfo.id,
      "User_name": "mahmoud",
      "Doctor_Name": doctorInfo.name
    };
    axios
    .post('https://retoolapi.dev/NJuvHL/Reviews', reviewData)
      .then(response => {
        console.log('Review posted successfully:', response.data);
        setNewReview('')
      })
      .catch(error => {
        console.error('Error posting review:', error);
      });
  };

const[showFullBio,setShowFullBio]=useState(null)
const toggleShowFullBio = () => {
      setShowFullBio(!showFullBio); 
};

// handel Sections 
const [locationData, setLocationData] = useState(null);
const selectLocation = () => {
  const data = (
    <div className="map_container mt-5" style={{ width: '100%' }}>
      <h2 className="text-start text-success ">Location <hr></hr></h2>
      <div className="map-responsive" style={{ width: '100%', height: '600px' }}>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${doctorInfo.location}`}
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: '0;', width: '100%;', height: '100%' }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
  setLocationData(data);
  setExperienceData(null)
  setRatingData(null)
  setAboutData(null)
  setIsEditProfileOpen(null);

};

const [ExperienceData, setExperienceData] = useState(null);
const Select_Exprience = ()=>{
const data=(
  <div className="container">
      <h1 className="text-start col-12">
     Experience and Background Checks
     <hr></hr>
   </h1>
   <br></br>
    <div className="container mt-5">
         <div className="row border mb-5" style={{ width: '500px', height: 'auto' }}>
           <div className="col-6 d-flex align-items-center">
               <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwc96ABQRwexDILOeixZ0SMISPPeoavW7U1sJfIfX-vwfDL_Xc' style={{ width: '70px' }} />
               <p className="m-0 ms-2">Experience</p>
           </div>
           <div className="col-6 d-flex align-items-center">
               <img src='https://media.licdn.com/dms/image/D4E0BAQGMXphjW3D52g/company-logo_200_200/0/1703668545508?e=1715817600&v=beta&t=33f6xNyyb4747yocqYoswXfCk5AiBYdAoC-GQQLBzLs' style={{ width: '70px' }} />
               <p className="m-0 ms-2">Background</p>
           </div>
       </div>
       <p className="text-start">Experience Check<br />
           Check Dr. {doctorInfo.name}'s experience treating your condition or procedure
       </p>
   </div>
  {/* <div className="row border " style={{width:'100%',height:'100px'}}>
            <span className="">
          <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwc96ABQRwexDILOeixZ0SMISPPeoavW7U1sJfIfX-vwfDL_Xc' style={{width:'70px'}} />
          <p className="">Exprience</p></span>
          <span className="col-6" style={{width:'100px'}}>
            <img src='https://media.licdn.com/dms/image/D4E0BAQGMXphjW3D52g/company-logo_200_200/0/1703668545508?e=1715817600&v=beta&t=33f6xNyyb4747yocqYoswXfCk5AiBYdAoC-GQQLBzLs' style={{width:'70px'}}/>
            <span><p className="">Background</p></span></span>
  </div> */}
          {/* <p className="text-start">Experience Check<br></br>
            Check Dr.{doctorInfo.name}'s experience treating your condition or procedure</p>
          <div className="container">
          <div className="container ">
                <h1 className="text-start ">
              Experience and Background Checks
              <hr />
            </h1>
          </div> </div> */}
  
            

  </div>

)
setIsEditProfileOpen(null);
setExperienceData(data)
setLocationData(null)
setRatingData(null)
setAboutData(null)
setAppointment(null)
}
const[RatingData,setRatingData]=useState(null)
const Select_Rating = ()=>{
let data = (
 <div className="container row d-flex mt-5" style={{width:'80%'}}>
     <div className="col-6">
      <h3>Dr. {doctorInfo.name} Reviews</h3>
      <>Likelihood to recommend Dr.{doctorInfo.name}</>
      <div>Based on {doctorInfo.Rating.length/2} ratings</div>
      <h2>{doctorInfo.Rating}</h2>
      <p>4.1 average based on 254 reviews.</p>
     <hr style={{border:"3px solid #f1f1f1"}}/>
     </div>
     <div className="col-6 border">
      <p className="pt-3">Leave Review</p>
      <hr></hr>
      <>How likely are you to recommend 
      <br></br>Dr.{doctorInfo.name}</><br></br>
      <div className="mt-4">
             <i className="fas fa-star" ></i>                  
             <i className="fas fa-star" ></i>
             <i className="fas fa-star" ></i>
             <span className="fa fa-star checked"></span>
             <span className="fa fa-star"></span> <br></br>
     </div>
       <div className='m-3'>Select Rating</div>
     </div>
     <div className="mt-5">
       <h3>Reviews</h3>
       <hr></hr>
       <div className="container"> 
         <CommentSection 
         doctorId={id}></CommentSection>
       <hr>
       </hr>
      </div>
    
     </div>
   <div className="col-12 border mt-4"  >
   <h5 className="text-start pt-3">Leave a review</h5>
   <p className="text-start">How was your experience with 
     Dr.{doctorInfo.name}</p>
   <div className="d-flex pb-4">
         <input 
         className="form-control me-2" 
         type="text" 
         onChange={handleNameChange}
         placeholder="Leave Review ..." 
         value={newReview}/>
         <button className="btn btn-success rounded-pill"
         onClick={handleReview}>Continue</button>
   </div>
     </div>
 </div>
  )
  setIsEditProfileOpen(null);

setRatingData(data)
setLocationData(null)
setExperienceData(null)
setAboutData(null)
setAppointment(null)

}
const[AboutData,setAboutData]=useState(null)
const Select_About = ()=>{

  const data=(
  <div className="container mt-5" style={{width:'700px'}}>
   <h4 className="text-start">About Me</h4>
   <hr className="color-primary"></hr>
  <MinMaxText 
  text={`Dr.${doctorInfo.name} is an established and highly skilled 
  physician with over 15 years of experience. She is a 
  graduate of the University of Miami School of Medicine.
   She completed her residency in family medicine at Montefiore
    Medical Center, Albert Einstein College of Medicine.
     She is a board-certified family physician who has been
      actively involved in medical school and residency training
      of future physicians. Over the past many years, Dr. Beecham
       has led the delivery of high-quality care within various healthcare organizations,
        she’s a patient advocate and proponent of health equity for all. Professionally, 
        her interests include preventive medicine, women’s health, diabetes and cardiovascular disease.
         She enjoys getting to know her patients and developing relationships with them over time. When not at work Dr. Beecham is active in the community, she has volunteered with various organizations to improve health outcomes. She enjoys traveling, leisure sports and various outdoor activities.`}
  maxLength={100}
  >
  </MinMaxText>
  <>
             <> 
             <h4 class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Education</h4>
             <hr></hr>
             <div class="col-6">
                         <div class="collapse multi-collapse" id="multiCollapseExample2">
                         <div class=" card-body " style={{width:'500px'}}> 
                         <h6 className='text-start'>A Einstein College M Yeshiva University</h6>
                         Residency Hospital
                         <h6 className='text-start'>University of Miami Miller School of Medicine</h6>
                         Medical School, 2001
                         </div>
                         <hr></hr>

                 </div>
             </div>
             </>
             <>
             <div className='row '>
                     <h4 class="text-start"type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample2" >Language</h4>
             </div>
             <hr></hr>
             <div class="col-12">
                 <div class="collapse multi-collapse" id="multiCollapseExample1">
                 <div class=" card-body " style={{width:'500px'}}> 
                 <h6 className='text-start'>English</h6>
                 <h6 className='text-start'>Arabic</h6>
                 </div>
                 </div>
             </div>
             </>
             <>
             <>
             <div className='row '>
                     <h4 class="text-start"type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample2" >Frequantly Asked Quastion</h4>
             </div>
             <hr></hr>
             <div class="col-12">
                 <div class="collapse multi-collapse" id="multiCollapseExample3">
                 <div class=" card-body " style={{width:'500px'}}> 
                 <h5 className='text-start'>
                 What is the best way to schedule an appointment with Dr.{doctorInfo.name}?<br></br>
                 <p className="text-success">New patients may call {doctorInfo.Phone} to make an appointment.</p>
                 </h5>
                 <h5 className='text-start'>
                 Can I use my insurance at Dr.{doctorInfo.name}?
                 <p  className="text-success">Dr.{doctorInfo.name}, MD accepts various insurance plans. You can easily check if your insurance provider is accepted by using the Healthgrades insurance check. We recommend verifying your insurance coverage before scheduling an appointment to ensure a seamless experience.</p>
                 </h5>
                 <h5 className='text-start'>
                 What is Dr.{doctorInfo.name}'s office address?
                 <p  className="text-success">Dr. Beecham Robinson's office is located at {doctorInfo.Location} You can find other locations and directions on Healthgrades.</p>
                 </h5>
                 <h5 className='text-start '>
                 What languages does Dr.{doctorInfo.name} speak?
                 <p  className="text-success">Dr.{doctorInfo.name} is fluent in 2 languages: English and Arabic.</p>
                 </h5>
                 </div>
                 <hr></hr>

                 </div>
             </div>
             </>

             </>
 </>
   </div>

  )

  setAboutData(data)
  setExperienceData(null)
  setLocationData(null)
  setIsEditProfileOpen(null);

  setRatingData(null)
setAppointment(null)

}

const[Appointment,setAppointment]=useState(null)
const Select_Appon = ()=>{
 
  const data=(

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
                <form>
                    <div class="row g-3">
                        <div class="col-12">
                            <select class="form-select border-0" onChange={handlePayNowChange}>
                                <option value="no">Pay Later</option>
                                <option value="yes">Pay Now</option>
                            </select>
                        </div>
                        <div class="col-12 col-sm-6">
                            <input type="text"
                            value={name_}
                            onChange={Handelname}
                            class="form-control border-0"
                             placeholder="Your Name"
                              style={{height: "55px;"}}/>
                        </div>
                        <div class="col-12 col-sm-6">
                            <input
                             type="email"
                              class="form-control border-0" 
                              placeholder="Your Email"
                              style={{height: "55px;"}}
                              onChange={HandelEmail}
                              value={email}
                               />
                        </div>
                        <div class="col-12 col-sm-6">
                            <input type="text"
                             class="form-control border-0"
                              placeholder="Your Mobile"
                              style={{height: "55px;"}}
                              onChange={HandelMobile}
                              value={mobile}
                               />
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="date" id="date" data-target-input="nearest">
                                <input type="date"
                                    class="form-control border-0 datetimepicker-input"
                                    placeholder="Choose Date"
                                    data-target="#date"
                                    data-toggle="datetimepicker"
                                    style={{height: "55px;"}}
                                    onChange={Handeldate}
                                    value={date}/>
                            </div>
                        </div>
                        <div class="col-12">
                            <textarea 
                            class="form-control border-0"
                             rows="5" 
                             placeholder="Describe your problem"
                             value={problemDescription}
                             onChange={HandelProps}
                             ></textarea>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary w-100 py-3" onClick={Save_Appointment} type="submit">Book Appointment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
                            {!payNow ?  (
                            <>
                              {/* <CheckoutForm></CheckoutForm> */}
                            </>
                        ):(<></>)}
</div>
</div>
  )
  setAppointment(data)
  setIsEditProfileOpen(null);
  setAboutData(null)
  setExperienceData(null)
  setLocationData(null)
  setRatingData(null)
}
const Select_Overview = ()=>{

}

//________________________________________________________________________________________________
const handleDeleteAccount = () => {
  axios
  .delete(`https://retoolapi.dev/EBWb8G/Doctors/${ doctorInfo.id}`)
    .then(response => {
      console.log('Account deleted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error deleting account:', error);
    });
};

//______________________________________________________________________________________
useEffect(() => {
  axios.get(`https://retoolapi.dev/EBWb8G/Doctors/${doctorInfo.id}`)
    .then(response => {
      setDoctorInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}, [id]);
const handleChange = (e) => {
  const { name, value } = e.target;
  setDoctorInfo(prevData => ({
    ...prevData,
    [name]: value
  }));
};
const handleSubmit = (e) => {
  e.preventDefault();
  axios.patch(`https://retoolapi.dev/EBWb8G/Doctors/${doctorInfo.id}`, doctorInfo)
    .then(response => {
      console.log('User data updated successfully:', response.data);
    })
    .catch(error => {
      console.error('Error updating user data:', error);
    });
};
const [isEditProfileOpen, setIsEditProfileOpen] = useState(null);
const toggleEditProfile = () => {
  const data=(
    <div className='container m-5'>
    <h1>Edit User</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="bio" className="form-label">Bio:</label>
        <textarea id="bio" name="Bio" className="form-control" value={doctorInfo.Bio} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">Img:</label>
        <input id="img" type="text" name="Img" className="form-control" value={doctorInfo.Image} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input id="name" type="text" name="name" className="form-control" value={doctorInfo.Doctor_Name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input id="email" type="text" name="Email" className="form-control" value={doctorInfo.Email } onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input id="phone" type="text" name="Phone" className="form-control" value={doctorInfo.Phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location:</label>
        <input id="location" type="text" name="Location" className="form-control" value={doctorInfo.Location} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="payment" className="form-label">Payment Appointment:</label>
        <input id="payment" type="text" name="Payment_Appointment" className="form-control" value={doctorInfo.Payment_Appointment} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  </div>
  )
  setIsEditProfileOpen(data);
  setAppointment(null)
  setAboutData(null)
  setExperienceData(null)
  setLocationData(null)
  setRatingData(null)
};
//___________________________________________________________________

//__________________________________________________________________________________________________________________
const [payNow, setPayNow] = useState(true);
const [paymentMethod, setPaymentMethod] = useState(null);
const[name_,setname_]=useState('')
const[email,setemail]=useState('')
const[mobile,setmobile]=useState('')
const[date,setdate]=useState('')
const[problemDescription,setproblemDescription]=useState('')
const handlePayNowChange = (event) => {
    setPayNow(event.target.value === 'no');
};
const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
};
const Handelname=(event)=>{
  const input = event.target.value
  setname_(input)
}
const HandelEmail=(event)=>{
  setemail(event.target.value)
}
const HandelMobile=(event)=>{
  setmobile(event.target.value)
}

const Handeldate=(event)=>{
  setdate(event.target.value)
} 

const HandelProps=(event)=>{
  setproblemDescription(event.target.value)
}
const[SS,setSS]=useState()
useEffect(() => {
  axios(`https://retoolapi.dev/15YN0H/Appointment`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
}, []);
const Save_Appointment =(event)=>{
  event.preventDefault()
  const Appointment= {
    id:SS + 1,
    Name:name_,
    Paid:payNow,
    Email:email,
    Phone:mobile,
    Doctot_name:doctorInfo.name,
    Data_Appointment:date,
    Problem:problemDescription,
  }
axios
.post('https://retoolapi.dev/15YN0H/Appointment', Appointment)
  .then(response => {
    console.log('Appointment posted successfully:', response.data);
  })
  .catch(error => {
    console.error('Error posting Appointment:', error);
  }); 
}
//________________________________________________________________________________
const [userData, setUserData] = useState(null);
useEffect(() => {
  // Retrieve user data from session storage
  const storedUserData = sessionStorage.getItem('userData');
  if (storedUserData) {
    setUserData(JSON.parse(storedUserData));
  }
}, []);
//_______________________________________________________________________________________________________
  return ( 
      <>
        <div className="container-fluid">
                <div><br/><br/><br/><br/>
                </div>
                        <div className="row" style={{background:"#03974D"}}>
                            <div className="col-lg-2 col-sm-12 my-5  d-flex flex-column align-items-center">
                                <img src='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' className="border border-white border-3 rounded-2" style={{width:'170px'}}/>
                            {doctorInfo.Rating}
                            </div>
                            <div className="col-lg-6 lg-sm-12 my-5 text-start text-white">
                                <h1 style={{Color:"white"}}> Dr. {doctorInfo.Doctor_Name}</h1>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <img src="/stethoscope.jpg" width={"35px"} className="rounded-circle"/>
                                    <h5>&nbsp; Nutritionist &bull; {'{'}{doctorInfo.Gender}{'}'} &bull; Age {'{'}doctorInfo.age{'}'}</h5> 
                                </div> 
                                <br/><p>Dr.{doctorInfo.name}, MD is a Nutrition specialist in {doctorInfo.location}, NY and has over {'{'}doctorInfo.experiece{'}'} years of experience in nutrition field. Graduated from University of {'{'}doctorInfo.university{'}'} of Medicine in {'{'}doctorInfo.graddate{'}'}. </p>
                            </div>
                        </div> 
                        <div className="row docgradient">
                            <div className="col-1"></div>
                            <div className="col-7">
                                <nav class="navbar navbar-expand-lg bg-white border border-secondary" style={{height:"100px"}}>
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                        <div class="navbar-nav bg-white d-flex justify-content-center" > 
                                            <button className="nav-link" onClick={Select_Overview}><h6 style={{color:"green"}}>Overview</h6></button>
                                            <button className="nav-link" onClick={selectLocation}><h6 style={{color:"green"}}>Location</h6></button>
                                            <button className="nav-link"  onClick={Select_Exprience}><h6 style={{color:"green"}}>Experience</h6></button>
                                            <button className="nav-link" onClick={Select_Rating}><h6 style={{color:"green"}}>Ratings</h6></button>
                                            <button className="nav-link" onClick={Select_About}><h6 style={{color:"green"}}>About Me</h6></button>
                                            <button className="nav-link" onClick={Select_Appon}><h6 style={{color:"green"}}>Appointment</h6></button>
                                            {userData && userData.role === 'doctor' && (
                                            <DropdownButton
                                              id="dropdown-basic-button"
                                              title="Settings"
                                              variant="success"
                                              className="mx-2"
                                            >
                                              <Dropdown.Item onClick={toggleEditProfile}>Edit Profile</Dropdown.Item>
                                              <Dropdown.Item onClick={handleDeleteAccount}>Delete Account</Dropdown.Item>
                                            </DropdownButton>
                                                  )}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                 <div className="col-4"></div>
                </div> 
                <div className="container">
                  {AboutData}
                  {Appointment}
                  {RatingData}
                  {ExperienceData}
                  {locationData}
                </div>
       </div>
      </>       
  );
}
export default DoctorDetails;




// <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label className="form-label">Name</label>
    //       <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
    //     </div>
    //     <div className="mb-3">
    //       <label className="form-label">Email</label>
    //       <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
    //     </div>
    //     <div className="mb-3">
    //       <label className="form-label">Phone</label>
    //       <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
    //     </div>
    //     <div className="mb-3">
    //       <label className="form-label">Location</label>
    //       <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
    //     </div>
    //     <div className="mb-3">
    //       <label className="form-label">Start Date</label>
    //       <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    //     </div>
    //     <div className="mb-3">
    //       <label className="form-label">Payment Appointment</label>
    //       <select className="form-select" value={paymentAppointment} onChange={(e) => setPaymentAppointment(e.target.value)}>
    //         <option value="debit">Debit</option>
    //         <option value="credit">Credit</option>
    //       </select>
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>
    // </div>



























//     <div class="container-xxl py-5">
//     <div class="container">
//         <div class="row g-5">
//             <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
//                 <p class="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
//                 <h1 class="mb-4">Make An Appointment To Visit Our Doctor</h1>
//                 <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
//                 <div class="bg-light rounded d-flex align-items-center p-5 mb-4">
//                     <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px;", height: "55px;"}}>
//                         <i class="fa fa-phone-alt text-primary"></i>
//                     </div>
//                     <div class="ms-4">
//                         <p class="mb-2">Call Us Now</p>
//                         <h5 class="mb-0">{doctorInfo.Phone}</h5>
//                     </div>
//                 </div>
//                 <div class="bg-light rounded d-flex align-items-center p-5">
//                     <div class="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: "55px;", height: "55px;"}}>
//                         <i class="fa fa-envelope-open text-primary"></i>
//                     </div>
//                     <div class="ms-4">
//                         <p class="mb-2">Mail Us Now</p>
//                         <h5 class="mb-0">{doctorInfo.Email}</h5>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
//                 <div class="bg-light rounded h-100 d-flex align-items-center p-5">
//                     <form>
//                         <div class="row g-3">
//                             <div class="col-12 col-sm-6">
//                                 <input type="text" class="form-control border-0" placeholder="Your Name" style={{height: "55px;"}}/>
//                             </div>
//                             <div class="col-12 col-sm-6">
//                                 <input type="email" class="form-control border-0" placeholder="Your Email" style={{height: "55px;"}}/>
//                             </div>
//                             <div class="col-12 col-sm-6">
//                                 <input type="text" class="form-control border-0" placeholder="Your Mobile" style={{height: "55px;"}}/>
//                             </div>
//                             <div class="col-12 col-sm-6">
//                                 <div class="date" id="date" data-target-input="nearest">
//                                     <input type="date"
//                                         class="form-control border-0 datetimepicker-input"
//                                         placeholder="Choose Date" data-target="#date" data-toggle="datetimepicker" style={{height: "55px;"}}/>
//                                 </div>
//                             </div>
//                             <div class="col-12">
//                                 <textarea class="form-control border-0" rows="5" placeholder="Describe your problem"></textarea>
//                             </div>
//                             <div class="col-12">
//                                 <button class="btn btn-primary w-100 py-3" type="submit">Book Appointment</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// {!overview ? (<></>) : (<></>)}
// {!Islocation ?  
//  (
//   <div className="map_container mt-5" style={{width:'100%'}}>
//                  <h2 className="text-start text-success ">Location <hr></hr></h2>
//                  <div className="map-responsive" style={{width:'100%',height:'600px'}}>
//                  <iframe
//                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${doctorInfo.location}`}
//                      width="100%"
//                      height="300"
//                      frameborder="0"
//                      style={{ border: '0;', width: '100%;', height: '100%' }}
//                      allowfullscreen
//                  ></iframe>
//                  </div>
//  </div>
//  ):(
//   <h1></h1>
//  )
//  }
//  {!IsExprience ? 
//  (
//    // <>
  //  // <h1 className="text-start col-12">
  //  //   Experience and Background Checks
  //  //   <hr></hr>
  //  // </h1>
   
  //  // <br></br>
  //  // <div className="row border " style={{width:'100%',height:'100px'}}>
  //  //   <span className="">
  //  // <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwc96ABQRwexDILOeixZ0SMISPPeoavW7U1sJfIfX-vwfDL_Xc' style={{width:'70px'}} />
  //  // <p className="">Exprience</p></span>
  //  // <span className="col-6" style={{width:'100px'}}>
  //  //   <img src='https://media.licdn.com/dms/image/D4E0BAQGMXphjW3D52g/company-logo_200_200/0/1703668545508?e=1715817600&v=beta&t=33f6xNyyb4747yocqYoswXfCk5AiBYdAoC-GQQLBzLs' style={{width:'70px'}}/>
  //  //   <span><p className="">Background</p></span></span>
  //  // </div>
  //  // <p className="text-start">Experience Check<br></br>
  //  //   Check Dr.{doctorInfo.name}'s experience treating your condition or procedure</p>
  //  // </>
  //  <div className="container">
  //  <div className="container ">
  //        <h1 className="text-start ">
  //      Experience and Background Checks
  //      <hr />
  //    </h1>
  //  </div>
  //  <div className="container mt-5">
  //        <div className="row border mb-5" style={{ width: '500px', height: 'auto' }}>
  //          <div className="col-6 d-flex align-items-center">
  //              <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwc96ABQRwexDILOeixZ0SMISPPeoavW7U1sJfIfX-vwfDL_Xc' style={{ width: '70px' }} />
  //              <p className="m-0 ms-2">Experience</p>
  //          </div>
  //          <div className="col-6 d-flex align-items-center">
  //              <img src='https://media.licdn.com/dms/image/D4E0BAQGMXphjW3D52g/company-logo_200_200/0/1703668545508?e=1715817600&v=beta&t=33f6xNyyb4747yocqYoswXfCk5AiBYdAoC-GQQLBzLs' style={{ width: '70px' }} />
  //              <p className="m-0 ms-2">Background</p>
  //          </div>
  //      </div>
  //      <p className="text-start">Experience Check<br />
  //          Check Dr. {doctorInfo.name}'s experience treating your condition or procedure
  //      </p>
  //  </div>
  //  </div>

//  ) : (
//      <h1></h1>

//  )}
//  {!Israting ?
//   (
//  <>
//  <div className="container row d-flex" style={{width:'80%'}}>
//      <div className="col-6">
//       <h3>Dr. {doctorInfo.name} Reviews</h3>
//       <>Likelihood to recommend Dr.{doctorInfo.name}</>
//       <div>Based on {doctorInfo.Rating.length/2} ratings</div>
//       <h2>{doctorInfo.Rating}</h2>
//       <p>4.1 average based on 254 reviews.</p>
//      <hr style={{border:"3px solid #f1f1f1"}}/>
//      </div>
//      <div className="col-6 border">
//       <p className="pt-3">Leave Review</p>
//       <hr></hr>
//       <>How likely are you to recommend 
//       <br></br>Dr.{doctorInfo.name}</><br></br>
//       <div className="mt-4">
//              <i className="fas fa-star" ></i>                  
//              <i className="fas fa-star" ></i>
//              <i className="fas fa-star" ></i>
//              <span className="fa fa-star checked"></span>
//              <span className="fa fa-star"></span> <br></br>
//      </div>
//        <div className='m-3'>Select Rating</div>
//      </div>
//      <div className="mt-5">
//        <h3>Reviews</h3>
//        <hr></hr>
//        <CommentSection 
//        ></CommentSection>
//        <CommentSection></CommentSection>
//        <CommentSection></CommentSection>
//      </div>
//    <div className="col-12 border mt-4"  >
//    <h5 className="text-start pt-3">Leave a review</h5>
//    <p className="text-start">How was your experience with 
//      Dr.{doctorInfo.name}</p>
//    <div className="d-flex pb-4">
//          <input 
//          className="form-control me-2" 
//          type="text" 
//          onChange={handleNameChange}
//          placeholder="Leave Review ..." 
//          value={newReview}/>
//          <button className="btn btn-success rounded-pill"
//          onClick={handleReview}>Continue</button>
//    </div>
//      </div>
//  </div>
//  </>
//   ):(
//       <></>
//   )} 

//  {About ? (
//    <div className="" style={{width:'700px'}}>
//    <h4 className="text-start">About Me</h4>
//    <hr className="color-primary"></hr>
//   <MinMaxText 
//   text={`Dr.${doctorInfo.name} is an established and highly skilled 
//   physician with over 15 years of experience. She is a 
//   graduate of the University of Miami School of Medicine.
//    She completed her residency in family medicine at Montefiore
//     Medical Center, Albert Einstein College of Medicine.
//      She is a board-certified family physician who has been
//       actively involved in medical school and residency training
//       of future physicians. Over the past many years, Dr. Beecham
//        has led the delivery of high-quality care within various healthcare organizations,
//         she’s a patient advocate and proponent of health equity for all. Professionally, 
//         her interests include preventive medicine, women’s health, diabetes and cardiovascular disease.
//          She enjoys getting to know her patients and developing relationships with them over time. When not at work Dr. Beecham is active in the community, she has volunteered with various organizations to improve health outcomes. She enjoys traveling, leisure sports and various outdoor activities.`}
//   maxLength={100}
//   >
//   </MinMaxText>
//   <>
//              <> 
//              <h4 class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Education</h4>
//              <hr></hr>
//              <div class="col-6">
//                          <div class="collapse multi-collapse" id="multiCollapseExample2">
//                          <div class=" card-body " style={{width:'500px'}}> 
//                          <h6 className='text-start'>A Einstein College M Yeshiva University</h6>
//                          Residency Hospital
//                          <h6 className='text-start'>University of Miami Miller School of Medicine</h6>
//                          Medical School, 2001
//                          </div>
//                          <hr></hr>

//                  </div>
//              </div>
//              </>
//              <>
//              <div className='row '>
//                      <h4 class="text-start"type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample2" >Language</h4>
//              </div>
//              <hr></hr>
//              <div class="col-12">
//                  <div class="collapse multi-collapse" id="multiCollapseExample1">
//                  <div class=" card-body " style={{width:'500px'}}> 
//                  <h6 className='text-start'>English</h6>
//                  <h6 className='text-start'>Arabic</h6>
//                  </div>
//                  </div>
//              </div>
//              </>
//              <>
//              <>
//              <div className='row '>
//                      <h4 class="text-start"type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample2" >Frequantly Asked Quastion</h4>
//              </div>
//              <hr></hr>
//              <div class="col-12">
//                  <div class="collapse multi-collapse" id="multiCollapseExample3">
//                  <div class=" card-body " style={{width:'500px'}}> 
//                  <h5 className='text-start'>
//                  What is the best way to schedule an appointment with Dr.{doctorInfo.name}?<br></br>
//                  <p className="text-success">New patients may call {doctorInfo.Phone} to make an appointment.</p>
//                  </h5>
//                  <h5 className='text-start'>
//                  Can I use my insurance at Dr.{doctorInfo.name}?
//                  <p  className="text-success">Dr.{doctorInfo.name}, MD accepts various insurance plans. You can easily check if your insurance provider is accepted by using the Healthgrades insurance check. We recommend verifying your insurance coverage before scheduling an appointment to ensure a seamless experience.</p>
//                  </h5>
//                  <h5 className='text-start'>
//                  What is Dr.{doctorInfo.name}'s office address?
//                  <p  className="text-success">Dr. Beecham Robinson's office is located at {doctorInfo.Location} You can find other locations and directions on Healthgrades.</p>
//                  </h5>
//                  <h5 className='text-start '>
//                  What languages does Dr.{doctorInfo.name} speak?
//                  <p  className="text-success">Dr.{doctorInfo.name} is fluent in 2 languages: English and Arabic.</p>
//                  </h5>
//                  </div>
//                  <hr></hr>

//                  </div>
//              </div>
//              </>

