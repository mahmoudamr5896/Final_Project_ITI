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
  return (
            <div className="container-fluid">
                <div><br/><br/><br/><br/></div>
                <div className="row" style={{background:"#03974D"}}>
                    <div className="col-lg-2 col-sm-12 my-5  d-flex flex-column align-items-center">
                        <img src='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' className="border border-white border-3 rounded-2" style={{width:'170px'}}/>
                    <StarRating />
                    </div>
                    <div className="col-lg-6 lg-sm-12 my-5 text-start text-white">
                        <h1>Dr. {doctorInfo.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                           <img src="/stethoscope.jpg" width={"35px"} className="rounded-circle"/>
                            <h5>&nbsp; Nutritionist &bull; {'{'}doctorInfo.gender{'}'} &bull; Age {'{'}doctorInfo.age{'}'}</h5> 
                        </div> 
                        <br/><p>Dr. {doctorInfo.name}, MD is a Nutrition specialist in {doctorInfo.location}, NY and has over {'{'}doctorInfo.experiece{'}'} years of experience in nutrition field. Graduated from University of {'{'}doctorInfo.university{'}'} of Medicine in {'{'}doctorInfo.graddate{'}'}. </p>
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
                                <div class="navbar-nav bg-white">
                                    <button className="nav-link" onClick={Select_Overview} >Overview</button>
                                    <button className="nav-link" onClick={Select_Location}>Location</button>
                                    <button className="nav-link"  onClick={Select_Exprience}>Experience</button>
                                    <button className="nav-link" onClick={Select_Rating}>Ratings</button>
                                    <button className="nav-link" >Insurance</button>
                                    <Link className="nav-link" to="#">About</Link>
                                    <Link className="nav-link" to="#">Hospitals</Link>
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
                                    <h2>Location</h2>
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
                    <h1>Exprince</h1>

                ) : (
                    <h1></h1>

                )}
                {!Israting ?
                 (
                <>Rating</>
                 ):(
                     <></>
                 )} 

                </div>

            </div>
  );
}

export default DoctorDetails;