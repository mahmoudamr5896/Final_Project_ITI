import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; 
import axios from 'axios';
import './Css/Reg.css';
import { useDispatch } from 'react-redux';
import { login } from '../Store/Actions/authAction';

function LoginPatient() {
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

  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/')
      .then(response => setAcceptedUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
    
    axios.get('http://127.0.0.1:8000/patients/')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const existingUser = acceptedUsers.find(user => user.username === formData.emailOrUsername);
  //   if (!existingUser) {
  //     console.log('User not found');
  //     return;
  //   }

  //   const patient = patients.find(p => p.name === existingUser.first_name + ' ' + existingUser.last_name);
  //   if (patient) {
  //     console.log(patient);
  //     const userData = {
  //       email: formData.emailOrUsername,
  //       password: formData.password,
  //       role: 'patient',
  //       id: patient.id
  //     };
  //     const userDataString = JSON.stringify(userData);
  //     sessionStorage.setItem('userData', userDataString);
  //     console.log("Successfully updated user data in session storage for user with id:", patient.id);
  //     history.push(`/user/${patient.id}`); // Redirect to patient's ID
  //   } else {
  //     console.log('Patient not found');
  //   }
  // };
const [error, setError] = useState('');
const username = formData.emailOrUsername
const password = formData.password
const storedId = sessionStorage.getItem('userData') ;
const userDatas = JSON.parse(storedId); 
const dispatch = useDispatch();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:8000/auth/login/', { username , password });
      const authToken = response.data.token;
      if (response){
                axios.get('http://127.0.0.1:8000/patients/')
                  .then(response => {
                    const doctors = response.data;
                    const doctor = doctors.find(d => d.username === username);
                    if (doctor) {
                      console.log(doctor);
                      history.push(`/user/${doctor.id}`);
                      const userData = {
                     email: formData.emailOrUsername,
                    password: formData.password,
                    role: 'Patient' ,
                    id:doctor.id
                    };
                   const userDataString = JSON.stringify(userData);
                    sessionStorage.setItem('userData', userDataString);
                    localStorage.setItem('userData', userDataString);
                    console.log("Successfully updated user data in session storage for user with id:", doctor.id);
                    dispatch(login(userDatas));

                    } else {
                      setError('Patient not found');
                    }
                  })
                  .catch(error => {
                    setError('Error fetching Patient:', error);
                  });
              }
      // Save the authToken in local storage or state for future requests
  } catch (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          setError(error.response.data.error || 'Failed to login');
      } else if (error.request) {
          // The request was made but no response was received
          setError('Network error occurred');
      } else {
          // Other errors
          setError('An error occurred');
      }
  }
};

//____________________________________________________________
const userData = localStorage.getItem('userData') ;
const userData_ = JSON.parse(userData); 
if(userData_){
  history.push('/')
}
//___________________________________________________________
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
                <p className='text-danger'>{error}</p>
              </form>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegPat')} className='btn btn-promary' style={{color:'blue'}}>Sign Up</button></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPatient;
