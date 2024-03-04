import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function EditUserPage({ userId }) {
  const [userData, setUserData] = useState({
    "Age" : '',
    "Image": "",
    "Phone": "",
    "Password": "",
    "Gender": "Male",

  });

  useEffect(() => {
    axios.get(`https://retoolapi.dev/zP9Zhd/patient/${userId}`)
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
    axios.patch(`https://retoolapi.dev/zP9Zhd/patient/${userId}`, userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };
  
  // const history = useHistory();
  //  const infopage = () => {
  //  history.push(`/Editmsg`);
  // };
  
  return (
    <div className='container m-5'>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="Gender" className="form-label">Age:</label>
          <input type='number' id="" name="Age" className="form-control" value={userData.Age} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Gender" className="form-label">Gender:</label>
          <input type='text' id="" name="Gender" className="form-control" value={userData.Gender} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Phone" className="form-label">Phone:</label>
          <input type='phone' id="" name="Phone" className="form-control" value={userData.Phone} onChange={handleChange} />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input id="password" type="password" name="Password" className="form-control" value={userData.Password} onChange={handleChange} />
        </div> */}
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image:</label>
          <input id="img" type="text" name="Image" className="form-control" value={userData.Image} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserPage;
