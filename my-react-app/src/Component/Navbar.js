import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './CSS/Navbar.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo7 from "./img/logo7.png";

function Navbar() {
   
  return (
    <>
      <nav className="navbar nbar navbar-expand-lg fixed-top" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand" to="/">
            <img src={logo7} alt="Logo" height="70" style={{ backgroundColor: "white", borderRadius: "50%" }} />
          </Link>        
          <span>MR.Health</span>
          
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link me-4" to="/" ><b>Home</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-4" to="/doctors">Doctors</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="">Services</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-4" to="/About-us">About Us</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="">Contact Us</a>
              </li>
              <li className="nav-item ">
                <Link to='/login'>
                  <button className="button1 type12 ms-auto"></button> 
                </Link>            
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
