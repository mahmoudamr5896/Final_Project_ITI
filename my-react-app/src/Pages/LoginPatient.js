import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './Css/Reg.css';
import axios from 'axios';
import { useEffect } from 'react';
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

// 
// Handel Accept user
const[AcceptUser,setAcceptUser]=useState()
useEffect(() => {
 const  Email=formData.email 
  axios(`https://retoolapi.dev/zP9Zhd/patient?${Email}`)
      .then((res) => setAcceptUser(res.data))
      .catch((err) => console.log(err));
}, []);
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
      var User_id;
      const user_n = AcceptUser.find((user) => user.Email === formData.email && user.password === formData.password);
      console.log(user_n)
      if(user_n){
              AcceptUser.find((user) => User_id=user.id);
              history.push(`/user/${User_id}`);
              axios
              .patch(`https://retoolapi.dev/zP9Zhd/patient/${User_id}`, { "Active": true })
              .then(response => {
                console.log('Active status updated successfully:', response.data);
              })
              .catch(error => {
                console.error('Error updating Active status:', error);
              });

              const user = {
                email: formData.email,
                password: formData.password,
                role: 'Patient' 
              };
              const userData = JSON.stringify(user);
              sessionStorage.setItem('userData', userData);
              console.log("Successfully")
      }else{
          console.log("Does't Exits")
      }
    } else {
      console.log('Validation failed');
    }
  };


  
  return (
    <div style={{marginTop:'100px'}}>
         <Container >
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
    </div>
  );
}

export default LoginPatien;
