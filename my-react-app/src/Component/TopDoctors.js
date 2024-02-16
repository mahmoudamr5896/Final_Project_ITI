import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './CSS/style.css'
import DoctorCard from '../Component/CardDoctords'
function DoctorsSection() {
    return (
        <>
        <div className="container-xxl py-5">
        <h1
        style={{ backgroundColor: "whitesmoke",
        fontFamily: "Century Gothic",
        fontSize: "2.5rem",
        fontWeight: "bold",
        padding: "20px", 
        border: "2px solid #03974D", 
        borderRadius: "10px", 
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", 
        textAlign: "center", }}>  Our Experienced Nutritionists</h1>
            <div className="container"  style={{backgroundColor:"whitesmoke",fontFamily:"sans-serif"}}>
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                {/* <p className="d-inline-block border rounded-pill py-1 px-5 big-pill text-xxxl"><strong>Doctors</strong></p> */}
                 
                </div>
                <div className="row g-4" >
                    <DoctorCard delay="0.1s" imageUrl='https://the-riotact.com/wp-content/uploads/2018/05/The-Best-Dietitians-in-Canberra.jpg' name="Doctor Name 1" department="View Profile"  />
                    <DoctorCard delay="0.3s" imageUrl='https://www.workbc.ca/sites/default/files/styles/hero_image/public/NTI5NzE_WBtwVGtmKPv8pNus-3132-NOC.jpg?itok=FrrP-vVb'  name="Doctor Name 2" department="View Profile" />
                    <DoctorCard delay="0.5s" imageUrl='https://amyseden.com/wp-content/uploads/2023/03/word-image-23511-2-1024x698.jpeg'  name="Doctor Name 3" department="View Profile" />
                    <DoctorCard delay="0.7s" imageUrl='https://st4.depositphotos.com/12982378/28043/i/450/depositphotos_280439976-stock-photo-smiling-dietitian-white-coat-holding.jpg'  name="Doctor Name 4" department="View Profile" />
                </div>
            </div>
        </div>
        </>  
    );
}

export default DoctorsSection;