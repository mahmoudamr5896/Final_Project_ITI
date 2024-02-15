import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook ,faXTwitter,faInstagram,faPinterest} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo7 from "./img/logo7.png";

function Footer() {
  return (
    <div className="container-fluid">
      <div className="footer pt-5 pb-5 text-white-50 text-center text-md-start " style={{marginTop:'50px',background:'black'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="info mb-5">
              <img src={logo7} alt="Logo" height="70" style={{ backgroundColor: "black", borderRadius: "50%" ,marginBottom:'10px'}} />
              <span>MR.Health</span>
                <p className="mb-5">
                  Mr.Health is a websitte for you to find fun in healthy life  that helps to establish new healthy habits in a comfortable and pleasant way
                </p>
                <div className="copyright">
                  
                  <div>&copy; 2023 - <span>MR.Health</span></div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="links">
                <h5 className="text-light">Links</h5>
                <ul className="list-unstyled lh-lg">
                  <li>Home</li>
                  <li>Our Services</li>
                  <li>Contact Us</li>
                  <li>About Us</li>
                  
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="links">
                <h5 className="text-light">About Us</h5>
                <ul className="list-unstyled lh-lg">
                  <li>Sign In</li>
                  <li>Register</li>
                  <li>About Us</li>
                  <li>Blog</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="contact">
                
                <h5 className="text-light">Start Wiht Us</h5>
                <p className="lh-lg mt-3 mb-5">Start with MR.Health to have a wonderful healthy life</p>
                <a className="btn rounded-pill main-btn btn-light w-100" href="#">Start now</a>
                <hr></hr>
                <ul className="d-flex justify-content-center mt-5 list-unstyled gap-3">
                <li>
                  <Link className="d-block text-light " to="#">
                     <FontAwesomeIcon icon={faFacebook} size="xl" /> {/* Change "lg" to any other size you prefer */}
                    </Link>
                  </li>
                  <li>
                    <Link className="d-block text-light" to="#">
                    <FontAwesomeIcon icon={faXTwitter} size="xl"/>
                    </Link>
                  </li>
                  <li>
                    
                    <Link className="d-block text-light" to="#">
                    <FontAwesomeIcon icon={faInstagram} size="xl"/>
                    </Link>
                  </li>
                  <li>
                    <Link className="d-block text-light" to="#">
                    <FontAwesomeIcon icon={faPinterest} size="xl"/>
                    </Link>
                  </li>
                </ul>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
