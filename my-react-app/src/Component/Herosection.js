import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css';

function HeroCarousel() {    

  return (
<section className="container-fluid slider carousel slide" id="carouselExampleControls" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active single-slider d-block w-100" id="c1">
      <div className="container-fluid d-block w-100">
        <div className="row">
          <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
            <div className="text">
              <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
              <div className="button">
                <a href="#" className="btn">Get Appointment</a>
                <a href="#" className="btn primary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <div className="carousel-item single-slider d-block w-100" id="c2">
      <div className="container-fluid d-block w-100">
        <div className="row">
          <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
            <div className="text">
              <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
              <div className="button">
                <a href="#" className="btn">Get Appointment</a>
                <a href="#" className="btn primary">About Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="carousel-item single-slider d-block w-100" id="c3">
      <div className="container-fluid d-block w-100">
        <div className="row">
          <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
            <div className="text">
              <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
              <div className="button">
                <a href="#" className="btn">Get Appointment</a>
                <a href="#" className="btn primary">Contact Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
</section>
  );
}

export default HeroCarousel;







