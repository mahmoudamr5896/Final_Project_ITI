import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS/style.css'
import { useState } from 'react';
import { useEffect } from 'react';
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
        
        <section className="schedule" style={{ marginTop: `${marginTop}px` }}>
            <div className="container">
                <div className="schedule-inner">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-12 " >
                            <div className="single-schedule first mb-3" style={{height:'260px'}}>
                                <div className="inner">
                                    <div className="icon">
                                        <i className="fa fa-ambulance"></i>
                                    </div>
                                    <div className="single-content">
                                        <span>Lorem Amet</span>
                                        <h4>Emergency Cases</h4>
                                        <p>Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.</p>
                                        <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
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
                                    <div className="single-content">
                                        <span>Fusce Porttitor</span>
                                        <h4>Doctors Timetable</h4>
                                        <p>Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.</p>
                                        <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
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
                                    <div className="single-content">
                                        <span>Donec luctus</span>
                                        <h4>Opening Hours</h4>
                                        <ul className="time-sidual mb-0">
                                            <li className="day">Monday - Friday <span>8.00-20.00</span></li>
                                            <li className="day">Saturday <span>9.00-18.30</span></li>
                                            <li className="day">Monday - Thursday <span>9.00-15.00</span></li>
                                        </ul>
                                        <Link className="">LEARN MORE<i className="fa fa-long-arrow-right"></i></Link>
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
