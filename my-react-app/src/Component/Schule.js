import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorScheduleForm({doctorId}) {
  // Define initial state for the schedule
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [doctorSchedule, setDoctorSchedule] = useState([]);

  useEffect(() => {
    // Fetch the doctor's schedule
    axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
      .then(response => {
        setDoctorSchedule(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor schedule:', error);
      });
  }, [doctorSchedule]);

  const storedId = sessionStorage.getItem('userData');
  const userDatas = JSON.parse(storedId);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if both start and end times are selected
    if (!startTime || !endTime) {
      alert('Please select both start and end times.');
      return;
    }

    // Post the schedule data for the selected day
    axios.post(`http://127.0.0.1:8000/availabilities/`, {
      doctor: userDatas.id,
      day: selectedDay,
      start_time: startTime,
      end_time: endTime
    })
      .then(response => {
        console.log('Schedule saved successfully:', response.data);
        // Optionally, you can redirect the doctor to another page or perform other actions upon successful submission
      })
      .catch(error => {
        console.error('Error saving schedule:', error);
        // Handle error if necessary
      });
  };

  return (
    <div className="doctor-schedule-form">
      {userDatas && userDatas.role === 'Doctor' && (<form onSubmit={handleSubmit} className="schedule-form">
        <table>
            <tr>
        <td>
        <div className="form-group">
          <label htmlFor="day">Day:</label>
          <select
            id="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        </td>
            <td>  
            <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

            </td>
          <td>
          <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
          </td>
            </tr>
            <button type="submit" className="btn-submit">Save</button>
        </table>
      </form>
        )}
      <div className="container">

  <div className="row" style={{width:'800px'}}>
    <div className="col">
      <h2 className="mt-4 mb-3">Doctor's Schedule</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {doctorSchedule.map((scheduleItem, index) => (
            <tr key={index}>
              <td>{scheduleItem.day}</td>
              <td>{scheduleItem.start_time}</td>
              <td>{scheduleItem.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

</div>

    </div>
  );
}

export default DoctorScheduleForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// function DoctorScheduleForm() {
//   // Define initial state for the schedule
//   const [selectedDay, setSelectedDay] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const storedId = sessionStorage.getItem('userData') ;
//   const userDatas = JSON.parse(storedId); 
//   // Handle form submission
//   console.log(userDatas.id)
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Check if both start and end times are selected
//     if (!startTime || !endTime) {
//       alert('Please select both start and end times.');
//       return;
//     }

//     // Post the schedule data for the selected day
//     axios.post(`http://127.0.0.1:8000/availabilities/`, {
//       doctor: userDatas.id,
//       day: selectedDay,
//       start_time: startTime,
//       end_time: endTime
//     })
//     .then(response => {
//       console.log('Schedule saved successfully:', response.data);
//       // Optionally, you can redirect the doctor to another page or perform other actions upon successful submission
//     })
//     .catch(error => {
//       console.error('Error saving schedule:', error);
//       // Handle error if necessary
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="day">Day:</label>
//         <select
//           id="day"
//           value={selectedDay}
//           onChange={(e) => setSelectedDay(e.target.value)}
//           required
//         >
//           <option value="">Select Day</option>
//           <option value="Monday">Monday</option>
//           <option value="Tuesday">Tuesday</option>
//           <option value="Wednesday">Wednesday</option>
//           <option value="Thursday">Thursday</option>
//           <option value="Friday">Friday</option>
//           <option value="Saturday">Saturday</option>
//           <option value="Sunday">Sunday</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="startTime">Start Time:</label>
//         <input
//           type="time"
//           id="startTime"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="endTime">End Time:</label>
//         <input
//           type="time"
//           id="endTime"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Save Schedule</button>
//     </form>
//   );
// }

// export default DoctorScheduleForm;
