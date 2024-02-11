import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS/style.css'
import DoctorCard from '../Component/CardDoctords'
function DoctorsSection() {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                    <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
                    <h1>Our Experienced Doctors</h1>
                </div>
                <div className="row g-4">
                    <DoctorCard delay="0.1s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' name="Doctor Name 1" department="View Profile" />
                    <DoctorCard delay="0.3s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 2" department="View Profile" />
                    <DoctorCard delay="0.5s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 3" department="View Profile" />
                    <DoctorCard delay="0.7s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 4" department="View Profile" />
                </div>
            </div>
        </div>
    );
}

export default DoctorsSection;