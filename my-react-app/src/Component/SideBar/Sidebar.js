import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCalendarAlt, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import author1 from "../img/author1.jpg"; // Import the logo image
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorId = new URLSearchParams(window.location.search).get('doctor_id'); // Get doctor ID from URL param
        if (doctorId) {
          const response = await axios.get(`https://retoolapi.dev/EBWb8G/Doctors`);
          const doctors = response.data;
          const matchedDoctor = doctors.find(doctor => doctor.id === parseInt(doctorId));
          if (matchedDoctor) {
            setDoctorInfo(matchedDoctor);
          } else {
            console.error('Doctor not found with ID:', doctorId);
          }
        }
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    };
  
    fetchDoctorInfo();
  }, []);
  



  // Logout function
  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('userData');
    history.push('/');
  };

  return (
    <div>
      <div className="sidebar" style={{height:"145vh"}}>
        <div>
          {doctorInfo && (
            <div className="doctor-info">
              <div className="doctor-image-container">
                <img src={author1} alt="Logo" className="doctor-image" style={{ borderRadius: "50%", width: "30%" }} />
              </div>
              <div className="doctor-name">
                <span
                  style={{
                    color: "#3BA93E",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    padding: "5px"
                  }}
                >
                  DR / {doctorInfo.Doctor_Name}
                </span>
                {/* <div style={{color:"#3BA93E"}}>{doctorInfo.Location}</div> */}
                <hr />
              </div>
            </div>
          )}
        </div>
        <ul>
          <li>
            <FontAwesomeIcon icon={faHome} className="barIcon" />
            <Link to="/" className="barLink">Home</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faChartBar} className="barIcon" />
            <Link to="/dashboard" className="barLink">Dashboard</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendarAlt} className="barIcon" />
            <Link to="/appointments" className="barLink">Appointments</Link>
          </li>

          {doctorInfo && (
            <li>
              <FontAwesomeIcon icon={faUser} className="barIcon" />
              <Link to={`/profile/${doctorInfo.id}`} className="barLink">Profile</Link>
            </li>
          )}

        
          {/* <li>
            <FontAwesomeIcon icon={faSignOutAlt} className="barIcon" />
            <button className="barLink" onClick={logoutHandler}>Log out</button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
