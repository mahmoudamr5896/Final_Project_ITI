import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS/style.css'
import { useState } from 'react';
import { useEffect } from 'react';
function FunFactsSection() {
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
        <div id="fun-facts" className="fun-facts section overlay" style={{ marginTop: `${marginTop}px` }}>
            <div className="container text-dqrk">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                        <div className="single-fun">
                            {/* <i className="icofont icofont-home"></i> */}
                            <div className="content">
                                <span className="counter">3468</span>
                                <p>Hospital Rooms</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-fun">
                            <i className="icofont icofont-user-alt-3"></i>
                            <div className="content">
                                <span className="counter">557</span>
                                <p>Specialist Doctors</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mt-3">
                        <div className="single-fun">
                            <i className="icofont-simple-smile"></i>
                            <div className="content">
                                <span className="counter">4379</span>
                                <p>Happy Patients</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-fun">
                            <i className="icofont icofont-table"></i>
                            <div className="content">
                                <span className="counter">32</span>
                                <p>Years of Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FunFactsSection;
