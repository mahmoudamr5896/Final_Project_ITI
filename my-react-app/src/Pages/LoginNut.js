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

// Handel Accept user
const[AcceptUser,setAcceptUser]=useState()
useEffect(() => {
  axios(`https://retoolapi.dev/EBWb8G/Doctors`)
      .then((res) => setAcceptUser(res.data))
      .catch((err) => console.log(err));
}, []);
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
      const user_n = AcceptUser.filter((user) => user.Email === formData.emailOrUsername && user.Password === formData.password);
      if (user_n.length > 0){
        user_n.forEach((user) =>
        {
        const  User_id = user.id;
         history.push(`/dashboard`);
         const userData = {
           email: formData.emailOrUsername,
           password: formData.password,
           role: 'Doctor' ,
           id:User_id
         };
         const userDataString = JSON.stringify(userData);
         sessionStorage.setItem('userData', userDataString);
         console.log("Successfully updated user data in session storage for user with id:", User_id);
       });
      }else{
          console.log("Does't Exits")
      }
      
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
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegNut')}>Sign Up</button></p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  
  );
}

export default LoginNut;
