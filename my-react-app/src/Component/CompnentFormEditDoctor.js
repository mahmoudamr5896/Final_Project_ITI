import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditUserPage({ userId }) {
  const [userData, setUserData] = useState({
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
    // axios.get(`http://127.0.0.1:8000/doctors/${userId.id}/`)
    //   .then(response => {
    //     setUserData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user data:', error);
    //   });
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
    console.log(userData)
    // axios.put(`http://127.0.0.1:8000/doctors/${userData.id}/`, userData)
    //   .then(response => {

    //     console.log('User data updated successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error updating user data:', error);
    //   });
  };

  return (
    <div className='container m-5'>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} action='PATCH'>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" id="username" name="username" className="form-control" value={userData.username} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name" className="form-control" value={userData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="number" id="age" name="age" className="form-control" value={userData.age} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input type="text" id="image" name="image" className="form-control" value={userData.image} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="experience" className="form-label">Experience:</label>
          <input type="number" id="experience" name="experience" className="form-control" value={userData.experience} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <input type="text" id="gender" name="gender" className="form-control" value={userData.gender} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" id="phone" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input type="text" id="location" name="location" className="form-control" value={userData.location} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserPage;
