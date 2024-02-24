import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Css/Doctors.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StarRating from "../Component/Rate";
import { useContext } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import CompnentFormEditUser from "../Component/CompnentFormEdit User";
import MyContext from "../Context/Context";
import EditUserPage from "../Component/CompnentFormEdit User";
function PatientDetails(){
  const { id } = useParams();
//   console.log("id:", id);
const [patientInfo, setPatientInfo] = useState({});
  useEffect(() => {
      axios(`https://retoolapi.dev/zP9Zhd/patient/${id}`)
          .then((res) => setPatientInfo(res.data))
          .catch((err) => console.log(err));
  }, [id]);
const [appointmenttInfo, setAppointmentInfo] = useState({});
  useEffect(() =>{
    axios(`https://retoolapi.dev/2jV2W1/Appointment?User_id=${id}`)
        .then((res) => setAppointmentInfo(res.data[0]))
        .catch((err) => console.log(err));
}, [id]);
console.log(appointmenttInfo)
// "id": 10,
// "Name": "",
// "Email": "",
// "Phone": "",
// "Problem": "",
// "User_id": 3,
// "Doctot_id": "13",
// "Data_Appointment": ""
//___________________________ Handell Sections ____________________________________
const [InformationData, setInformationData] = useState(null);
const Select_Information = (e)=>{
    e.preventDefault()
  const data=(
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-12 border border-success rounded-4 p-2 text-start">
                <h1 className="text-center text-success">Information</h1><hr/><br/>
                <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{patientInfo.Name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{patientInfo.Email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phone</th>
                        <td>{patientInfo.Phone}</td>
                    </tr>
                    <tr>
                        <th scope="row">Gender</th>
                        <td>{patientInfo.Gender}</td>
                    </tr>
                    <tr>
                        <th scope="row">Age</th>
                        <td>{patientInfo.Age}</td>
                    </tr>
                    <tr>
                        <th scope="row">Weight</th>
                        <td>{patientInfo.Weight}</td>
                    </tr>
                    <tr>
                        <th scope="row">Height</th>
                        <td>{patientInfo.Height}</td>
                    </tr>
                    <tr>
                        <th scope="row">BMI</th>
                        <td>{patientInfo.Bmi}</td>
                    </tr>
                    </tbody>
                </table>
                </div>          
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
setIsEditProfileOpen(null)
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
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.Doctor_name}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;Doctor phone</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.User_Phone}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;complaint</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.problemDescription}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;Examination date</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.DateAppointment}</h5></th>
            </tr>
            <tr style={{height:"1rem"}}><th></th></tr>
            <tr>
                <th className="text-start bg-success text-white rounded-4" style={{width:"17rem",height:"4rem"}}><h3>&nbsp;Booking status</h3></th>
                <th className="bg-danger-subtle rounded-4"><h5>{appointmenttInfo.Paid}</h5></th>
            </tr>
        </table>
    </div>

)

setIsEditProfileOpen(null)
setInformationData(null)
setAppointmentData(data)
}
const [isEditProfileOpen, setIsEditProfileOpen] = useState(null);
const toggleEditProfile = () => {
    const data=(
      <div className='container m-5'>
        <EditUserPage userId={patientInfo.id}></EditUserPage>
    </div>
    )
    setIsEditProfileOpen(data);
    setAppointmentData(null)
    setInformationData(null)
  };
//____________________________________________________________
const handleDeleteAccount = () => {
    axios
    .delete(`https://retoolapi.dev/zP9Zhd/patient/${ patientInfo.id}`)
      .then(response => {
        console.log('Account deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting account:', error);
      });
  };
  //___________________________________________________________________________
  return (    
    <>
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
                                            <DropdownButton
                                                  id="dropdown-basic-button"
                                                  title="Settings"
                                                  variant="success"
                                                  className="mx-2"
                                                >
                                                  <Dropdown.Item onClick={toggleEditProfile}>Edit Profile</Dropdown.Item>
                                                  <Dropdown.Item onClick={handleDeleteAccount}>Delete Account</Dropdown.Item>
                                                </DropdownButton>                                        </div>
                                    </div>
                                </nav>
                    </div>
                    <div className="col-5"></div>
                </div>
                
            </div>
            <div className="container mt-5 d-flex justify-content-center" id='Data'>
                {InformationData}
                {AppointmentData}
                {isEditProfileOpen}
            </div>
    </>
  );
}

export default PatientDetails;