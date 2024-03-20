import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import BMICalculator from '../Component/BMI'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PayPalCheckoutButton from '../Component/PayPal'
import PaymentForm from './Payment';
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
    // id: 10,
    name: "",
    age: "",
    weight: "",
    image: null,
    height: "",
    gender: "M",
    phone : "+20",
    medicalHistory: ""
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
          medicalHistory: res.data.medical_history
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

  const toggleAppointment = () => {
    setShowInformation(false);
    setShowAppointment(true);
    setShowEditProfile(false);
    setMealplan(null)
  };

  const toggleEditProfile = () => {
    setShowInformation(false);
    setShowAppointment(false);
    setShowEditProfile(true);
  };
  
  const handleEditProfile = () => {
    const updatedFields = { ...formData };

    axios.patch(`http://127.0.0.1:8000/patients/${id}/`, updatedFields)
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
<BMICalculator

>
</BMICalculator>
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
const[Appointments_r,setAppointments_r]=useState([])
useEffect(() => {
  if (id) {
    axios.get(`http://127.0.0.1:8000/appointments/`)
      .then(response => {
        // Filter appointments with status true
        const filteredAppointments = response.data.filter(appointment => appointment.status === true && appointment.patient == id);
        setAppointments(filteredAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
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
}, [id]);
  


{showAppointment && (
  <div className="container mt-5 d-flex justify-content-center" id='Data'>
    <div className="container">
      {Appointments.map((item) => {
        return (
          <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Doctor Name: {item.doctor_name}</p> 
            <p style={{ fontSize: '16px', marginBottom: '5px' }}>Date: {item.date_time}</p> 
            {item.is_paid ? (
              <p className="text-success">Paid and under review</p>
            ) : (
              <>
                <p className="text-success">Accepted</p>
                {/* Add a button to show payment form */}
                <button onClick={() => handleShowPaymentForm(item.id)}>Enter Your Card Info</button>
                
                
              </>
            )}
          </div>
        );
      })}
      
      
      {Appointments_r.map((item) => (
        <div key={item.id}>
          <p>Doctor Name: {item.doctor_name}</p> 
          <p>Resone Of Rejected :{item.Reasone_reject}</p> 
          <p className="text-danger">Rejected</p>
        </div>
      ))}
    </div>
  </div>
)}



  return (
    <>
      <div className="container-fluid">
        <div><br /><br /><br /><br /></div>
        <div className="row" style={{ background: "#03974D" }}>
          <div className="col-lg-2 col-sm-12 my-5  d-flex flex-column align-items-center">
            <img src='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' className="border border-white border-3 rounded-2" style={{ width: '170px' }} />
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
            <nav className="navbar navbar-expand-lg bg-white border border-secondary" style={{ height: "100px" }}>
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
        </div>
      )}
       {Mealplan}
      {/* Render Appointment Section */}
      {showAppointment && (
  <div className="container mt-5 d-flex justify-content-center" id='Data'>
    <div className="container">
      {Appointments.map((item) => {
      
        return   <>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
  <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Doctor Name: {item.doctor_name}</p> 
  <p style={{ fontSize: '16px', marginBottom: '5px' }}>Date: {item.date_time}</p> 
  <p style={{ fontSize: '16px', color: 'green' }}>Accepted</p>
</div>

              <PaymentForm appointmentId={item.id} />
              {/* <Link to="/pays">Please pay for your appointment from here </Link> */}
        </>
      })}
      {Appointments_r.map((item) => {
      
        return   <>
        <p>Doctor Name: {item.doctor_name}</p> 
        <p>Resone Of Rejected :{item.Reasone_reject}</p> 
        <p className="text-danger">Rejected</p>
        </>
      })}

    </div>
  </div>
)}


{showEditProfile && (
      
        
      <div className="container mt-5 d-flex justify-content-center" id='Data'>
<div className='container m-5 shadow p-5 bg-white rounded'>
<div style={{
background: "linear-gradient(to right, #00FF00, #008000)",
backgroundColor: "rgba(0, 0, 0, 0.5)",
borderRadius: "15px",
width:"30%",
marginLeft:"36%"
}}>
<h4 style={{ width: "50%", marginBottom: "10%", marginLeft: "30%", color: "black", fontFamily: "fantasy" }}>Edit your data</h4>
</div>
<hr></hr> <br></br>
  <form onSubmit={handleEditProfile}>
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
          <input type="text" className="form-control" id="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} style={{ width: "70%" }} />
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
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="medicalHistory" className="form-label" style={{ width: "30%" }}>Medical History</label>
          <textarea className="form-control" id="medicalHistory" value={formData.medicalHistory} onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })} style={{ width: "70%" }}></textarea>
        </div>
        <div className="mb-3 d-flex justify-content-center"> {/* Align button to the center */}
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
