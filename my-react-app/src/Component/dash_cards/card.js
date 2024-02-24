import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./card.css";
import axios from "axios";
const Cards = ({id}) => {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  // useEffect(() => {
  //   const doctorId = localStorage.getItem('doctorId');
  //   if (doctorId) {
  //     axios.get(`https://retoolapi.dev/ornM79/Appointment`)
  //       .then(response => {
  //         const doctorAppointments = response.data.filter(appointment => appointment.Doctot_id === doctorId);
  //         setAppointmentsCount(doctorAppointments.length);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching appointments:', error);
  //       });


  //     axios.get(`https://retoolapi.dev/NJuvHL/Reviews`)
  //       .then(response => {
  //         const doctorReviews = response.data.filter(review => review.Doctor_id === doctorId);
  //         setReviewsCount(doctorReviews.length);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching reviews:', error);
  //       });
  //   }
  // }, []);

  axios.get(`https://retoolapi.dev/2jV2W1/Appointment?Doctor_Id=${id}`)
  .then(response => {
    const numberOfAppointments = response.data.length;
     setAppointmentsCount(numberOfAppointments)
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });

  axios.get(`https://retoolapi.dev/NJuvHL/Reviews?Doctor_id=${id}`)
  .then(response => {
    const numberOfAppointments = response.data.length;
     setReviewsCount(numberOfAppointments)
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });

  return (
    <div>
      <div className="cards">
        <div className="Dash_cards">
          <div className="icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h2 style={{ color: "white" }}>Appointments</h2>
          <h3 style={{color:"white"}}>{appointmentsCount}</h3>
          <p style={{ color: "white" }}>Number Of current Appointments </p>
        </div>
        <div className="Dash_cards">
          <div className="icon">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <h2 style={{ color: "white" }}>Ratings</h2>
          <h3 style={{color:"white"}}>{ reviewsCount}</h3>
          <p style={{ color: "white" }}> Number Of All Ratings</p>
          
        </div>
        <div className="Dash_cards">
          <div className="icon">
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <h2 style={{ color: "white" }}>Profit</h2>
          <p style={{ color: "white" }}>Net profit</p>
        </div>
        
      </div>
    </div>
  );
};

export default Cards;
