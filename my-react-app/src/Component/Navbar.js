import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import './CSS/Navbar.css';

function Navbar() {
   
      
  return (
    <>
<nav className="navbar nbar navbar-expand-lg bg-body-tertiary fixed-top" style={{marginBottom:'50px' }} >
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav ">
            <li className="nav-item">
                <a className="nav-link me-4" href="">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="">Doctors</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="">Blogs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-4" href="">Contact Us</a>
              </li>
             
              <li className="nav-item ">
                <button className="button1 type12 ms-auto"></button>             
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
