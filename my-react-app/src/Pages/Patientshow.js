import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Css/Doctors.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StarRating from "../Component/Rate";

function PatientDetails(){
  const { id } = useParams();
  console.log("id:", id);
  const [patientInfo, setPatientInfo] = useState({});
  const [appointmenttInfo, setAppointmentInfo] = useState({});

  useEffect(() => {
      axios(`https://retoolapi.dev/zP9Zhd/patient/${id}`)
          .then((res) => setPatientInfo(res.data))
          .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios(`https://retoolapi.dev/15YN0H/Appointment?User_id=${1}`)
        .then((res) => setAppointmentInfo(res.data))
        .catch((err) => console.log(err));
}, [id]);


  const [InformationData, setInformationData] = useState(null);
  const Select_Information = ()=>{
  const data=(
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-12 border border-success rounded-4 p-2 text-start">
                <h1 className="text-center text-success">Information</h1><hr/><br/>
                <table>
                    <tr>
                        <th><h3>Name :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Name}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>Email :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Email}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>Phone :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Phone}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>Gender :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Gender}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>Age :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Age}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>Weight :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Weight}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>Height :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Height}</h5></th>
                    </tr>
                    <tr>
                        <th><h3>BMI :</h3></th>
                        <th><h5>&nbsp;{patientInfo.Bmi}</h5></th>
                    </tr>
                </table>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 px-5">
                <div className="row mb-5">
                    <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                        <div> 
                            <img src="dm.png" style={{ height: "5rem" }} alt="Icon" />    
                            <span className="fs-1">DM</span>
                        </div>
                        <h1 ></h1>
                        <hr/>
                        <h3 className="text-danger">+ve</h3>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                        <div> 
                            <img src="htn.png" style={{ height: "5rem" }} alt="Icon" />    
                            <span className="fs-1">HTN</span>
                        </div>
                        <hr/>
                        <h3 className="text-danger">+ve</h3>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                        <div> 
                            <img src="cdk.png" style={{ height: "5rem" }} alt="Icon" />    
                            <span className="fs-1">CKD</span>
                        </div>
                        <hr/>
                        <h3 className="text-success">-ve</h3>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                        <div> 
                            <img src="ht.png" style={{ height: "5rem" }} alt="Icon" />    
                            <span className="fs-1">HT DIS</span>
                        </div>
                        <hr/>
                        <h3 className="text-success">-ve</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

setInformationData(data)
setAppointmentData(null)
}

const [AppointmentData, setAppointmentData] = useState(null);
  const Select_Appointment = ()=>{
  const data=(
    <div className="container">
        <table>
            <tr>
                <th colSpan="2" className="text-white rounded-4" style={{width:"17rem",height:"4rem",backgroundImage: "linear-gradient(to right, #3ca55c, #b5ac49)"}}><h1>Appointment details</h1></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem",background:'#3ca55c'}}><h3>&nbsp;Doctor name</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.Doctot_name}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;Doctor phone</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.Phone}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;complaint</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.Problem}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;Examination date</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.Data_Appointment}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;Booking status</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.status}</h5></th>
            </tr>
        </table>
    </div>

)


setInformationData(null)
setAppointmentData(data)
}




  return (<>
            <div className="container-fluid">
                <div><br/><br/><br/><br/></div>
                <div className="row" style={{background:"#03974D"}}>
                    <div className="col-lg-2 col-sm-12 my-5  d-flex flex-column align-items-center">
                        <img src='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' className="border border-white border-3 rounded-2" style={{width:'170px'}}/>
                    </div>
                    <div className="col-lg-6 lg-sm-12 my-5 text-start text-white">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                           <img src="/patientlogo.png" width={"50px"} className="rounded-circle"/> &nbsp;
                           <h1>{patientInfo.Name}</h1> 
                        </div> 
                        
                    </div>
                </div> 
                <div className="row docgradient">
                    <div className="col-1"></div>
                    <div className="col-6">
                    <nav class="navbar navbar-expand-lg bg-white border border-secondary" style={{height:"100px"}}>
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                        <div class="navbar-nav bg-white d-flex justify-content-center" > 
                                            <button className="nav-link mx-2" onClick={Select_Information}><h6 style={{color:"green"}}>Information</h6></button>
                                            <button className="nav-link mx-2"><h6 style={{color:"green"}}>Meal Plan</h6></button>
                                            <button className="nav-link mx-2"><h6 style={{color:"green"}}>Exercise Plan</h6></button>
                                            <button className="nav-link mx-2" onClick={Select_Appointment}><h6 style={{color:"green"}}>Appointment</h6></button>
                                            <button className="nav-link mx-2"><h6 style={{color:"green"}}>Setting</h6></button>
                                        </div>
                                    </div>
                                </nav>
                    </div>
                    <div className="col-5"></div>
                </div>
                
            </div>
            <div className="container mt-5 d-flex justify-content-center" id='Data'>
                {InformationData}
                {AppointmentData}
            </div>
            </> 
  );
}

export default PatientDetails;