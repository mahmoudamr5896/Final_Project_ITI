
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Css/Doctors.css'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import StarRating from "../Component/Rate";
import { Button } from "bootstrap";
import MinMaxText from "../Component/Minimaize";
import CommentSection from '../Component/ReviewComponent'
import AppointmentRequestCard from '../Component/RequastApp'
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import CheckoutForm from '../Component/CheekoutForm'
import EditDoctorPage from '../Component/CompnentFormEditDoctor'
import AppointmentForm from '../Component/AppiontmentDoctors'
import DoctorReview from '../Component/DoctorReview';
import { Modal } from "react-bootstrap";
import { useContext } from "react";
import MyContext from "../Context/Context";
import ReviewComponent from '../Component/ComponentRate'
import DoctorScheduleForm from '../Component/Schule'
function DoctorDetails() {
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const { id } = useParams();
  const [doctorInfo, setDoctorInfo] = useState({
      name: '',
      age: '',
      image: '',
      experience: 0,
      gender: "",
      phone: "",
      location: ""
  });
      // Bio: '',
      // Img: '',
      // name: '',
      // Email: '',
      // Phone: '',
      // Location: '',
      // Payment_Appointment: '',
      // Password:'',

  useEffect(() => {
      axios(`http://127.0.0.1:8000/doctors/${id}/`)
          .then((res) => setDoctorInfo(res.data))
          .catch((err) => console.log(err));
  }, [id]);

        // "username": "mahmoudsaleh",
        // "name": "mahmoudundefined",
        // "age": 27,
        // "image": null,
        // "experience": 0,
        // "gender": "M",
        // "phone": "+20",
        // "location": "None"

const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    const inputReview = event.target.value;
    setNewReview(inputReview);
  };

  // const handleReview = async (event) => {
  //   event.preventDefault();
  //   const reviewData = {
  //     Rate: '⭐️⭐️⭐️',
  //     Review: newReview,
  //     User_id: 1,
  //     Doctor_id: null, // Assuming you don't have doctorInfo, set this to null
  //     User_name: 'mahmoud',
  //     Doctor_Name: 'Dr. Example', // Replace 'Dr. Example' with the actual name of the doctor
  //   };
  //   const apiKey = 'id';
  //   console.log(reviewData);
  //   try {
  //     const response = await axios.post('https://retoolapi.dev/NJuvHL/Reviews', reviewData, {
  //       headers: {
  //         Authorization: `Bearer ${apiKey}`,
  //       },
  //     });
  //     console.log('Review posted successfully:', response.data);
  //     setNewReview('');
  //     setError(null);
  //   } catch (error) {
  //     console.error('Error posting review:', error);
  //     setError('Error posting review');
  //   }
  // };
