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
function DoctorDetails() {
  const { id } = useParams();
  console.log("id:", id);
  const [doctorInfo, setDoctorInfo] = useState({});
  useEffect(() => {
      axios(`https://retoolapi.dev/Pf4yJq/data/${id}`)
          .then((res) => setDoctorInfo(res.data))
          .catch((err) => console.log(err));
  }, [id]);
// handel Sections 
const [Islocation,setIslocation]=useState(true);
const Select_Location = ()=>{
    setIslocation(!Islocation)
    setIsExprience(true)
    setIsrating(true)
    setAbout(false)

}


const [IsExprience,setIsExprience]=useState(true);
const Select_Exprience = ()=>{
    setIsExprience(!IsExprience)
    setIslocation(true)
    setIsrating(true)
    setAbout(false)

}

const[Israting ,setIsrating]=useState(true)
const Select_Rating = ()=>{
    setIsrating(!Israting)
    setIslocation(true)
    setIsExprience(true)
    setAbout(false)

}
const[overview,setoverview]=useState(false)
const Select_Overview = ()=>{
    setoverview(!overview)
    setIsrating(true)
    setIslocation(true)
    setIsExprience(true)
    setAbout(false)
}
const[About,setAbout]=useState(false)
const Select_About = ()=>{
    setAbout(!About)
    setoverview(true)
    setIsrating(true)
    setIslocation(true)
    setIsExprience(true)
}

  const [showFullBio, setShowFullBio] = useState(false);
  const toggleShowFullBio = () => {
      setShowFullBio(!showFullBio); 

  };
const[requset,setrequset]=useState(true)
const Select_Appon = ()=>{
  setAbout(true)
  setoverview(true)
  setIsrating(true)
  setIslocation(true)
  setIsExprience(true)
  setrequset(!requset)
}


// handel review _____________________________________________________________________________________________
const [newReview, setNewReview] = useState();
const handleNameChange = (event) => {
  const inputName = event.target.value;
  setNewReview(inputName);
};
// handell review 
const[id_,setid_]=useState()
useEffect(() => {
  axios(`https://retoolapi.dev/MborCQ/Reviews`)
      .then((res) => setid_(res.data.id))
      .catch((err) => console.log(err));
}, [id]);
// handle posting a review
const handleReview = (event) => {
event.preventDefault();
 const reviewData = {
      "id": id_ + 1,
      "Rate": "⭐️⭐️⭐️",
      "Review": newReview,
      "User_id": 1,
      "Doctor_id": doctorInfo.id,
      "User Name": "mahmoud",
      "Doctor_Name": doctorInfo.name
    };
    axios
    .post('https://retoolapi.dev/MborCQ/Reviews', reviewData)
      .then(response => {
        console.log('Review posted successfully:', response.data);
        setNewReview('')
      })
      .catch(error => {
        console.error('Error posting review:', error);
      });
  };
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
                        <h1 style={{Color:"white"}}> Dr. {doctorInfo.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                           <img src="/stethoscope.jpg" width={"35px"} className="rounded-circle"/>
                            <h5>&nbsp; Nutritionist &bull; {'{'}doctorInfo.gender{'}'} &bull; Age {'{'}doctorInfo.age{'}'}</h5> 
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
                                    <button className="nav-link" onClick={Select_Location}><h6 style={{color:"green"}}>Location</h6></button>
                                    <button className="nav-link"  onClick={Select_Exprience}><h6 style={{color:"green"}}>Experience</h6></button>
                                    <button className="nav-link" onClick={Select_Rating}><h6 style={{color:"green"}}>Ratings</h6></button>
                                    <button className="nav-link" onClick={Select_About}><h6 style={{color:"green"}}>About Me</h6></button>
                                    <button className="nav-link" onClick={Select_Appon}><h6 style={{color:"green"}}>Appointment</h6></button>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="col-4"></div>
                </div> 
         <div>
</div>
</div>
{/* Content Profile */}
<div className="container mt-5 d-flex justify-content-center">
              {!overview ? (<></>) : (<></>)}
               {!Islocation ?  
                (
                 <div className="map_container mt-5" style={{width:'100%'}}>
                                <h2 className="text-start text-success ">Location <hr></hr></h2>
                                <div className="map-responsive" style={{width:'100%',height:'600px'}}>
                                <iframe
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${doctorInfo.location}`}
                                    width="100%"
                                    height="300"
                                    frameborder="0"
                                    style={{ border: '0;', width: '100%;', height: '100%' }}
                                    allowfullscreen
                                ></iframe>
                                </div>
                </div>
                ):(
                 <h1></h1>
                )
                }
                {!IsExprience ? 
                (
                  // <>
                  // <h1 className="text-start col-12">
                  //   Experience and Background Checks
                  //   <hr></hr>
                  // </h1>
                  
                  // <br></br>
                  // <div className="row border " style={{width:'100%',height:'100px'}}>
                  //   <span className="">
                  // <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwc96ABQRwexDILOeixZ0SMISPPeoavW7U1sJfIfX-vwfDL_Xc' style={{width:'70px'}} />
                  // <p className="">Exprience</p></span>
                  // <span className="col-6" style={{width:'100px'}}>
                  //   <img src='https://media.licdn.com/dms/image/D4E0BAQGMXphjW3D52g/company-logo_200_200/0/1703668545508?e=1715817600&v=beta&t=33f6xNyyb4747yocqYoswXfCk5AiBYdAoC-GQQLBzLs' style={{width:'70px'}}/>
                  //   <span><p className="">Background</p></span></span>
                  // </div>
                  // <p className="text-start">Experience Check<br></br>
                  //   Check Dr.{doctorInfo.name}'s experience treating your condition or procedure</p>
                  // </>
                  <div className="container">
                  <div className="container ">
                        <h1 className="text-start ">
                      Experience and Background Checks
                      <hr />
                    </h1>
                  </div>
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
                  </div>

                ) : (
                    <h1></h1>

                )}
                {!Israting ?
                 (
                <>
                <div className="container row d-flex" style={{width:'80%'}}>
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
                      <CommentSection 
                      ></CommentSection>
                      <CommentSection></CommentSection>
                      <CommentSection></CommentSection>
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
                </>
                 ):(
                     <></>
                 )} 

                {About ? (
                  <div className="" style={{width:'700px'}}>
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
                ):(
                  <>
                  </>
                )}
                {requset ? (
                  <></>
                ):(
                 <></>
                )}

          
</div>
</>       
  );
}

export default DoctorDetails;