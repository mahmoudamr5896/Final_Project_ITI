import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory ,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
function EditDoctorPage({ userId }) {
  const [userData, setUserData] = useState({
    id:'',
    username: '',
    name: '',
    age: 0,
    image: '',
    experience: 0,
    gender: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://127.0.0.1:8000/doctors/${userId.id}/`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;
    setUserData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };
const location = useLocation()
const[Error,setError]=useState()
  const handleSubmit = (e) => {  
  // Basic validation
  if (!userData.username.trim()) {
    setError('Please enter a username.');
    return;
  }
  
  if (!userData.name.trim()) {
    setError('Please enter a name.');
    return;
  }

  if (userData.age <= 0) {
    setError('Please enter a valid age.');
    return;
  }
  const PhoneRegex = /^\+?[1-9]\d{1,14}$/;


  if (!userData.phone.trim() || !PhoneRegex.test(userData.phone)) {
    setError('Please enter a valid phone number.');
    return;
  }

    console.log(userData)
    axios.put(`http://127.0.0.1:8000/doctors/${userData.id}/`, userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div className='container m-5'>
      <h1 style={{ backgroundColor: "whitesmoke",
        fontFamily: "Century Gothic",
        fontSize: "2.5rem",
        fontWeight: "bold",
        padding: "20px", 
        border: "2px solid #03974D", 
        borderRadius: "10px", 
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", 
        textAlign: "center", marginBottom:'20px'}}>Edit Your Data</h1>
      <form onSubmit={handleSubmit} className="row g-3">
  <div className="col-md-6">
    <label htmlFor="name" className="form-label">Name:</label>
    <input type="text" id="name" name="name" className="form-control" value={userData.name} onChange={handleChange} />
  </div>
  <div className="col-md-6">
    <label htmlFor="age" className="form-label">Age:</label>
    <input type="number" id="age" name="age" className="form-control" value={userData.age} onChange={handleChange} />
  </div>
  <div className="col-md-6">
    <label htmlFor="experience" className="form-label">Experience:</label>
    <input type="number" id="experience" name="experience" className="form-control" value={userData.experience} onChange={handleChange} />
  </div>
  <div className="col-md-6">
    <label htmlFor="gender" className="form-label">Gender:</label>
    <select id="gender" name="gender" className="form-control" value={userData.gender} onChange={handleChange}>
      <option value="">Select Gender</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
    </select>
  </div>
  <div className="col-md-6">
    <label htmlFor="phone" className="form-label">Phone:</label>
    <input type="text" id="phone" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
  </div>
  <div className="col-md-6">
    <label htmlFor="location" className="form-label">Location:</label>
    <input type="text" id="location" name="location" className="form-control" value={userData.location} onChange={handleChange} />
  </div>
  <div className="col-md-6">
    <label htmlFor="image" className="form-label">Image:</label>
    <input type="file" id="image" name="image" className="form-control" onChange={handleChange} />
  </div>
  <div className="col-12 d-flex justify-content-center">
    
    <div className="col-12 col-md-3">
      <button type="submit" className="btn btn-primary w-100">Save Changes</button>
      <p className="text-danger">{Error}</p>
    </div>
  </div>
</form>


    </div>
  );
}

export default EditDoctorPage;
  // "id": 1,
  // "username": "mahmoudamr",
  // "name": "mahmoud",
  // "age": 23,
  // "image": null,
  // "experience": 2,
  // "gender": "M",
  // "phone": "01060860534",
  // "location": "cairo"