//_______________________________________________________________________________________________
const[showFullBio,setShowFullBio]=useState(null)
const toggleShowFullBio = () => {
      setShowFullBio(!showFullBio); 
};
//______________________________________________________________________________________________
// handel Sections 
//_________________________________________________________________________________________________________
const [locationData, setLocationData] = useState(null);
const selectLocation = (e) => {
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
//___________________________________________________________________________________________
const [ExperienceData, setExperienceData] = useState(null);
const Select_Exprience = (e)=>{
  e.preventDefault()

const data=(
  <div className="container">
      <h1 className="text-start col-12"/>
  <div className="container">     <h1 className="text-start col-12">
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
  </div>

)
setIsEditProfileOpen(null);
setExperienceData(data)
setLocationData(null)
setRatingData(null)
setAboutData(null)
setAppointment(null)
}
//___________________________________________________________________________________
const storedId = sessionStorage.getItem('userData') ;
const userDatas = JSON.parse(storedId);
if(userDatas){
    var User_id = userDatas.id;
    var User_name = userDatas.name;
}
// handel review _____________________________________________________________________________________________
const[RatingData,setRatingData]=useState(null)
const Select_Rating = (e)=>{
  e.preventDefault()

let data = (
 <div className="container row d-flex mt-5" style={{width:'80%'}}>
     <div className="col-6">
     <h3>Dr. {doctorInfo.name.split('_').join(' ')} Reviews</h3>

      <>Likelihood to recommend Dr. {doctorInfo.name.split('_').join(' ')}</>
      <div>Based on {doctorInfo.Rating} ratings</div>
      <h2>{doctorInfo.Rating}</h2>
      <p>4.1 average based on 254 reviews.</p>
     <hr style={{border:"3px solid #f1f1f1"}}/>
     </div>
     {/* <div className="col-6 border">
      <p className="pt-3">Leave Review</p>
      <hr></hr>
      <>How likely are you to recommend 
      <br></br>Dr.{doctorInfo.name}</><br></br>
      <div className="mt-4" >
             <i className="fas fa-star" onClick={handleChange_rate} name='1' ></i>                  
             <i className="fas fa-star" name='2' onClick={handleChange_rate}></i>
             <i className="fas fa-star" name='3'  onClick={handleChange_rate}></i>
             <span className="fa fa-star " name='4' onClick={handleChange_rate}></span>
             <span className="fa fa-star" name='5' onClick={handleChange_rate}></span> <br></br>
      </div>
       <div className='m-3'>Select Rating</div>
     </div> */}
     <ReviewComponent 
     doctorInfo={doctorInfo}
     />
     <div className="mt-5">
       <h3>Reviews</h3>
       <hr></hr>
       <div className="container"> 
         <CommentSection 
            doctorId={id}>
         </CommentSection>
       <hr>
       </hr>
      </div>
    
     </div>
   
    <DoctorReview
     doctor={doctorInfo}
     User={userDatas}
     />
 </div>
  )
setIsEditProfileOpen(null);
setRatingData(data)
setSchedule(null)

setLocationData(null)
setExperienceData(null)
setAboutData(null)
setAppointment(null)

}
//_________________________________________________________________________________________
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
  setSchedule(null)

  setRatingData(null)
setAppointment(null)

}
//_____________________________________________________________________________________
const Select_Overview = (e)=>{
  e.preventDefault()

}
//__________________________________________________________________________________
const[Appointment,setAppointment]=useState(null)
const Select_Appon = (e)=>{
e.preventDefault()
  const storedId = sessionStorage.getItem('userData');
   const userDatas = JSON.parse(storedId);
   if(userData){
       var User_id = userDatas.id
   }

  const data=(
    <AppointmentForm 
    doctorInfo={doctorInfo.id}
    UserR_id={User_id} 
    ></AppointmentForm>

 )
  setAppointment(data)
  setIsEditProfileOpen(null);
  setAboutData(null)
  setExperienceData(null)
  setLocationData(null)
  setRatingData(null)
  setSchedule(null)

}


//_______    Handell  Delete Account    _____________________________________________________________
// const updatePatientInfo = () => {
//   axios(`https://retoolapi.dev/zP9Zhd/patient/${id}`)
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
// };
// const [isEditProfileOpen, setIsEditProfileOpen] = useState(null);
// const toggleEditProfile = () => {
//   const data=(
//     <div className='container m-5'>
//       <EditUserPage userId={id}
//       updatePatientInfo={updatePatientInfo} />
//   </div>
//   )
//   setIsEditProfileOpen(data);
//   setAppointment(null)
//   setAboutData(null)
//   setExperienceData(null)
//   setLocationData(null)
//   setRatingData(null)
// };

//_____________________________________________________________________________________________________
// const handleShowModal = () => setShowModal(true);
// const handleCloseModal = () => setShowModal(false);

// const handleDeleteAccount = () => {
//   axios
//     .delete(`https://retoolapi.dev/zP9Zhd/patient/${id}`)
//     .then((response) => {
//       console.log("Account deleted successfully:", response.data);
//       setDeleteConfirmed(true);
//       handleCloseModal();
//       window.location.href = "/confirmation-page"; 
//     })
//     .catch((error) => {
//       console.error("Error deleting account:", error);
//     });
// };

//________________________________________________________________________________________________

const [showModal1, setShowModal1] = useState(false);
const handleOpenModal = () => {
  setShowModal1(true);
};

const handleCloseModal = () => {
  setShowModal1(false);
};
const[userDel,setUserDel]=useState([])
useEffect(() => {
  axios(`http://127.0.0.1:8000/users/`)
      .then((res) => setUserDel(res.data))
      .catch((err) => console.log(err));
}, [id]);

