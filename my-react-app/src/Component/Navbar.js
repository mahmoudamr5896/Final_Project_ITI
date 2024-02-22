import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo7 from "./img/logo7.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./CSS/Navbar.css"; 
import axios from 'axios';
import { useEffect } from 'react';
function CustomNavbar() {
  const userData = sessionStorage.getItem('userData');
  const showJoinButton = !userData;
  const history = useHistory()

  const[userDataLoged,setuserDataLoged]=useState('')
  useEffect(() => {
    axios(`https://retoolapi.dev/T6Ye0M/users/${1}`)
        .then((res) => setuserDataLoged(res.data))
        .catch((err) => console.log(err));
}, []);

 const Logout_handel = (e)=>{
  sessionStorage.removeItem('userData');
  history.push('/')
} 







  return (

    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ boxShadow: "0 4px 5px -2px gray" }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo7}
              alt="Logo"
              height="70"
              style={{ backgroundColor: "white", borderRadius: "50%" }}
            />
            <span style={{ color: "#077A1B", marginLeft: "10px" }}>MR.Health</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/doctors">Doctors</Nav.Link>
              <Nav.Link as={Link} to="">Services</Nav.Link>
              <Nav.Link as={Link} to="/About-us">About Us</Nav.Link>
              <Nav.Link as={Link} to="">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/user">profile</Nav.Link>
            </Nav>
            <Nav>
            {showJoinButton ? (
            <Link to='/login'>
              <button className="button1 type12 ms-auto">Join Us Now</button>
            </Link>
          ):(<button className="button1 type12 ms-auto" onClick={Logout_handel}>Log Out</button>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
