import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css';

function HeroCarousel() {    

  return (
<section className="container-fluid slider carousel slide" id="carouselExampleControls" data-bs-ride="carousel" style={{marginTop:'100px'}}>
  <div className="carousel-inner">
     
    
    <div className="carousel-item single-slider d-block w-100" id="c3">
      <div className="container-fluid d-block w-100">
        <div className="row">
          <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
            <div className="text">
            <h1
            style={{marginRight:"20%",marginTop:"20%"}}>The great  <span>Wealth</span> is your<span>Health!</span></h1>
              <p  style={{marginRight:"20%"}}>“Take care of your body. It’s the only place you have to live.”
</p>
              <div className="button" style={{marginRight:"20%"}}>
                <a href="#" className="btn" style={{backgroundColor:'green'}}>Get started</a>
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
 <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> 
</section> 
  );
}

export default HeroCarousel;