const User = userDel.find((d)=> d.username === doctorInfo.username )
console.log(User)
const history= useHistory()
const handleDeleteAccount = () => {
  axios
  .delete(`http://127.0.0.1:8000/doctors/${ doctorInfo.id}/`)
    .then(response => {
      console.log('Account deleted successfully:', response.data);
      axios
    .delete(`http://127.0.0.1:8000/users/${User.id}/`)
    .then(res =>{
      console.log('Delete user',res)
    })
      sessionStorage.removeItem('userData');
      history.push('/')
    })
    .catch(error => {
      console.error('Error deleting account:', error);
    });
};
//______________________________________________________________________________________
useEffect(() => {
  axios.get(`http://127.0.0.1:8000/doctors/${parseInt(id)}/`)
    .then(response => {
      setDoctorInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}, []);
const handleChange = (e) => {
  const { name, value } = e.target;
  setDoctorInfo(prevData => ({
    ...prevData,
    [name]: value
  }));
};
const handleSubmit = (e) => {
  e.preventDefault();
  axios.patch(`http://127.0.0.1:8000/doctors/${doctorInfo.id}/`, doctorInfo)
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
<EditDoctorPage
 userId={doctorInfo}
 ></EditDoctorPage>
  </div>
  )
  setIsEditProfileOpen(data);
  setAppointment(null)
  setAboutData(null)
  setExperienceData(null)
  setLocationData(null)
  setRatingData(null)
  setSchedule(null)

};
//___________________________________________________________________
const[Schedule,setSchedule]=useState(null)
const select_Schedule=()=>{

  const data = (
    <>
    <DoctorScheduleForm
    doctorId={id}>
    </DoctorScheduleForm>
    </>
    
)
setSchedule(data)
setIsEditProfileOpen(null);
setAppointment(null)
setAboutData(null)
setExperienceData(null)
setLocationData(null)
setRatingData(null)
}
//__________________________________________________________________________________________________________________

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
      <>
            <div className="container-fluid">
                    <div><br/><br/><br/><br/>
                    </div>
                            <div className="row" style={{background:"#03974D"}}>
                                <div className="col-lg-2 col-sm-12 my-5  d-flex flex-column align-items-center">
                                    <img src='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' className="border border-white border-3 rounded-2" style={{width:'170px'}}/>
                                {/* {doctorInfo.Rating} */}
                                </div>
                                <div className="col-lg-6 lg-sm-12 my-5 text-start text-white">
                                    <h1 style={{Color:"white"}}> Dr. {doctorInfo.name}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <img src="/stethoscope.jpg" width={"35px"} className="rounded-circle"/>
                                      <h5>&nbsp; Nutritionist &bull; {doctorInfo.gender === 'M' ? 'Male' : 'Female'} &bull; Age {doctorInfo.age}</h5>

                                    </div> 
                                    <br/><p>Dr.{doctorInfo.name}, MD is a Nutrition specialist in {doctorInfo.location}, NY and has over {doctorInfo.experience} years of experience in nutrition field. </p>
                                </div>
                            </div> 
                            <div className="row docgradient">
                                <div className="col-1"></div>
                                <div className="col-7">
                                    <nav class="navbar navbar-expand-lg bg-white border border-secondary" style={{height:"100px",width:"120%"}}>
                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style={{marginLeft:"5%"}}>
                                            <div class="navbar-nav bg-white d-flex justify-content-center" > 
                                                <button className="nav-link" onClick={Select_Overview}><h6 style={{color:"green"}}>Overview</h6></button>
                                                <button className="nav-link" onClick={selectLocation}><h6 style={{color:"green"}}>Location</h6></button>
                                                <button className="nav-link"  onClick={Select_Exprience}><h6 style={{color:"green"}}>Experience</h6></button>
                                                <button className="nav-link" onClick={Select_Rating}><h6 style={{color:"green"}}>Ratings</h6></button>
                                                <button className="nav-link" onClick={Select_About}><h6 style={{color:"green"}}>About Me</h6></button>
                                                <button className="nav-link" onClick={Select_Appon}><h6 style={{color:"green"}}>Appointment</h6></button>
                                                <button className="nav-link" onClick={select_Schedule}><h6 style={{color:"green"}}>Schedule</h6></button>
                                                {userData && userData.role === 'Doctor' && userData.id === doctorInfo.id && (
                                                <DropdownButton
                                                  id="dropdown-basic-button"
                                                  title="Settings"
                                                  variant="success"
                                                  className="mx-2"
                                                >
                                                <Dropdown.Item onClick={toggleEditProfile}>Edit Profile</Dropdown.Item>
                                                <Dropdown.Item >
                                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Delete Account</button>
                                               </Dropdown.Item>
                                                </DropdownButton>
                                                      )}
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                  <div class="modal-dialog">
                                                    <div class="modal-content">
                                                      <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Confirm Delete Account</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                      </div>
                                                      <div class="modal-body">
                                                      Are You Sure You Want To delete Account ?
                                                      </div>
                                                      <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </nav>
                                </div>

                                <div className="col-4"></div>
                            </div> 
                    <div>
            </div>
            </div>
            <div className="container mt-5 d-flex justify-content-center" id='Data'>
            {locationData}
            {ExperienceData}
            {RatingData}
            {AboutData}
            {Appointment}
            {isEditProfileOpen}
            {Schedule}
            </div>
            </> 
      
    </>
       
  );
}
export default DoctorDetails;

