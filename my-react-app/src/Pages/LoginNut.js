import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; 
import { useEffect } from 'react';
import './Css/Reg.css';
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
      axios.get(`https://retoolapi.dev/EBWb8G/Doctors`, {
        params: {
          email: formData.emailOrUsername,
          password: formData.password
        }
      })
      .then((res) => {
        const user = res.data[0]; 
        if (user) {
          const doctorId = user.id;
          sessionStorage.setItem('doctorId', doctorId); 
          history.push(`/dashboard?doctor_id=${doctorId}`); // Redirect to dashboard with doctor ID
          console.log('Redirected to dashboard with doctor ID:', doctorId);
        } else {
          console.log("User doesn't exist");
        }
      })
      .catch((err) => console.log(err));
    }
  };
  

  return (
    <div style={{marginTop:'100px'}}>
        <Container >
      <br></br><br></br>
      <Row>
        <Col md={6} className="photo-column">
          <img src="nutr3.jpg" alt="User" className="user-photo" style={{height:"95%",marginTop:"-5%"}}  />
        </Col>
        <Col md={6} className="form" style={{height:"70%"}}>
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
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegNut')} className='btn btn-promary' style={{color:'blue'}}> Sign Up</button></p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  
  );
}

export default LoginNut;
