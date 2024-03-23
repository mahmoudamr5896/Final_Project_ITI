import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap'; 
import Regspatien from './RegPatient';
import RegsNut from './RegNut';
import './Css/Reg.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function BeforeSignUpFor() {
  const [currentPage, setCurrentPage] = useState('userTypeSelection');
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCurrentPage('signupForm');
  };

  return (

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Container>
        {currentPage === 'userTypeSelection' && (
          <div className="d-flex justify-content-between">
            <Card style={{ width: '45%', textAlign: 'center' }}>
              <Card.Body>
                <h1 style={{ color: "#03974D" ,marginTop:"15%"}}>Sign Up as Patient</h1>
                <Button variant="light" onClick={() => handleUserTypeChange('patient')}>
                  <img src="er2.png" alt="patient" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '45%', textAlign: 'center' }}>
              <Card.Body>
                <h1 style={{ color: "#03974D" ,marginTop:"15%"}}>Sign Up as Nutritionist</h1>
                <Button variant="light" onClick={() => handleUserTypeChange('nutritionist')}>
                  <img src="z-removebg-preview.png" alt="nutritionist" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
        {currentPage === 'signupForm' && (
          userType === 'patient' ? <Regspatien /> : <RegsNut />
        )}
      </Container>
      {/* <button onClick={() => window.location.href = 'http://127.0.0.1:8000/admin/login/?next=/admin/'}>Admin Panel</button> */}
    </div>

  );
}

export default BeforeSignUpFor;
