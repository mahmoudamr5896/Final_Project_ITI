import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
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
      // Redirect to the dashboard or wherever you want
      // history.push('/dashboard');
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <Container className="mt-5">
      <br /><br />
      <Row>
        <Col md={6} className="photo-column">
          <img src="us.jpg" alt="User" className="user-photo" style={{ height: "83%", marginTop: "-14%" }} />
        </Col>
        <Col md={6} className="form" style={{ height: "70%" }}>
          <div className="containerForm">
            <form onSubmit={handleSubmit} >
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
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegPat')}>Sign Up</button></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPatien;
