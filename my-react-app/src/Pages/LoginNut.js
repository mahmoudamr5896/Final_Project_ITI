import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom'; 
import { useEffect } from 'react';
import './Css/Reg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Import bcrypt library for password hashing
import { checkPassword } from 'bcryptjs'; // Assuming you have bcryptjs installed

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
const[doctor,setDoctor]=useState()

useEffect(() => {
  axios(`http://127.0.0.1:8000/users/`)
      .then((res) => setAcceptUser(res.data))
      .catch((err) => console.log(err));
}, []);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // Check if username exists
//   const existingUser = AcceptUser.find(user => user.username === formData.emailOrUsername);
//   if (!existingUser) {
//     console.log('User not found');
//     return;
//   }

//   // bcrypt.compare(formData.password, existingUser.password, (err, result) => {
//   //   if (err) {
//   //     console.error('Error comparing passwords:', err);
//   //     return;
//   //   }
    
//   //   if (result) {
//   //     console.log('Login successful');
//   //   } else {
//   //     console.log('Incorrect password');
//   //   }
//   // });
//   // const hashedPassword = existingUser.password;
  
//   // try {
//   //   // Compare the provided password with the hashed password
//   //   const passwordMatch = await bcrypt.compare(formData.password, hashedPassword);
    
//   //   if (passwordMatch) {
//   //     console.log('Login successful'); 
     
//   //     // Redirect to dashboard or perform other actions
//   //   } else {
//   //     console.log('Incorrect password');
//   //   }
//   // } catch (error) {
//   //   console.error('Error comparing passwords:', error);
//   // }
//  if (existingUser) {
//         axios.get('http://127.0.0.1:8000/doctors/')
//           .then(response => {
//             const doctors = response.data;
//             const doctor = doctors.find(d => d.username === existingUser.username);
//             if (doctor) {
//               console.log(doctor);
//               history.push(`/dashboard/${doctor.id}`);
//               const userData = {
//              email: formData.emailOrUsername,
//             password: formData.password,
//             role: 'Doctor' ,
//             id:doctor.id
//             };
//            const userDataString = JSON.stringify(userData);
//                        sessionStorage.setItem('userData', userDataString);
//                        console.log("Successfully updated user data in session storage for user with id:", doctor.id);
    
//             } else {
//               console.log('Doctor not found');
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching doctors:', error);
//           });
//       }
// };

const [error, setError] = useState('');
const username = formData.emailOrUsername
const password = formData.password
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:8000/auth/login/', { username , password });
      const authToken = response.data.token;
      if (response) {
                axios.get('http://127.0.0.1:8000/doctors/')
                  .then(response => {
                    const doctors = response.data;
                    const doctor = doctors.find(d => d.username === username);
                    if (doctor) {
                      console.log(doctor);
                      history.push(`/dashboard/${doctor.id}`);
                      const userData = {
                     email: formData.emailOrUsername,
                    password: formData.password,
                    role: 'Doctor' ,
                    id:doctor.id
                    };
                   const userDataString = JSON.stringify(userData);
                               sessionStorage.setItem('userData', userDataString);
                               console.log("Successfully updated user data in session storage for user with id:", doctor.id);
            
                    } else {
                      console.log('Doctor not found');
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching doctors:', error);
                  });
              }
      // Save the authToken in local storage or state for future requests
  } catch (error) {
      if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data.error || 'Failed to login');
      } else if (error.request) {
          // The request was made but no response was received
          console.log('Network error occurred');
      } else {
          // Other errors
          console.log('An error occurred');
      }
  }
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = { ...errors };
  //   Object.keys(formData).forEach(key => {
  //     if (formData[key].trim() === '') {
  //       newErrors[key] = `Please enter your ${key === 'emailOrUsername' ? 'email or username' : 'password'}`;
  //     }
  //   });
  //   if (Object.values(newErrors).some(error => error !== '')) {
  //     setErrors(newErrors);
  //     console.log('Validation failed');
  //   } else {
  //     console.log('Form submitted:', formData);
  //     const user_n = AcceptUser.filter((user) => user.username === formData.emailOrUsername && user.Password === formData.password);
  //     if (user_n.length > 0){
  //     //   user_n.forEach((user) =>
  //     //   {
  //     //   const  User_id = user.id;
  //     //    history.push(`/dashboard/${User_id}`);
  //     //    const userData = {
  //     //      email: formData.emailOrUsername,
  //     //      password: formData.password,
  //     //      role: 'Doctor' ,
  //     //      id:User_id
  //     //    };
  //     //    const userDataString = JSON.stringify(userData);
  //     //    sessionStorage.setItem('userData', userDataString);
  //     //    console.log("Successfully updated user data in session storage for user with id:", User_id);
  //     //  });
  //     }else{
  //         console.log("Does't Exits")
  //     }
      
  //   }
  // };

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
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <button onClick={() => history.push('/RegNut')} className=' btn-primary'> Sign Up</button></p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  
  );
}


export default LoginNut;


// useEffect(() => {
//   axios(`http://127.0.0.1:8000/users/`)
//       .then((res) => setAcceptUser(res.data))
//       .catch((err) => console.log(err));
// }, []);
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // Check if username exists
//   const existingUser = AcceptUser.find(user => user.username === formData.emailOrUsername);
//   if (!existingUser) {
//     console.log('User not found');
//     return;
//   }
 

//   // bcrypt.compare(formData.password, existingUser.password, (err, result) => {
//   //   if (err) {
//   //     console.error('Error comparing passwords:', err);
//   //     return;
//   //   }
    
//   //   if (result) {
//   //     console.log('Login successful');
//   //   } else {
//   //     console.log('Incorrect password');
//   //   }
//   // });
//   // const hashedPassword = existingUser.password;
  
//   // try {
//   //   // Compare the provided password with the hashed password
//   //   const passwordMatch = await bcrypt.compare(formData.password, hashedPassword);
    
//   //   if (passwordMatch) {
//   //     console.log('Login successful'); 
     
//   //     // Redirect to dashboard or perform other actions
//   //   } else {
//   //     console.log('Incorrect password');
//   //   }
//   // } catch (error) {
//   //   console.error('Error comparing passwords:', error);
//   // }
//  if (existingUser) {
//         axios.get('http://127.0.0.1:8000/doctors/')
//           .then(response => {
//             const doctors = response.data;
//             const doctor = doctors.find(d => d.username === existingUser.username);
//             if (doctor) {
//               console.log(doctor);
//               history.push(`/dashboard/${doctor.id}`);
//               const userData = {
//              email: formData.emailOrUsername,
//             password: formData.password,
//             role: 'Doctor' ,
//             id:doctor.id
//             };
//            const userDataString = JSON.stringify(userData);
//                        sessionStorage.setItem('userData', userDataString);
//                        console.log("Successfully updated user data in session storage for user with id:", doctor.id);
    
//             } else {
//               console.log('Doctor not found');
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching doctors:', error);
//           });
//       }
// };


