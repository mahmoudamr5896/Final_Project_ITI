import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap'; 
import Regspatien from './RegPatient';
import RegsNut from './RegNut';
import './Css/Reg.css';

function BeforeSignUpFor() {
  const [currentPage, setCurrentPage] = useState('userTypeSelection');
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCurrentPage('signupForm');
  };

  return (
    <Container className="mt-5">
      {currentPage === 'userTypeSelection' && (
        <div className="d-flex justify-content-between">
          <Card style={{ width: '45%', textAlign: 'center' }}>
            <Card.Body>
              <h1 style={{ color: "#03974D" }}>Sign Up as Patient</h1>
              <p></p>
              <Button variant="light" onClick={() => handleUserTypeChange('patient')}>
                <img src="er2.png" alt="patient" style={{ width: '500px', height: '500px' }} />
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '45%', textAlign: 'center' }}>
            <Card.Body>
              <h1 style={{ color: "#03974D" }}>Sign Up as Nutritionist</h1>
              <Button variant="light" onClick={() => handleUserTypeChange('nutritionist')}>
                <img src="z-removebg-preview.png" alt="nutritionist" style={{ width: '500px' }} />
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
      {currentPage === 'signupForm' && (
        userType === 'patient' ? <Regspatien /> : <RegsNut />
      )}
    </Container>
  );
}

export default BeforeSignUpFor;
