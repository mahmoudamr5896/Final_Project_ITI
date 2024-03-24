import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import UserMealplan from '../Component/UserMeaplan'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PayPalCheckoutButton from '../Component/PayPal'
import PaymentForm from './Payment';
import { useDispatch,useSelector  } from 'react-redux';

function PatientDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState({});
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [showInformation, setShowInformation] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

const handleShowPaymentForm = (appointmentId) => {
  setShowPaymentForm(true);
  setSelectedAppointmentId(appointmentId);
};

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    image: null, // Updated to handle image file
    height: "",
    gender: "M",
    phone: "+20",
    Diabetes_Mellitus: "",
    Hypertension: "",
    Chronic_Kidney_Disease: "",
    Heart_Disease: "",
  });

  useEffect(() => {
    axios(`http://127.0.0.1:8000/patients/${id}/`)
      .then((res) => {
        setPatientInfo(res.data);
        setFormData({
          id: res.data.id,
          name: res.data.name,
          age: res.data.age.toString(),
          weight: res.data.weight.toString(),
          image: null, // Assuming no image update is expected here
          height: res.data.height.toString(),
          gender: res.data.gender,
          phone: res.data.phone,
          Diabetes_Mellitus: res.data.Diabetes_Mellitus,
          Hypertension: res.data.Hypertension,
          Chronic_Kidney_Disease: res.data.Chronic_Kidney_Disease,
          Heart_Disease: res.data.Heart_Disease,
        });
      })
      .catch((err) => console.log(err));
  
    axios(`https://retoolapi.dev/2jV2W1/Appointment?User_id=${id}`)
      .then((res) => setAppointmentInfo(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);
//_________________________________________________________________
const [bmi, setBMI] = useState(null);

  const toggleInformation = () => {
    const heightInMeters =patientInfo.height / 100;
const bmiValue = patientInfo.weight / (heightInMeters * heightInMeters);
setBMI(bmiValue.toFixed(2));
    setShowInformation(true);
    setShowAppointment(false);
    setShowEditProfile(false);
    setMealplan(null)
  };

 
  const toggleEditProfile = () => {
    setShowInformation(false);
    setShowAppointment(false);
    setShowEditProfile(true);
  };
  
  const handleEditProfile = (e) => {
    e.preventDefault();
    
    // Create a shallow copy of formData
    const updatedFields = { ...formData };
  
    // Check if the image field is null (no new image selected)
    if(updatedFields.image === null) {
      // Remove the image field from the updatedFields object
      delete updatedFields.image;
    }
  
    // Create FormData object
    const formDataWithImage = new FormData();
    
    // Iterate over the updatedFields and append them to formDataWithImage
    for (const key in updatedFields) {
      formDataWithImage.append(key, updatedFields[key]);
    }
  
    axios.patch(`http://127.0.0.1:8000/patients/${id}/`, formDataWithImage, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        setPatientInfo(response.data);
        history.push(`/user/${id}`);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      });
  };
  
  const handleDeleteAccount = () => {
    setShowDeleteModal(true); 
  };

  const confirmDeleteAccount = () => {
    axios.all([
      axios.delete(`http://127.0.0.1:8000/users/${id}/`),
      axios.delete(`http://127.0.0.1:8000/patients/${id}/`)
      
    ])
    .then(axios.spread((patientResponse, userResponse) => {
      console.log('Account deleted successfully:', patientResponse.data, userResponse.data);
      setShowDeleteModal(false);
      alert('Account deleted successfully');
      history.push('/RegPat');
    }))
    .catch(error => {
      console.error('Error deleting account:', error);
      // Show an error message indicating deletion failure
      alert('Error deleting account: ' + error.message);
    });
  };
//__________________________________________________________________________________________________
const[Mealplan,setMealplan]=useState(null)
const toggleMealplan =()=>{
const data=(
  <div className="mt-5">
<UserMealplan userId={id}/>
  </div >
)
setMealplan(data)
setShowInformation(false);
setShowAppointment(false);
setShowEditProfile(false);

}
//________________________________________________________________________________
// Appointment Rejected 
const[Appointments,setAppointments]=useState([])
const[Appointments_d,setAppointments_d]=useState([])
//_____________________________________________________________________________________________
// Appointment has aleady paid 
const yourData = useSelector(state => state.data.data);

const[Appointments_r,setAppointments_r]=useState([])
useEffect(() => {
  if (id) {
    //__________________not paid ________________________________
    axios.get(`http://127.0.0.1:8000/appointments/`)
      .then(response => {
        // Filter appointments with status true
        const filteredAppointments = response.data.filter(appointment => appointment.status === true && appointment.patient == id && appointment.Paid === false);
        setAppointments(filteredAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
    //________________  paid ________________________________
    axios.get(`http://127.0.0.1:8000/appointments/`)
    .then(response => {
      // Filter appointments with status true
      const filteredAppointments = response.data.filter(appointment => appointment.status === true && appointment.patient == id && appointment.Paid === true);
      setAppointments_d(filteredAppointments);
    })
    .catch(error => {
      console.error('Error fetching appointments:', error);
    });

    //_____________________ rejected _______________________________
    axios.get(`http://127.0.0.1:8000/appointments/`)
      .then(response => {
        // Filter appointments with status true
        const filteredAppointments = response.data.filter(appointment => appointment.status === false && appointment.patient == id && appointment.Reasone_reject !=  'none');
        setAppointments_r(filteredAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });  
  }
}, [Appointments]);
// console.log(patientInfo.id)
//____________________________________________________________
// const storedId = sessionStorage.getItem('userData') ;
// const userDatas = JSON.parse(storedId); 
// if(!userDatas ){
//   history.push('/')
// }
// else{
//  if(userDatas.id == id){
//   console.log(userDatas.role)
//   console.log('ok')
//  }else{
//      history.push('/')
//  } 
// }
const storedIdw = sessionStorage.getItem('userData') ;
const userDataw = localStorage.getItem('userData') ;
const userDatasw = JSON.parse(storedIdw); 
const userData_ = JSON.parse(userDataw); 
if(!userData_ && !storedIdw){
  history.push('/')
}
//__________________________________________________________________________________________________________________________
const toggleAppointment = () => {
  setShowInformation(false);
  setShowAppointment(true);
  setShowEditProfile(false);
  setMealplan(null)
};

//___________________Section of Appiontment______________________________________
const[history_,setHistory_]=useState(null)
const History_a=()=>{

  const data=(
    <>
<div className="container mt-5 d-flex justify-content-center" id="Data">
  <div className="container">
    <h1 className="mb-4">History Of Appointment</h1>
    {Appointments_d.length === 0 ? (
      <p className="text-center">No appointments found.</p>
    ) : (
      Appointments_d.map((item) => (
        <div key={item.id} className="border p-3 mb-3">
          <p className="mb-1">Doctor Name: {item.doctor_name}</p>
          <p className="mb-0">Date: {item.date_time}</p>
        </div>
      ))
    )}
  </div>
</div>



    </>
  )
  setHistory_(data)
  setRejected(null)
  setAccepted(null)
}
const[Accepted,setAccepted]=useState(null)
const Accepted_s=()=>{

  const data=(
    <>
<div className="container mt-5 d-flex justify-content-center" id='Data'>
  <div className="container">
    {Appointments.length === 0 ? (
      <p className="text-center">No appointments found.</p>
    ) : (
      Appointments.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Doctor Name: {item.doctor_name}</p> 
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>Date: {item.date_time}</p> 
          <p style={{ fontSize: '16px', color: 'green' }}>Accepted</p>
          <PaymentForm appointmentId={item.id} />
          <PayPalCheckoutButton appointmentId={item.id} />
        </div>
      ))
    )}
  </div>
</div>

    </>
  )
  setAccepted(data)
  setRejected(null)
  setHistory_(null)
}
const[Rejected,setRejected]=useState(null)
const Rejected_=()=>{

  const data=(
    <>
  <div className="container mt-5 d-flex justify-content-center" id="Data">
  <div className="container">
    {Appointments_r.length === 0 ? (
      <p className="text-center">No appointments found.</p>
    ) : (
      Appointments_r.map((item) => (
        <div key={item.id}>
          <p>Doctor Name: {item.doctor_name}</p> 
          <p>Reason Of Rejected: {item.Reasone_reject}</p> 
          <p className="text-danger">Rejected</p>
        </div>
      ))
    )}
  </div>
</div>

    </>
  )
  setRejected(data)
  setAccepted(null)
  setHistory_(null)
}

  return (
      <>
      <div className="container-fluid">
        <div><br /><br /><br /><br /></div>
        <div className="row" style={{ background: "#03974D" }}>
          <div className="col-lg-2 col-sm-12 my-5  d-flex flex-column align-items-center">
          
        {patientInfo.image && (
        <img src={`${patientInfo.image}`} alt="Doctor" className="border border-white border-3 rounded-2" style={{width:'170px'}} />
            )}
        </div>
          <div className="col-lg-6 lg-sm-12 my-5 text-start text-white">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/patientlogo.png" width={"50px"} className="rounded-circle" /> &nbsp;
              <h1>{patientInfo.name}</h1>
            </div>
          </div>
        </div>
        <div className="row docgradient">
          <div className="col-1"></div>
          <div className="col-6">
            {/* <nav className="navbar navbar-expand-lg bg-white border border-secondary" style={{ height: "100px" }}>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup"  style={{marginLeft:"8%"}}>
                <div className="navbar-nav bg-white d-flex justify-content-center">
                  <button className="nav-link mx-2" onClick={toggleInformation}><h6 style={{ color: "green" }}>Information</h6></button>
                  <button className="nav-link mx-2"><h6 style={{ color: "green" }} onClick={toggleMealplan}>Meal Plan</h6></button>
                  <button className="nav-link mx-2"><h6 style={{ color: "green" }}>Exercise Plan</h6></button>
                  <button className="nav-link mx-2" onClick={toggleAppointment}><h6 style={{ color: "green" }}>Appointment</h6></button>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Settings"
                    variant="success"
                    className="mx-2"
                  >
                    <Dropdown.Item onClick={toggleEditProfile}>Edit Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteAccount}>Delete Account</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </nav> */}
            <nav className="navbar navbar-expand-lg bg-white border border-secondary" style={{ height: "100px" }}>
        <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <button className="nav-link mx-2" onClick={toggleInformation}><h6 style={{ color: "green" }}>Information</h6></button>
        <button className="nav-link mx-2" onClick={toggleMealplan}><h6 style={{ color: "green" }}>Meal Plan</h6></button>
        <button className="nav-link mx-2" ><h6 style={{ color: "green" }}>Exercise Plan</h6></button>
        <button className="nav-link mx-2" onClick={toggleAppointment}><h6 style={{ color: "green" }}>Appointment</h6></button>
        <DropdownButton
          id="dropdown-basic-button"
          title="Settings"
          variant="success"
          className="mx-2"
        >
          <Dropdown.Item onClick={toggleEditProfile}>Edit Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteAccount}>Delete Account</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
      </div>
</nav>

          </div>
          <div className="col-5"></div>
        </div>
      </div>

      {/* Render Information Section */}
      {showInformation && (
        <div className="container mt-5 d-flex justify-content-center" id='Data'>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 border border-success rounded-4 p-2 text-start">
                <h1 className="text-center text-success">Information</h1><hr/><br/>
                <div className="table-responsive">
                  <table className="table table-striped table-success ">
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        <td>{patientInfo.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{patientInfo.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone</th>
                        <td>{patientInfo.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row">Gender</th>
                        <td>{patientInfo.gender}</td>
                      </tr>
                      <tr>
                        <th scope="row">Age</th>
                        <td>{patientInfo.age}</td>
                      </tr>
                      <tr>
                        <th scope="row">Weight</th>
                        <td>{patientInfo.weight}</td>
                      </tr>
                      <tr>
                        <th scope="row">Height</th>
                        <td>{patientInfo.height}</td>
                      </tr>
                      <tr>
                        <th scope="row">BMI</th>
                        <td>{bmi}</td>
                      </tr>
                   
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12 px-5">
                <div className="row mb-5">
                  <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                    <div> 
                      <img src="/dm.png" style={{ height: "5rem" }} alt="Icon" />    
                      <span className="fs-1">DM</span>
                    </div>
                    <h1 ></h1>
                    <hr/>
                    <h3 className={patientInfo.Diabetes_Mellitus ? "text-danger" : "text-success"}>
                    {patientInfo.Diabetes_Mellitus ? "+ve" : "-ve"}
                    </h3>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                    <div> 
                      <img src="/htn.png" style={{ height: "5rem" }} alt="Icon" />    
                      <span className="fs-1">HTN</span>
                    </div>
                    <hr/>
                    <h3 className={patientInfo.Hypertension ? "text-danger" : "text-success"}>
                    {patientInfo.Hypertension ? "+ve" : "-ve"}
                    </h3>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                    <div> 
                      <img src="/cdk.png" style={{ height: "5rem" }} alt="Icon" />    
                      <span className="fs-1">CKD</span>
                    </div>
                    <hr/>
                    <h3 className={patientInfo.Chronic_Kidney_Disease ? "text-danger" : "text-success"}>
                    {patientInfo.Chronic_Kidney_Disease ? "+ve" : "-ve"}
                    </h3>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-lg-5 col-md-12 border border-success rounded-4 bg-success-subtle p-4">
                    <div> 
                      <img src="/ht.png" style={{ height: "5rem" }} alt="Icon" />    
                      <span className="fs-1">HT DIS</span>
                    </div>
                    <hr/>
                    <h3 className={patientInfo.Heart_Disease ? "text-danger" : "text-success"}>
                    {patientInfo.Heart_Disease ? "+ve" : "-ve"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
       {Mealplan}
      {/* Render Appointment Section */}
      {showAppointment && (
        <div className="container">
      <div className="col-12 m-3 border">
        <button className="col-3 btn btn-secondary m-3 btn-hover-" onClick={History_a}>History Of Appointment</button>
        <button className="col-3 btn btn-success m-3 btn-hover" onClick={Accepted_s}>Accepted</button>
        <button className="col-3 btn btn-danger m-3 btn-hover" onClick={Rejected_}>Rejected</button>
      </div>
        {Accepted} 
        {history_}
        {Rejected}
        </div> 
        )}


{showEditProfile && (
      
        
      <div className="container mt-5 d-flex justify-content-center" id='Data'>
        
<div className='container m-5 shadow p-5 bg-white rounded'>
<h1 style={{ backgroundColor: "whitesmoke",
        fontFamily: "Century Gothic",
        fontSize: "2.5rem",
        fontWeight: "bold",
        padding: "20px", 
        border: "2px solid #03974D", 
        borderRadius: "10px", 
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", 
        textAlign: "center", marginBottom:'20px'}}>Edit your data</h1>
<div style={{
background: "linear-gradient(to right, #00FF00, #008000)",
backgroundColor: "rgba(0, 0, 0, 0.5)",
borderRadius: "15px",
width:"30%",
marginLeft:"36%"
}}>

</div>
<hr></hr> <br></br>
  <form onSubmit={handleEditProfile} encType="multipart/form-data">
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="name" className="form-label me-3" style={{ width: "30%" }}>Name</label>
          <input type="text" className="form-control" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "70%" }} />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="phone" className="form-label me-3" style={{ width: "30%" }}>Phone</label>
          <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: "70%" }} />
        </div>
        <div className="mb-3 d-flex align-items-center">
  <label htmlFor="gender" className="form-label me-3" style={{ width: "30%" }}>Gender</label>
  <select className="form-select" id="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} style={{ width: "70%" }}>
    <option value="M">Male</option>
    <option value="F">Female</option>
  </select>
</div>

<div className="mb-3 d-flex align-items-center">
          <label htmlFor="image" className="form-label" style={{ width: "30%" }}>Image</label>
          <input type="file" className="form-control" id="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} style={{ width: "70%" }} />
        </div>
      </div>
     
      <div className="col-md-6">
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="age" className="form-label me-3" style={{ width: "30%" }}>Age</label>
          <input type="number" className="form-control" id="age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} style={{ width: "70%" }} />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="weight" className="form-label me-3" style={{ width: "30%" }}>Weight</label>
          <input type="number" className="form-control" id="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} style={{ width: "70%" }} />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="height" className="form-label me-3" style={{ width: "30%" }}>Height</label>
          <input type="number" className="form-control" id="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} style={{ width: "70%" }} />
        </div>
      </div>
      <div className="col-md-12">
      <div className="row">
        <div className="col-6 mb-3 d-flex align-items-center">
          <label htmlFor="Diabetes_Mellitus" className="form-label me-3" style={{ width: "60%" }}>Diabetes Mellitus</label>
          <input className="form-check-input" type="checkbox" id="Diabetes_Mellitus"  checked={formData.Diabetes_Mellitus} onChange={(e) => setFormData({ ...formData, Diabetes_Mellitus: e.target.checked })} />
        </div>
        <div className="col-6 mb-3 d-flex align-items-center">
          <label htmlFor="Hypertension" className="form-label me-3" style={{ width: "60%" }}>Hypertension</label>
          <input className="form-check-input" type="checkbox" id="Hypertension"  checked={formData.Hypertension} onChange={(e) => setFormData({ ...formData, Hypertension: e.target.checked })} />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3 d-flex align-items-center">
          <label htmlFor="Chronic_Kidney_Disease" className="form-label me-3" style={{ width: "60%" }}>Chronic Kidney Disease</label>
          <input className="form-check-input" type="checkbox" id="Chronic_Kidney_Disease"  checked={formData.Chronic_Kidney_Disease} onChange={(e) => setFormData({ ...formData, Chronic_Kidney_Disease: e.target.checked })} />
        </div>
        <div className="col-6 mb-3 d-flex align-items-center">
          <label htmlFor="Heart_Disease" className="form-label me-3" style={{ width: "60%" }}>Heart Disease</label>
          <input className="form-check-input" type="checkbox" id="Heart_Disease"  checked={formData.Heart_Disease} onChange={(e) => setFormData({ ...formData, Heart_Disease: e.target.checked })} />
        </div>
      </div>
        <div className="mb-3 d-flex justify-content-center " > {/* Align button to the center */}
          <button type="submit" className="btn btn-primary" style={{ width: "50%", marginRight:"90%", marginTop:"10%" }}>Save Changes</button>
        </div>
      </div>
    </div>
  </form>
</div>
</div>  
    )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
     </>
  );
}

export default PatientDetails;





//     <div className="container mt-5 d-flex justify-content-center" id='Data'>
  //     <div className="container">
  //     {Appointments.map((item) => {
  //       return   <>
  //             <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
  //               <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Doctor Name: {item.doctor_name}</p> 
  //               <p style={{ fontSize: '16px', marginBottom: '5px' }}>Date: {item.date_time}</p> 
  //               <p style={{ fontSize: '16px', color: 'green' }}>Accepted</p>
  //             </div>

  //             <PaymentForm
  //              appointmentId={item.id} 
  //             />
  //             {/* <Link to="/pays">Please pay for your appointment from here </Link> */}
  //             <PayPalCheckoutButton
  //               appointmentId={item.id} 
  //             ></PayPalCheckoutButton>
  //       </>
        
  //     })}

  //     {Appointments_r.map((item) => {
  //       return   <>
  //       <p>Doctor Name: {item.doctor_name}</p> 
  //       <p>Resone Of Rejected :{item.Reasone_reject}</p> 
  //       <p className="text-danger">Rejected</p>
  //       </>
  //     })}
  //       <h1>History Of Appointment</h1>
  //       {Appointments_d.map((item) => (
  //       <div key={item.id}>
  //         <p>Doctor Name: {item.doctor_name}</p> 
  //         <p>Date :{item.date_time}</p> 
  //       </div>
  //     ))}

  //   </div>
  // </div>
// const Appointment_section = () =>{

// const data = (
//   <>
//      {showAppointment && (
      
//         )}

//   </>
// )
// }
// {showAppointment && (
//   <div className="container mt-5 d-flex justify-content-center" id='Data'>
//     <div className="container">
//       {/* {Appointments.map((item) => {
//         return (
//           <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
//             <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Doctor Name: {item.doctor_name}</p> 
//             <p style={{ fontSize: '16px', marginBottom: '5px' }}>Date: {item.date_time}</p> 
//             {item.is_paid ? (
//               <p className="text-success">Paid and under review</p>
//             ) : (
//               <>
//                 <p className="text-success">Accepted</p>
//                 <button onClick={() => handleShowPaymentForm(item.id)}>Enter Your Card Info</button>
                
                
//               </>
//             )}
//           </div>
//         );
//       })} */}                {/* Add a button to show payment form */}

//       {Appointments_r.map((item) => (
//         <div key={item.id}>
//           <p>Doctor Name: {item.doctor_name}</p> 
//           <p>Resone Of Rejected :{item.Reasone_reject}</p> 
//           <p className="text-danger">Rejected</p>
//         </div>
//       ))}
//       <h1>History Of Appointment</h1>
//         {Appointments_d.map((item) => (
//         <div key={item.id}>
//           <p>Doctor Name: {item.doctor_name}</p> 
//           <p>Resone Of Rejected :{item.Reasone_reject}</p> 
//           <p className="text-danger">Rejected</p>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
