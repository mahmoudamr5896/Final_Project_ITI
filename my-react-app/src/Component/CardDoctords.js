import React from "react";
import DoctorsSection from "./TopDoctors";
import StarRating from '../Component/Rate'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DoctorCard({ delay, imageUrl, name, department, dept, id, rating }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4 wow fadeInUp" data-wow-delay={delay}>
            <div className="card h-100 shadow-sm" >
                <div className="overflow-hidden position-relative" style={{width:'200px'}}>
                    <img className="card-img-top" src={imageUrl} alt="Doctor"  />
                </div>
                <div className="card-body" style={{width:'200px'}}>
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{dept}</h6>
                    <p className="card-text">
                        <StarRating rating={rating} />
                    </p>
                    <Link className="btn btn-sm ProfileButton" to={`/profile/${id}`} >View Profile</Link>
                </div>
                <div className="card-footer text-center bg-light" style={{width:'200px'}}>
                    <div className="social-links">
                        <a className="btn btn-sm btn-light me-2" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-sm btn-light me-2" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-sm btn-light" href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorCard;
