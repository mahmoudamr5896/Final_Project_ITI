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
                        <h1>Dr. {doctorInfo.name}</h1>
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
                                <div class="navbar-nav bg-white d-flex justify-content-center">
                                    <button className="nav-link" onClick={Select_Overview}><h6>Overview</h6></button>
                                    <button className="nav-link" onClick={Select_Location}><h6>Location</h6></button>
                                    <button className="nav-link"  onClick={Select_Exprience}><h6>Experience</h6></button>
                                    <button className="nav-link" onClick={Select_Rating}><h6>Ratings</h6></button>
                                    <button className="nav-link" onClick={Select_About}><h6>About Me</h6></button>
                                    <button className="nav-link" onClick={Select_Appon}><h6>Appointment</h6></button>
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
              {!overview ? (<>OVER VIEW</>) : (<></>)}
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
                     <p>Leave Review</p>
                     <hr></hr>
                     <>How likely are you to recommend 
                     <br></br>Dr.{doctorInfo.name}</><br></br>
                     <div className="mt-4">
                     <i className="fas fa-star" style={{color: "#FFD43B"}}></i>                  
                     <i className="fas fa-star" style={{color: "#FFD43B"}}></i>
                     <i className="fas fa-star" style={{color: "#FFD43B"}}></i>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star"></span> <br></br>
                     </div>
                      <div className='m-3'>Select Rating</div>
                    </div>
                    <div className="mt-5">
                      <h3>Reviews</h3>
                      <hr></hr>
                      <CommentSection></CommentSection>
                      <CommentSection></CommentSection>
                      <CommentSection></CommentSection>
                    </div>
                  <div className="col-12 border mt-4"  >
                  <h5 className="text-start pt-3">Leave a review</h5>
                  <p className="text-start">How was your experience with 
                    Dr.{doctorInfo.name}</p>
                  <form className="d-flex pb-4">
                        <input className="form-control me-2" type="text" placeholder="Leave Review ..." />
                        <button className="btn btn-success rounded-pill">Continue</button>
                  </form>
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
                      has led the delivery of high-quality care within various healthcare organizations, she’s a patient advocate and proponent of health equity for all. Professionally, her interests include preventive medicine, women’s health, diabetes and cardiovascular disease. She enjoys getting to know her patients and developing relationships with them over time. When not at work Dr. Beecham is active in the community, she has volunteered with various organizations to improve health outcomes. She enjoys traveling, leisure sports and various outdoor activities.`}
                 maxLength={100}
                 >
                 </MinMaxText>
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