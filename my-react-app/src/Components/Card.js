import React from "react";
import Title from "../Components/Title";
import BrandExample from "../Components/Header";
import BasicExample from "../Components/Card";
import '../CSS/CardCustom.css';

function TopDocs() {
  const doctors = [
    { id: 1, title: "Doctor 1", phoneNumber: "123-456-7890", address: "123 Street, City, Country", text: "Information about Doctor 1", imageUrl: "1612301517364-removebg-preview.png" },
    { id: 2, title: "Doctor 2", phoneNumber: "987-654-3210", address: "456 Avenue, City, Country", text: "Information about Doctor 2", imageUrl: "l-intro-1665362629-removebg-preview.png" },
    { id: 3, title: "Doctor 3", phoneNumber: "555-555-5555", address: "789 Road, City, Country", text: "Information about Doctor 3", imageUrl: "image-removebg-preview.png" }
  ];

  return (
    <div className="top-docs-container">
      <BrandExample />
      <Title name="name">Top Three Rating Doctors</Title>
      <div className="card-container">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card-wrapper">
            <BasicExample
              title={doctor.title} 
              phoneNumber={doctor.phoneNumber} 
              address={doctor.address} 
              text={doctor.text}   
              imageUrl={doctor.imageUrl} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopDocs;
