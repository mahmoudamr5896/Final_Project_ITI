import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo7 from "./img/logo7.png";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/Actions/authAction';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./CSS/Navbar.css"; 
import axios from 'axios';
import { useEffect } from 'react';
const  CustomNavbar= ()=> {
const selectedData = useSelector((state) => state.auth.isLoggedIn);
console.log(selectedData)
  const userData = localStorage.getItem('userData');
  const showJoinButton = !userData;
  const history = useHistory()
  const storedId = sessionStorage.getItem('userData') ;
  const userDatas = JSON.parse(storedId); 
  const[join,setjoin]=useState('')
  if(userDatas){
   var User_id = userDatas.id;
  }
  console.log(storedId)
  const [login, setLogin] = useState(null);
  useEffect(()=>{
    setLogin(userDatas !== null)
  },[storedId])

  const[userDataLoged,setuserDataLoged]=useState('')
  useEffect(() => {
    axios(`https://retoolapi.dev/T6Ye0M/users/${User_id}`)
        .then((res) => setuserDataLoged(res.data))
        .catch((err) => console.log(err))
}, []);
const dispatch = useDispatch()
 const Logout_handel = (e)=>{
  sessionStorage.removeItem('userData');
  localStorage.removeItem('userData');
  setLogin(!login)
  history.push('/')
  dispatch(logout(userDatas));
} 
//______________________________________________________________________________

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
              {userDatas && userDatas.role === 'Patient' && (
              <Nav.Link as={Link} to={`/user/${User_id}`}>profile</Nav.Link>
              )}
            </Nav>
            <Nav>
            {login   || userData ? (
              <Link to='/'>
               <button className="button1 type12 ms-auto" onClick={Logout_handel}>Log Out</button>
              </Link>  
              ):(
              <Link to='/login'>
                <button className="button1 type12 ms-auto" >Join Us Now</button>
              </Link> 
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
  // axios
  // .patch(`https://retoolapi.dev/zP9Zhd/patient/${User_id}`,
  //  { "Active": false })
  // .then(response => {
  //   console.log('Active status updated successfully for user with id:', User_id);
  // })
  // .catch(error => {
  //   console.error('Error updating Active status for user with id:', User_id, error);
  // });