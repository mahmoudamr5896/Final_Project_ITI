import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/style.css';

function HeroCarousel() {    
  useEffect(() => {
    const carousel = document.getElementById('carouselExampleControls');
    new window.bootstrap.Carousel(carousel);
  }, []);

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

// <section className="container-fluid slider carousel slide" id="carouselExampleControls" data-bs-ride="carousel">
//   <div className="carousel-inner">
//     <div className="carousel-item active single-slider d-block w-100" id="c1">
//       <div className="container-fluid d-block w-100">
//         <div className="row">
//           <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
//             <div className="text">
//               <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//               <div className="button">
//                 <a href="#" className="btn">Get Appointment</a>
//                 <a href="#" className="btn primary">Learn More</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div> 
//     <div className="carousel-item single-slider d-block w-100" id="c2">
//       <div className="container-fluid d-block w-100">
//         <div className="row">
//           <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
//             <div className="text">
//               <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//               <div className="button">
//                 <a href="#" className="btn">Get Appointment</a>
//                 <a href="#" className="btn primary">About Us</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="carousel-item single-slider d-block w-100" id="c3">
//       <div className="container-fluid d-block w-100">
//         <div className="row">
//           <div className="col-lg-7 mx-auto"> {/* Use mx-auto to center the content */}
//             <div className="text">
//               <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//               <div className="button">
//                 <a href="#" className="btn">Get Appointment</a>
//                 <a href="#" className="btn primary">Contact Now</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span className="visually-hidden">Previous</span>
//   </button>
//   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//     <span className="visually-hidden">Next</span>
//   </button>
// </section>

  );
}

export default HeroCarousel;











































// import React from 'react';
// import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Css/style.css'
// function HeroCarousel() {    

//     useEffect(() => {
//         // Initialize the Bootstrap carousel when the component mounts
//         const carousel = document.getElementById('carouselExampleControls');
//         new window.bootstrap.Carousel(carousel);
//       }, []);

// return(
//     <div className='container-flud'>
//     <section className="slider carousel slide" id="carouselExampleControls" data-bs-ride="carousel">
//     <div className="row col-12 carousel-inner">
//       <div className="carousel-item active single-slider" id="c1">
//         <div className="container-flud">
//           <div className="row">
//             <div className="col-lg-7">
//               <div className="text">
//                 <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//                 <div className="button">
//                   <a href="#" className="btn">Get Appointment</a>
//                   <a href="#" className="btn primary">Learn More</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="carousel-item single-slider" id="c2">
//         <div className="container-flud">
//           <div className="row">
//             <div className="col-lg-7">
//               <div className="text">
//                 <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//                 <div className="button">
//                   <a href="#" className="btn">Get Appointment</a>
//                   <a href="#" className="btn primary">About Us</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="carousel-item single-slider" id="c3">
//         <div className="container-flud">
//           <div className="row">
//             <div className="col-lg-7">
//               <div className="text">
//                 <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//                 <div className="button">
//                   <a href="#" className="btn">Get Appointment</a>
//                   <a href="#" className="btn primary">Contact Now</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//       <span className="visually-hidden">Previous</span>
//     </button>
//     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//       <span className="carousel-control-next-icon" aria-hidden="true"></span>
//       <span className="visually-hidden">Next</span>
//     </button>
//   </section></div>
// );

// }

// export default HeroCarousel;
  



// import React, { useState, useEffect } from 'react';

// const HeroCarousel = () => {
  

//   return (
//     <section className="slider">
//     <div className="hero-slider">
//         <div className="single-slider" >
//         <div className="container">
//                 <div className="row">
//                     <div className="col-lg-7">
//                         <div className="text">
//                             <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                             <div className="button">
//                                 <a href="#" className="btn">Get Appointment</a>
//                                 <a href="#" className="btn primary">Learn More</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         </div>
//         </div>
//         <div className="single-slider" style="background-image:url('img/slider.jpg')">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-7">
//                         <div className="text">
//                             <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                             <div className="button">
//                                 <a href="#" className="btn">Get Appointment</a>
//                                 <a href="#" className="btn primary">About Us</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="single-slider" >
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-7">
//                         <div className="text">
//                             <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                             <div className="button">
//                                 <a href="#" className="btn">Get Appointment</a>
//                                 <a href="#" className="btn primary">Conatct Now</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>
//   );
// };

// export default HeroCarousel;


	// <section className="slider carousel slide " id="carouselExampleControls" data-bs-ride="carousel" >
	// 		<div className=" carousel-inner">
	// 			<div className="row carousel-inner single-slider" id='c1' >
	// 				<div className="container">
	// 					<div className="row">
	// 						<div className="col-lg-7">
	// 							<div className="text">
	// 								<h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
	// 								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
	// 								<div className="button">
	// 									<a href="#" className="btn">Get Appointment</a>
	// 									<a href="#" className="btn primary">Learn More</a>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div className="carousel-item single-slider" id='c2' >
	// 				<div className="container">
	// 					<div className="row">
	// 						<div className="col-lg-7">
	// 							<div className="text">
	// 								<h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
	// 								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
	// 								<div className="button">
	// 									<a href="#" className="btn">Get Appointment</a>
	// 									<a href="#" className="btn primary">About Us</a>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div className="carousel-item single-slider" id='c3' >
	// 				<div className="container">
	// 					<div className="row">
	// 						<div className="col-lg-7">
	// 							<div className="text">
	// 								<h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
	// 								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
	// 								<div className="button">
	// 									<a href="#" className="btn">Get Appointment</a>
	// 									<a href="#" className="btn primary">Conatct Now</a>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
    //             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    //             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //             <span class="visually-hidden">Previous</span>
    //         </button>
    //         <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    //             <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //             <span class="visually-hidden">Next</span>
    //         </button>
	// 		</div>
	// </section>

















    // useEffect(() => {
