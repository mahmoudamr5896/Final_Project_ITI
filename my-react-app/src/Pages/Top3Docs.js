import React from "react";
import Title from "../Components/Title";
import BrandExample from "../Components/Header";
import BasicExample from "../Components/Card";
import '../CSS/CardCustom.css';

function TopDocs() {
  const doctors = [
    { id: 1, title: "Doctor 1", text: "Information about Doctor 1", imageUrl: "1612301517364-removebg-preview.png" },
    { id: 2, title: "Doctor 2", text: "Information about Doctor 2", imageUrl: "l-intro-1665362629-removebg-preview.png" },
    { id: 3, title: "Doctor 3", text: "Information about Doctor 3", imageUrl: "image-removebg-preview.png" }
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
