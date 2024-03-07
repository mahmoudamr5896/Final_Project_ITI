import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function EditUserPage({ userId }) {
  const [userData, setUserData] = useState({
    "Age": '',
    "Name": "",
    "Phone": "",
    "Password": "",
    "Gender": "",
  });

  const [errors, setErrors] = useState({});
  const history = useHistory();

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
    if (validate()) {
      axios.patch(`https://retoolapi.dev/zP9Zhd/patient/${userId}`, userData)
        .then(response => {
          console.log('User data updated successfully:', response.data);
          history.push(`/Editmsg`); // Redirect to Editmsg path with userId
        })
        .catch(error => {
          console.error('Error updating user data:', error);
        });
    }
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!userData.Age || userData.Age < 0) {
      errors.Age = "age should be a positive number";
      isValid = false;
    }

    if (!userData.Phone || !/^(01)\d{9}$/i.test(userData.Phone)) {
      errors.Phone = "please enter valid phone number";
      isValid = false;
    }

    if (!userData.Name || !/^[a-zA-Z\s]*$/.test(userData.Name)) {
      errors.Name = "Name must contain only letters";
    isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className='container m-5'>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name:</label>
          <input id="Name" type="text" name="Name" className="form-control" value={userData.Name} onChange={handleChange} />
          {errors.Name && <div className="text-danger">{errors.Name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="Age" className="form-label">Age:</label>
          <input type='number' id="Age" name="Age" className="form-control" value={userData.Age} onChange={handleChange} />
          {errors.Age && <div className="text-danger">{errors.Age}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="Gender" className="form-label">Gender:</label>
          <select id="Gender" name="Gender" className="form-control" value={userData.Gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="Phone" className="form-label">Phone:</label>
          <input type='tel' id="Phone" name="Phone" className="form-control" value={userData.Phone} onChange={handleChange} />
          {errors.Phone && <div className="text-danger">{errors.Phone}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserPage;
