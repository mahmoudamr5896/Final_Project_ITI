import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'; 
import './Css/Reg.css';

function Regspatien() {
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
      const newUser = {
        username: formData.email, // Assuming email is the username
        password: formData.password,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: "patient"
      };

      axios
        .post('http://127.0.0.1:8000/users/', newUser)
        .then(response => {
          console.log('User posted successfully:', response.data);
          // Proceed with posting patient data only if user creation was successful
          const newPatient = {
            username: formData.userName,
            name: `${formData.firstName} ${formData.lastName}`,
            age: 27,
            weight: 70, // Make sure this field is provided in the form
            image: null,
            height: 170,
            gender: "M",
            phone: "+20",
            medical_history: "None" // Make sure this field name matches the backend
          };

          axios
            .post('http://127.0.0.1:8000/patients/', newPatient)
            .then(response => {
              console.log('Patient data posted successfully:', response.data);
              history.push('/LogPat');
            })
            .catch(error => {
              console.error('Error posting patient data:', error);
            });
        })
        .catch(error => {
          console.error('Error posting user:', error.response.data); // Log the response data for better understanding
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
              </form>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <button onClick={() => history.push('/logNut')}  className='btn btn-promary' style={{color:'blue'}}>Login</button></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Regspatien;
