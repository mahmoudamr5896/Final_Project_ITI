import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook ,faXTwitter,faInstagram,faPinterest} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div className="container-fluid">
      <div className="footer pt-5 pb-5 text-white-50 text-center text-md-start" style={{marginTop:'50px',background:'black'}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="info mb-5">
                <img src="imgs/logo.png" alt="" className="mb-4" />
                <p className="mb-5">
                  Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed,
                  convallis at tellus.
                </p>
                <div className="copyright">
                  Created By <span>Graphberry</span>
                  <div>&copy; 2022 - <span>Bondi Inc</span></div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="links">
                <h5 className="text-light">Links</h5>
                <ul className="list-unstyled lh-lg">
                  <li>Home</li>
                  <li>Our Services</li>
                  <li>Portfolio</li>
                  <li>Testimonials</li>
                  <li>Support</li>
                  <li>Terms and Condition</li>
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
                <h5 className="text-light">Contact Us</h5>
                <p className="lh-lg mt-3 mb-5">Get in touch with us via mail phone.We are waiting for your call or message</p>
                <a className="btn rounded-pill main-btn btn-light w-100" href="#">graphberry@gmail.com</a>
                
                <ul className="d-flex justify-content-center mt-5 list-unstyled gap-3">
                  <li>
                  <a className="d-block text-light " href="#">
                     <FontAwesomeIcon icon={faFacebook} size="xl" /> {/* Change "lg" to any other size you prefer */}
                    </a>
                  </li>
                  <li>
                    <a className="d-block text-light" href="#">
                    <FontAwesomeIcon icon={faXTwitter} size="xl"/>
                    </a>
                  </li>
                  <li>
                    <a className="d-block text-light" href="#">
                    <FontAwesomeIcon icon={faInstagram} size="xl"/>
                    </a>
                  </li>
                  <li>
                    <a className="d-block text-light" href="#">
                    <FontAwesomeIcon icon={faPinterest} size="xl"/>
                    </a>
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
