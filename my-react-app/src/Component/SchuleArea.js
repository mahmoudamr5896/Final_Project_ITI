import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS/style.css';

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
        <section className="schedule" style={{ marginTop: `${marginTop}px` }}>
            <div className="container">
                <div  >                   <div className="row">
                        <div className="col-lg-4 col-md-4 col-12" >
                            <div className="single-schedule first green-card"> {/* Add green-card class */}
                                <div className="inner" style={{backgroundColor:"green"}}>
                                    <div className="icon">
                                        <i ></i>
                                    </div>
                                    <div>
                                        <span>our Services</span>
                                        <h4>Track your weight and calories</h4>
                                        <p>racking your weight and calories involves monitoring your daily intake of food and beverages, as well as keeping tabs on your body weight fluctuations</p>
                                        <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="single-schedule middle green-card"> {/* Add green-card class */}
                                <div className="inner"style={{backgroundColor:"limegreen"}}>
                                    <div className="icon">
                                        <i className="icofont-prescription"></i>
                                    </div>
                                    <div className="single-content">
                                        <span>Our Services</span>
                                        <h4>Follow up on your condition with a nutritionist</h4>
                                        <p>Providing professional nutritionists near you</p>
                                        <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12 mb-4">
                            <div className="single-schedule last green-card"> 
                                <div className="inner"style={{backgroundColor:"green"}}>
                                    <div className="icon">
                                        <i className="icofont-ui-clock"></i>
                                    </div>
                                    <div className="single-content">
                                        <span>Our Services</span>
                                        <h4>Customize a diet suitable for your health condition</h4>
                                        <p>Make your Custome diet that match yoyr health conditions</p>
                                        <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScheduleSection;
