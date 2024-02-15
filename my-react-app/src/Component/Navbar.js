
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './CSS/Navbar.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo7 from "./img/logo7.png";

function Navbar() {
   
  return (
    <>
      <nav className="navbar nbar navbar-expand-lg fixed-top navbar-light" style={{ backgroundColor: "white", boxShadow: "0 4px 5px -2px gray" }}>
        <div className="container">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

          <Link className="navbar-brand" to="/">
            <img src={logo7} alt="Logo" height="70" style={{ backgroundColor: "white", borderRadius: "50%" }} />
          </Link>        
          <span>MR.Health</span>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ">
           

              <li className="nav-item">
                <Link className="nav-link me-4" to="/" ><b>Home</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-4" to="/doctors">Doctors</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-4" to="">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-4" to="/About-us">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-4" to="">Contact Us</Link>
              </li>
             <Link to='/login'>
              <li className="nav-item ">
                <button className="button1 type12 ms-auto">
                </button>          
              </li>
              </Link>  
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
