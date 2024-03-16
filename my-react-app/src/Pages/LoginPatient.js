import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';
import './Css/Reg.css';

function LoginPatien() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const history = useHistory(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    const newErrors = { ...errors };
    newErrors[name] = value.trim() === '' ? `Please enter your ${name === 'email' ? 'email' : 'password'}` : '';
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };

    // Validate email
    if (formData.email.trim() === '') {
      newErrors.email = 'Please enter your email';
    } else {
      newErrors.email = '';
    }

    // Validate password
    if (formData.password.trim() === '') {
      newErrors.password = 'Please enter your password';
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    
    // If there are no errors, submit the form
    if (Object.values(newErrors).every(error => error === '')) {
      console.log('Form submitted:', formData);

      // Perform API request to authenticate user
      axios.post('http://127.0.0.1:8000/users/login/', formData)
        .then(response => {
          console.log('Login successful:', response.data);
          const userId = response.data.id; // Assuming the response contains the user ID
          history.push(`/user/${userId}`);
        })
        .catch(error => {
          console.error('Login failed:', error);
          // Handle login failure, show error message to user
        });
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <div style={{marginTop:'100px'}}>
      <Container>
        <Row>
          <Col md={6} className="photo-column">
            <img src="us.jpg" alt="User" className="user-photo" style={{ height: "83%", marginTop: "-14%" }} />
          </Col>
          <Col md={6} className="form" style={{ height: "70%" }}>
            <div className="containerForm">
              <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <p>Enter your credentials to login</p>
                <div className="form-group">
                  <input
                    type="text"
                    className="text-input"
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
                <button type="submit">Login</button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegPat')} className='btn btn-promary' style={{color:'blue'}}>Sign Up</button></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPatien;
