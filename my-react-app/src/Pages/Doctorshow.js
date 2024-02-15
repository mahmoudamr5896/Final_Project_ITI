import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Css/Doctors.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StarRating from "../Component/Rate";
import { Button } from "bootstrap";
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
}

const [IsExprience,setIsExprience]=useState(true);
const Select_Exprience = ()=>{
    setIsExprience(!IsExprience)
    setIslocation(true)
    setIsrating(true)
}

const[Israting ,setIsrating]=useState(true)
const Select_Rating = ()=>{
    setIsrating(!Israting)
    setIslocation(true)
    setIsExprience(true)
}
const[overview,setoverview]=useState(false)
const Select_Overview = ()=>{
    setoverview(!overview)
    setIsrating(true)
    setIslocation(true)
    setIsExprience(true)
}
const[About,setAbout]=useState(false)
const Select_About = ()=>{
  setAbout(!About)
    setoverview(true)
    setIsrating(true)
    setIslocation(true)
    setIsExprience(true)
}
  return (
            <div className="container-fluid">
                <div><br/><br/><br/><br/></div>
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
                                    <button className="nav-link" onClick={Select_About}><h6>About_Me</h6></button>
                                    <button className="nav-link"><h6>Hospitals</h6></button>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="col-4"></div>
                </div> 
                <div>
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
                  <>
                  <h1 className="text-start">
                    Experience and Background Checks
                    <hr></hr>
                  </h1>
                  <div className="row border " style={{width:'600px',height:'100px'}}>
                    <span className="col-6">
                  <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwc96ABQRwexDILOeixZ0SMISPPeoavW7U1sJfIfX-vwfDL_Xc' style={{width:'70px'}} />
                  <p className="">Exprience</p></span>
                  <span className="col-6" style={{width:'100px'}}>
                    <img src='https://media.licdn.com/dms/image/D4E0BAQGMXphjW3D52g/company-logo_200_200/0/1703668545508?e=1715817600&v=beta&t=33f6xNyyb4747yocqYoswXfCk5AiBYdAoC-GQQLBzLs' style={{width:'70px'}}/>
                    <span><p className="">Background</p></span></span>

                  </div>
                  <p className="text-start">Experience Check<br></br>
                    Check Dr.{doctorInfo.name}'s experience treating your condition or procedure</p>
                  </>
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
                  <div className="col-12 border mt-4"  >
                  <h5 className="text-start">Leave a review</h5>
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
                </div>

            </div>
  );
}

export default DoctorDetails;