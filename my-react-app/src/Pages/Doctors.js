import React from 'react';
import DoctorCard from '../Component/CardDoctords';

function DoctorsPage() {


    return (
        <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-4">
                <DoctorCard delay="0.1s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' name="Doctor Name 1" department="View Profile" />
                <DoctorCard delay="0.3s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 2" department="View Profile" />
                <DoctorCard delay="0.5s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 3" department="View Profile" />
                <DoctorCard delay="0.1s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg' name="Doctor Name 1" department="View Profile" />
                <DoctorCard delay="0.3s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 2" department="View Profile" />
                <DoctorCard delay="0.5s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 3" department="View Profile" /> 
                <DoctorCard delay="0.7s" imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'  name="Doctor Name 4" department="View Profile" />
            </div>
        </div>
    </div>

    );
}

export default DoctorsPage;
