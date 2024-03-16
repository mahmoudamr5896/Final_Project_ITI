import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditUserPage({ userId }) {
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    image: '',
    experience: 0,
    gender: "",
    phone: "",
    location: ""
  });
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/doctors/${userId}/`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://127.0.0.1:8000/doctors/${userId}/`, userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div className='container m-5'>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input id="password" type="password" name="age" className="form-control" value={userData.age} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Img:</label>
          <input id="img" type="text" name="image" className="form-control" value={userData.image} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input id="name" type="text" name="name" className="form-control" value={userData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input id="email" type="text" name="experience" className="form-control" value={userData.experience} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input id="phone" type="text" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input id="location" type="text" name="location" className="form-control" value={userData.location} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserPage;
