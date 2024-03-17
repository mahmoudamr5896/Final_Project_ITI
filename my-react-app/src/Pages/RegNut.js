import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import './Css/Reg.css';

function RegsNut() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    const newErrors = { ...errors };
    switch (name) {
      case 'firstName':
        newErrors.firstName = value.trim() === '' ? 'Please enter your first name' : '';
        break;
      case 'lastName':
        newErrors.lastName = value.trim() === '' ? 'Please enter your last name' : '';
        break;
      case 'userName':
        newErrors.userName = /\s/.test(value) ? 'Username cannot contain spaces' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = !emailRegex.test(value) ? 'Please enter a valid email address' : '';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        newErrors.password = !passwordRegex.test(value) ? 'Password must be at least 8 characters, with one lowercase, one uppercase, one digit, and one special character' : '';
        break;
      case 'repeatPassword':
        newErrors.repeatPassword = value !== formData.password ? 'Passwords do not match' : '';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };



  const[id_,setid_]=useState()
  useEffect(() => {
    axios(`https://retoolapi.dev/EBWb8G/Doctors`)
        .then((res) => setid_(res.data))
        .catch((err) => console.log(err));
  }, []);
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    Object.keys(formData).forEach(key => {
      if (formData[key].trim() === '') {
        newErrors[key] = `Please enter your ${key}`;
      }
    });

    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      console.log('Validation failed');
    } else {
      console.log('Form submitted:', formData);
      const user_n = id_.find((user) => user.Email === formData.email );
      if(user_n){
           setError("This Email Is Exites")
      }else{
        // Navigate to login page
        history.push('/logNut');
        const Nwew_user ={
          username : formData.userName,
          password:formData.password,
          email : formData.email,
          first_name : formData.firstName,
          last_name : formData.lastName,
          role : "doctor"
        };
  
        // "Bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            // "Email": formData.email,
            // "Image": "audio.mp3",
            // "Phone": "(555) 820-9259",
            // "Gender": "Male ",
            // "Rating": "⭐️⭐️⭐️⭐️",
            // "Location": "Muncie, Indiana, United States",
            // "Password": formData.password,
            // "Doctor_Name": `${formData.firstName} ${formData.lastName}`,
            // "Payment_Appointment": "Invoice" 
      
axios
.post('http://127.0.0.1:8000/users/', Nwew_user)
  .then(response => {
    console.log('Doctor posted successfully:', response.data);
  })
  .catch(error => {
    setError('Error posting Doctor:', error);
  });  
};

const Doctor={
  username : formData.userName,
  name : `${formData.firstName} ${formData.last_name}`,
  age: 0,
  image: 'png.1',
  experience: 0,
  gender: "M",
  phone: "+20",
  location: "None"
}
axios
.post('http://127.0.0.1:8000/doctors/', Doctor)
.then(response => {
console.log('Doctor posted successfully:', response.data);
})
.catch(error => {
setError('Error posting Doctor:', error);
}); 


    }
  };


  return (
    <div style={{marginTop:'100px'}}> 
      <Container >
      <Row>
        <Col md={6} className="photo-column">
          <img src="nutr3.jpg" alt="User" className="user-photo" style={{ marginBottom: "20%", height: "100%", marginTop: "20%" }} />
        </Col>
        <Col md={6} className="form">
          <div className="containerForm">
            <form onSubmit={handleSubmit} className="signup-form">
              <h2>Sign Up</h2>
              <p>Join us To be one of the most successful nutritionists </p>
              <div className="form-group">
                <input
                  type="text"
                  className="text-input"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.firstName}</span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="text-input"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.lastName}</span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="text-input"
                  name="userName"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.userName}</span>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className='email-input'
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.email}</span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className='password-input'
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.password}</span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className='password-input'
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.repeatPassword}</span>
              </div>
              <button type="submit">Sign Up</button>
              <p className='text-danger'>{error}</p>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <button onClick={() => history.push('/logNut')}  className='btn btn-promary' style={{color:'blue'}}>Login</button></p>
          </div>
        </Col>
      </Row>
    </Container>

    </div>
 
  );
}

export default RegsNut;


































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function EditUserPage({ userId }) {
//   const [userData, setUserData] = useState({
//     name: "",
//     age: 0,
//     image: '',
//     experience: 0,
//     gender: "",
//     phone: "",
//     location: ""
//   });
  
//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/doctors/${userId}/`)
//       .then(response => {
//         setUserData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.patch(`http://127.0.0.1:8000/doctors/${userId}/`, userData)
//       .then(response => {
//         console.log('User data updated successfully:', response.data);
//       })
//       .catch(error => {
//         console.error('Error updating user data:', error);
//       });
//   };

//   return (
//     <div className='container m-5'>
//       <h1>Edit User</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password:</label>
//           <input id="password" type="password" name="age" className="form-control" value={userData.age} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="img" className="form-label">Img:</label>
//           <input id="img" type="text" name="image" className="form-control" value={userData.image} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name:</label>
//           <input id="name" type="text" name="name" className="form-control" value={userData.name} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email:</label>
//           <input id="email" type="text" name="experience" className="form-control" value={userData.experience} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="phone" className="form-label">Phone:</label>
//           <input id="phone" type="text" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="location" className="form-label">Location:</label>
//           <input id="location" type="text" name="location" className="form-control" value={userData.location} onChange={handleChange} />
//         </div>
//         <button type="submit" className="btn btn-primary">Save Changes</button>
//       </form>
//     </div>
//   );
// }

// export default EditUserPage;
