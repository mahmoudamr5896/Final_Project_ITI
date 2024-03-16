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
  }, []);

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
    <form action='POST' onSubmit={handleSubmit}>
    {/* <div className="mb-3">
        <label htmlFor="bio" className="form-label">Bio:</label>
        <textarea id="bio" name="Bio" className="form-control" value={userData.gender} onChange={handleChange} />
      </div> */}
      <div className="mb-3">
        <label htmlFor="bio" className="form-label">Password:</label>
        <input type='number'id="bio" name="Password" className="form-control" value={userData.age} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">Img:</label>
        <input id="img" type="img" name="Image" className="form-control" value={userData.image} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input id="name" type="text" name="Doctor_Name" className="form-control" value={userData.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input id="email" type="text" name="Email" className="form-control" value={userData.experience} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input id="phone" type="text" name="Phone" className="form-control" value={userData.phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">Location:</label>
        <input id="location" type="text" name="Location" className="form-control" value={userData.location} onChange={handleChange} />
      </div>
      {/* <div className="mb-3">
        <label htmlFor="payment" className="form-label">Payment Appointment:</label>
        <input id="payment" type="text" name="Payment_Appointment" className="form-control" value={userData.name} onChange={handleChange} />
      </div> */}
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  </div>
  );
}

export default EditUserPage;

// "id": 9,
  // "Bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // "Email": "hboshers50@narod.ru",
  // "Image": "audio.mp3",
  // "Phone": "(555) 711-4103",
  // "https://retoolapi.dev/15YN0H/Appointment
  // "Rating": "⭐️⭐️⭐️⭐️",
  // "Location": "Boise City, Idaho, United States",
  // "Password": "2",
  // "Doctor_Name": "Matthew Quemby",
  // "Payment_Appointment": "Debit" // "Bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // "Email": "hboshers50@narod.ru",
  // "Image": "audio.mp3",
  // "Phone": "(555) 711-4103",
  // "Rating": "⭐️⭐️⭐️⭐️",
  // "Location": "Boise City, Idaho, United States",
  // "Password": "2",
  // "Doctor_Name": "Matthew Quemby",
  // "Payment_Appointment": "Debit"