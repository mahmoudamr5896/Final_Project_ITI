import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCalendarAlt, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import author1 from "../img/author1.jpg"; // Import the logo image
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector  } from 'react-redux';
import { addAppiontment } from '../../Store/Actions/ActionAppointment';
const Sidebar = ({id}) => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const history = useHistory(); // Initialize useHistory
  // console.log(id)
  const dispatch = useDispatch()
  const yourData = useSelector(state => state.data.data);
  
useEffect(() => {
  axios.get('http://127.0.0.1:8000/doctors/')
    .then((response) => {
      const filteredDoctor = response.data.filter((doctor) => doctor.id == id );
      setDoctorInfo(filteredDoctor[0]);
      // console.log(filteredDoctor)
    })
    .catch((error) => {
      console.error('Error fetching doctor info:', error);
    });
}, [yourData]);
// console.log(doctorInfo)
  // Logout function
  const logoutHandler = (e) => {
    e.preventDefault();
    // sessionStorage.removeItem('userData');
    history.push('/');
  };
// console.log(doctorInfo)
  return (
    <div>
      <div className="sidebar" style={{height:"98vh"}}>
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
                  DR / {doctorInfo.name}
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
              <Link to={`/profile/${id}`} className="barLink">Profile</Link>
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
 // useEffect(() => {
  //   const fetchDoctorInfo = async () => {
  //     try {
  //       const doctorId = localStorage.getItem('doctorId');
  //       if (doctorId) {
  //         const response = await axios.get(`https://retoolapi.dev/EBWb8G/Doctors?id=${id}`);
  //         const doctors =response.data ;
  //         setDoctorInfo(response.data);
  //         const matchedDoctor = doctors.find(doctor => doctor.id === parseInt(doctorId));
  //         if (matchedDoctor) {
            
  //         } else {
  //           console.error('Doctor not found with ID:', doctorId);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching doctor info:', error);
  //     }
  //   };

  //   fetchDoctorInfo();
  // }, []);
  
  