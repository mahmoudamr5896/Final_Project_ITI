import React from "react";
import DoctorsSection from "./TopDoctors";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function DoctorCard({ delay, imageUrl, name, department ,dept}) {
    return (
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={delay}>
            <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                    <img className="img-fluid" src={imageUrl} alt="Doctor" />
                </div>
                <div className="team-text bg-light text-center p-4">
                    <h5>{name}</h5>
                    <h5>{dept}</h5>
                    <Link className="text-primary">{department}</Link>
                    <div className="team-social text-center">
                        <a className="btn btn-square" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square" href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorCard;
