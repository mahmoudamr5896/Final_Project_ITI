import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EditUserPage({ userId }) {
  const [userData, setUserData] = useState({
    Bio: '',
    Img: '',
    name: '',
    Email: '',
    Phone: '',
    Location: '',
    Payment_Appointment: '',
    Password:'',
  });

  useEffect(() => {
    axios.get(`https://retoolapi.dev/EBWb8G/Doctors/${1}`)
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
    axios.patch(`https://retoolapi.dev/EBWb8G/Doctors/${1}`, userData)
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
        <label htmlFor="bio" className="form-label">Bio:</label>
        <textarea id="bio" name="Bio" className="form-control" value={userData.Bio} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">Img:</label>
        <input id="img" type="text" name="Img" className="form-control" value={userData.Image} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input id="name" type="text" name="name" className="form-control" value={userData.Doctor_Name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input id="email" type="text" name="Email" className="form-control" value={userData.Email } onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input id="phone" type="text" name="Phone" className="form-control" value={userData.Phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location:</label>
        <input id="location" type="text" name="Location" className="form-control" value={userData.Location} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="payment" className="form-label">Payment Appointment:</label>
        <input id="payment" type="text" name="Payment_Appointment" className="form-control" value={userData.Payment_Appointment} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  </div>
  );
}

export default EditUserPage;

