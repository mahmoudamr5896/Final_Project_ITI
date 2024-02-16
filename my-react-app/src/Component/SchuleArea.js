import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS/style.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function ScheduleSection() {
    const [marginTop, setMarginTop] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setMarginTop(250);
            } else {
                setMarginTop(0);
            }
        };

        handleResize(); // Call once to set initial margin-top

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
    
        <section className="schedule" style={{ marginTop: `${marginTop}px` }}>
          
            <div className="container">
                <div className="schedule-inner">
                <h1 style={{
                     backgroundColor: "whitesmoke",
                     fontFamily: "Century Gothic",
                     fontSize: "2.5rem",
                     fontWeight: "bold",
                     padding: "20px", 
                     border: "2px solid #03974D", 
                     borderRadius: "10px", 
                     boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", 
                     textAlign: "center", 
                    }}>
  Our Services
</h1>

                    <br></br>
                    <div className="row">
                        
                        <div className="col-lg-4 col-md-4 col-12 " >
                            <div className="single-schedule first mb-3" style={{height:'260px'}}>
                            
                                <div className="inner">
                                    <div className="icon">
                                        <i ></i>
                                    </div>
                                    
                                    <div className="single-content" style={{height:'180px'}}>
                                        <span>our Services</span>
                                        <h4>Track your weight and calories</h4>
                                        <p>Racking your weight and calories involves monitoring your daily intake of food and beverages</p>
                                        {/* <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12" >
                            <div className="single-schedule middle mb-3" style={{height:'260px'}}>
                                <div className="inner">
                                    <div className="icon">
                                        <i className="icofont-prescription"></i>
                                    </div>
                                    <div className="single-content" style={{height:'180px'}} >
                                        <span>Our Services</span>
                                        <h4>Follow up on your condition with a nutritionist</h4>
                                        <p>Providing professional nutritionists near you</p>
                                        {/* <a href="#">LEARN MORE<i className="fa fa-long-arrow-right "></i></a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 mb-4" >
                        <div className="single-schedule last" style={{height:'260px'}}>
                                <div className="inner">
                                    <div className="icon">
                                        <i className="icofont-ui-clock"></i>
                                    </div>
                                    <div className="single-content" style={{height:'180px'}}>
                                        <span>Donec luctus</span>
                                        <h4>Opening Hours</h4>
                                        <ul className="time-sidual mb-0">
                                            <li className="day">Monday - Friday <span>8.00-20.00</span></li>
                                            <li className="day">Saturday <span>9.00-18.30</span></li>
                                            <li className="day">Monday - Thursday <span>9.00-15.00</span></li>
                                        </ul>
                                        {/* <Link className="">LEARN MORE<i className="fa fa-long-arrow-right"></i></Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default ScheduleSection;
