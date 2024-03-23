import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./card.css";
import axios from "axios";
import { useDispatch,useSelector  } from 'react-redux';
import { addAppiontment } from '../../Store/Actions/ActionAppointment';
const Cards = ({ id }) => {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
// console.log(id)
const dispatch = useDispatch()
const yourData = useSelector(state => state.data.data);

  useEffect(() => {
    // Fetch appointments count
    axios.get('http://127.0.0.1:8000/appointments/')
    .then((response) => {
      const filteredDoctor = response.data.filter((doctor) => doctor.doctor == id && doctor.status != false);
      setAppointmentsCount(filteredDoctor.length);
      dispatch(addAppiontment(appointmentsCount));
    })
    .catch((error) => {
      console.error('Error fetching doctor info:', error);
    });

    // // Fetch reviews count
      axios.get('http://127.0.0.1:8000/reviews-all/')
      .then((response) => {
        const filteredDoctor = response.data.filter((doctor) => doctor.Doctor_id == id);
        setReviewsCount(filteredDoctor.length);
      })
      .catch((error) => {
        console.error('Error fetching doctor info:', error);
      });
  }, [yourData]);
// profit 
const [profit, setProfit] = useState(0);
useEffect(() => {
  const fetchPayments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/payments/?doctor_id=${id}`);
      const payments = response.data;
      const income = payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
      setProfit(income);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchPayments();
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
          <h3 style={{ color: "white" }}>{profit}</h3>
          <p style={{ color: "white" }}>Net profit</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;