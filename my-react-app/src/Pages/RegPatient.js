import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './Css/Reg.css';
function Regspatien() {
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

  const history = useHistory(); // Initialize useHistory hook

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
      history.push('/LogPat');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="photo-column">
          
          <img src="us.jpg" alt="User" className="user-photo" style={{ marginBottom: "20%", height: "100%", marginTop: "20%" }} />
        </Col>
        <Col md={6} className="form">
          <div className="containerForm">
            <form onSubmit={handleSubmit} className="signup-form">
              <h2>Sign Up</h2>
              <p>Join us and start your new healthy life</p>
              <div className="form-group">
                <input
                  type="text"
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
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                <span className="error" style={{ color: 'red', textAlign: 'left', display: 'block' }}>{errors.repeatPassword}</span>
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Already have an account? <button onClick={() => history.push('/LogPat')}>Login</button></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Regspatien;
