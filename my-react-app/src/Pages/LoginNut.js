import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; 
import axios from 'axios';

function LoginNut() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    emailOrUsername: '',
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
    newErrors[name] = value.trim() === '' ? `Please enter your ${name === 'emailOrUsername' ? 'email or username' : 'password'}` : '';
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    Object.keys(formData).forEach(key => {
      if (formData[key].trim() === '') {
        newErrors[key] = `Please enter your ${key === 'emailOrUsername' ? 'email or username' : 'password'}`;
      }
    });
    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      console.log('Validation failed');
    } else {
      console.log('Form submitted:', formData);
      axios.get(`https://retoolapi.dev/EBWb8G/Doctors?Email=${formData.emailOrUsername}&Password=${formData.password}`)
        .then(response => {
          const user = response.data[0];
          if (user) {
            const userData = {
              email: user.Email,
              password: user.Password,
              role: 'doctor',
              doctorId: user.id
            };
            sessionStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('doctorId', user.id);
            // Fetch appointments for the doctor and save them
            axios.get(`https://retoolapi.dev/ornM79/Appointment?Doctor_id=${user.id}`)
              .then(appointmentsResponse => {
                const appointments = appointmentsResponse.data;
                sessionStorage.setItem('doctorAppointments', JSON.stringify(appointments));
                history.push('/dashboard');
              })
              .catch(error => console.error('Error fetching appointments:', error));
          } else {
            console.log("Doesn't Exist");
          }
        })
        .catch(error => console.error('Error logging in:', error));
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <br /><br />
        <Row>
          <Col md={6} className="photo-column">
            <img src="nutr3.jpg" alt="User" className="user-photo" style={{ height: "95%", marginTop: "-5%" }} />
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
                    name="emailOrUsername"
                    placeholder="Email or Username"
                    value={formData.emailOrUsername}
                    onChange={handleChange}
                  />
                  <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.emailOrUsername}</span>
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
              <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegNut')}>Sign Up</button></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginNut;
