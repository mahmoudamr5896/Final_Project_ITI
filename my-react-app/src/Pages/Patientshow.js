import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";

function PatientDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState({});
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [showInformation, setShowInformation] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
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

  const toggleInformation = () => {
    setShowInformation(true);
    setShowAppointment(false);
    setShowEditProfile(false);
  };

  const toggleAppointment = () => {
    setShowInformation(false);
    setShowAppointment(true);
    setShowEditProfile(false);
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
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav bg-white d-flex justify-content-center">
                  <button className="nav-link mx-2" onClick={toggleInformation}><h6 style={{ color: "green" }}>Information</h6></button>
                  <button className="nav-link mx-2"><h6 style={{ color: "green" }}>Meal Plan</h6></button>
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
                  <table className="table table-striped">
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

      {/* Render Appointment Section */}
      {showAppointment && (
        <div className="container mt-5 d-flex justify-content-center" id='Data'>
          <div className="container">
            {/* Render Appointment Details */}
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="container mt-5 d-flex justify-content-center" id='Data'>
          <div className='container m-5'>
            <form onSubmit={handleEditProfile}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input type="text" className="form-control" id="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">Weight</label>
                <input type="number" className="form-control" id="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="height" className="form-label">Height</label>
                <input type="number" className="form-control" id="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} />
              </div>
             
              <div className="mb-3">
                <label htmlFor="medicalHistory" className="form-label">Medical History</label>
                <input type="text" className="form-control" id="medicalHistory" value={formData.medicalHistory} onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input type="file" className="form-control" id="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
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