//         // Start carousel
//         const carousel = document.getElementById('heroCarousel');
//         const carouselInstance = new window.bootstrap.Carousel(carousel, {
//           interval: 3000, // Interval between slides in milliseconds (e.g., 3000 = 3 seconds)
//         });
//         // Stop carousel on mouse hover
//         carousel.addEventListener('mouseover', () => {
//           carouselInstance.pause();
//         });
    
//         // Resume carousel on mouse leave
//         carousel.addEventListener('mouseleave', () => {
//           carouselInstance.cycle();
//         });
//       }, []);
//   return (
//     <section classNameName="container slider">
//     <div id="heroCarousel" classNameName="carousel slide" data-bs-ride="carousel">
//       <div classNameName="carousel-inner">
//         {/* Start Single Slide */}
//         <div classNameName="carousel-item active" id='Car1' >
//           <div classNameName="container">
//             <div classNameName="row">
//               <div classNameName="col-lg-7">
//                 <div classNameName="text">
//                   <h1>We Provide 1<span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                   <div classNameName="button">
//                     <a href="#" classNameName="btn">Get Appointment</a>
//                     <a href="#" classNameName="btn primary">Learn More</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* End Single Slide */}
//         {/* Start Single Slide */}
//         <div classNameName="carousel-item" id='Car2'> 
//           <div classNameName="container">
//             <div classNameName="row">
//               <div classNameName="col-lg-7">
//                 <div classNameName="text">
//                   <h1>We Provide 2 <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                   <div classNameName="button">
//                     <a href="#" classNameName="btn">Get Appointment</a>
//                     <a href="#" classNameName="btn primary">About Us</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* End Single Slide */}
//         {/* Start Single Slide */}
//         <div classNameName="carousel-item" id='Car3' >
//           <div classNameName="container">
//             <div classNameName="row">
//               <div classNameName="col-lg-7">
//                 <div classNameName="text">
//                   <h1>We Provide 3<span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                   <div classNameName="button">
//                     <a href="#" classNameName="btn">Get Appointment</a>
//                     <a href="#" classNameName="btn primary">Contact Now</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* End Single Slide */}
//       </div>
//     </div>
//   </section>




// import React from 'react';
// import './Css/hero.css'
// import img from  './img/slider.jpg' 
// const HeroSlider = () => {
//     return (
//         <section classNameName="slider">
//             <div classNameName="hero-slider">
//                 <div classNameName="single-slider" style={{ backgroundImage: {img}}}>
//                     <div classNameName="container">
//                         <div classNameName="row">
//                             <div classNameName="col-lg-7">
//                                 <div classNameName="text">
//                                     <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                                     <div classNameName="button">
//                                         <a href="#" classNameName="btn">Get Appointment</a>
//                                         <a href="#" classNameName="btn primary">Learn More</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div classNameName="single-slider" style={{ backgroundImage: "url('img/slider.jpg')" }}>
//                     <div classNameName="container">
//                         <div classNameName="row">
//                             <div classNameName="col-lg-7">
//                                 <div classNameName="text">
//                                     <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                                     <div classNameName="button">
//                                         <a href="#" classNameName="btn">Get Appointment</a>
//                                         <a href="#" classNameName="btn primary">About Us</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div classNameName="single-slider" style={{ backgroundImage: "url('img/slider3.jpg')" }}>
//                     <div classNameName="container">
//                         <div classNameName="row">
//                             <div classNameName="col-lg-7">
//                                 <div classNameName="text">
//                                     <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
//                                     <div classNameName="button">
//                                         <a href="#" classNameName="btn">Get Appointment</a>
//                                         <a href="#" classNameName="btn primary">Conatct Now</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
          
//     );
// };



// export default HeroSlider;
{/* 
//   const SingleSlider = ({ imageSrc, buttonText1, buttonText2 }) =>
//     return (
//         <div classNameName="single-slider" style={{ backgroundImage: `url(${imageSrc})` }}>
//             <div classNameName="container">
//                 <div classNameName="row">
//                     <div classNameName="col-lg-7">
//                         <div classNameName="text">
//                             <h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
//                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.</p>
//                             <div classNameName="button">
//                                 <a href="" classNameName="btn">{buttonText1}</a>
//                                 <a href="" classNameName="btn primary">{buttonText2}</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }; */} // <section className="slider">
		// 	<div className="hero-slider">
		// 		<div className="single-slider" style="background-image:url('img/slider2.jpg')">
		// 			<div className="container">
		// 				<div className="row">
		// 					<div className="col-lg-7">
		// 						<div className="text">
		// 							<h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
		// 							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
		// 							<div className="button">
		// 								<a href="#" className="btn">Get Appointment</a>
		// 								<a href="#" className="btn primary">Learn More</a>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div className="single-slider" style="background-image:url('img/slider.jpg')">
		// 			<div className="container">
		// 				<div className="row">
		// 					<div className="col-lg-7">
		// 						<div className="text">
		// 							<h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
		// 							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
		// 							<div className="button">
		// 								<a href="#" className="btn">Get Appointment</a>
		// 								<a href="#" className="btn primary">About Us</a>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div className="single-slider" style={{background-image:url('img/slider3.jpg')}}>
		// 			<div className="container">
		// 				<div className="row">
		// 					<div className="col-lg-7">
		// 						<div className="text">
		// 							<h1>We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
		// 							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam. </p>
		// 							<div className="button">
		// 								<a href="#" className="btn">Get Appointment</a>
		// 								<a href="#" className="btn primary">Conatct Now</a>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		//     </div>
		// </section>  