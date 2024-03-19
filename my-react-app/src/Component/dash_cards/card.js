import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./card.css";
import axios from "axios";

const Cards = ({ id }) => {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    // Fetch appointments count
    axios.get(`http://127.0.0.1:8000/appointments/?Doctor_Id=${id}`)
      .then(response => {
        const numberOfAppointments = response.data.length;
        setAppointmentsCount(numberOfAppointments);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });

    // Fetch reviews count
    axios.get(`http://127.0.0.1:8000/reviews-all/?Doctor_id=${id}`)
      .then(response => {
        const numberOfReviews = response.data.length;
        setReviewsCount(numberOfReviews);
      })
      .catch(error => {
        console.error('Error fetching Reviews:', error);
      });
  }, [id]);

  return (
    <div>
      <div className="cards">
        <div className="Dash_cards">
          <div className="icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <h2 style={{ color: "white" }}>Appointments</h2>
          <h3 style={{ color: "white" }}>{appointmentsCount}</h3>
          <p style={{ color: "white" }}>Number Of current Appointments </p>
        </div>
        <div className="Dash_cards">
          <div className="icon">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <h2 style={{ color: "white" }}>Ratings</h2>
          <h3 style={{ color: "white" }}>{reviewsCount}</h3>
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