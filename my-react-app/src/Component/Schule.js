import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorScheduleForm({ doctorId }) {

  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [editingScheduleItemId, setEditingScheduleItemId] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
      .then(response => {
        setDoctorSchedule(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor schedule:', error);
      });
  }, [doctorSchedule]);


  const storedId = localStorage.getItem('userData');
  const userDatas = JSON.parse(storedId);
  const getNext10Days = () => {
    const today = new Date();
    const next10Days = [];
    for (let i = 1; i <= 10; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const formattedDate = nextDay.toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const dayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' }); // Get day name
      next10Days.push({ date: formattedDate, day: dayName });
    }
    return next10Days;
  };
const User_id = userDatas.id
  const next10Days = getNext10Days();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!startTime || !endTime) {
      alert('Please select both start and end times.');
      return;
    }

    const scheduleData = {
      day: selectedDay,
      start_time: startTime,
      end_time: endTime, 
     doctor: userDatas.id

    };

    if (editingScheduleItemId) {
      // If editing a schedule item, update it instead of adding a new one
      axios.put(`http://127.0.0.1:8000/availabilities/${editingScheduleItemId}/`, scheduleData)
        .then(response => {
          console.log('Schedule item updated successfully:', response.data);
          setEditingScheduleItemId(null); // Clear the editing schedule item ID
          // Fetch the updated doctor's schedule after updating
          axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
            .then(response => {
              setDoctorSchedule(response.data);
            })
            .catch(error => {
              console.error('Error fetching doctor schedule after update:', error);
            });
        })
        .catch(error => {
          console.error('Error updating schedule item:', error);
        });
    } else {
      // If not editing, add a new schedule item
      axios.post(`http://127.0.0.1:8000/availabilities/`, scheduleData)
        .then(response => {
          console.log('Schedule item added successfully:', response.data);
          // Fetch the updated doctor's schedule after addition
          axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
            .then(response => {
              setDoctorSchedule(response.data);
            })
            .catch(error => {
              console.error('Error fetching doctor schedule after addition:', error);
            });
        })
        .catch(error => {
          console.error('Error adding schedule item:', error);
        });
    }

    // Reset form fields after submission
    setSelectedDay('');
    setStartTime('');
    setEndTime('');
  };
  

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/availabilities/${id}/`)
      .then(response => {
        console.log('Schedule item deleted successfully:', id);
        // Fetch the updated doctor's schedule after deletion
        axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
          .then(response => {
            setDoctorSchedule(response.data);
          })
          .catch(error => {
            console.error('Error fetching doctor schedule after deletion:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting schedule item:', error);
      });
  };

  const handleEdit = (id) => {
    // Find the schedule item to be edited based on its ID
    const scheduleItemToEdit = doctorSchedule.find(item => item.id === id);
    if (scheduleItemToEdit) {
      // Populate the form fields with the data of the schedule item to be edited
      setSelectedDay(scheduleItemToEdit.day);
      setStartTime(scheduleItemToEdit.start_time);
      setEndTime(scheduleItemToEdit.end_time);
      // Set the ID of the editing schedule item
      setEditingScheduleItemId(id);
    }}
  return (
<div className="container doctor-schedule-form">
  {userDatas && userDatas.role === 'Doctor' && User_id === doctorId && (
 <form onSubmit={handleSubmit} className="schedule-form">
 <div className="row">
   <div className="col-md-4">
     <div className="form-group">
       <label htmlFor="day">Day:</label>
       <select
         id="day"
         value={selectedDay}
         onChange={(e) => setSelectedDay(e.target.value)}
         className="form-control"
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
   </div>
   <div className="col-md-4">
     <div className="form-group">
       <label htmlFor="startTime">Start Time:</label>
       <input
         type="time"
         id="startTime"
         className="form-control"
         value={startTime}
         onChange={(e) => setStartTime(e.target.value)}
         required
       />
     </div>
   </div>
   <div className="col-md-4">
     <div className="form-group">
       <label htmlFor="endTime">End Time:</label>
       <input
         type="time"
         id="endTime"
         className="form-control"
         value={endTime}
         onChange={(e) => setEndTime(e.target.value)}
         required
       />
     </div>
   </div>
 </div>
 <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Save</button>
</form>

  )}
  <div className="container">
    <div className="row">
      <div className="col">
        <h2 className="mt-4 mb-3">Doctor's Schedule</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                {userDatas && userDatas.role === 'Doctor' && User_id === doctorId && (
<>   <th>Edit</th>
                <th>Delete</th>
</>)}
             
              </tr>
            </thead>
            <tbody>
              {doctorSchedule.map((scheduleItem, index) => (
                <tr key={index}>
                  <td>{scheduleItem.day}</td>
                  <td>{scheduleItem.start_time}</td>
                  <td>{scheduleItem.end_time}</td>
                  {userDatas && userDatas.role === 'Doctor' && User_id === doctorId && (
                    <>       <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => handleEdit(scheduleItem.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(scheduleItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                    </>
                  )}
           
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default DoctorScheduleForm;

    // <div className="doctor-schedule-form">
    //   {userDatas && userDatas.role === 'Doctor' && (
    //     <form onSubmit={handleSubmit} className="schedule-form">
    //       <table>
    //         <tbody>
    //           <tr>
    //             <td>
    //               <div className="form-group">
    //                 <label htmlFor="day">Day:</label>
    //                 <select
    //                   id="day"
    //                   value={selectedDay}
    //                   onChange={(e) => setSelectedDay(e.target.value)}
    //                   required
    //                 >
    //                   <option value="">Select Day</option>
    //                   {next10Days.map((day, index) => (
    //                     <option key={index} value={day}>
    //                       {day}
    //                     </option>
    //                   ))}
    //                 </select>
    //               </div>
    //             </td>
    //             <td>
    //               {/* Your code for other form inputs... */}
    //             </td>
    //           </tr>
    //           {/* Your code for other form elements... */}
    //         </tbody>
    //       </table>
    //     </form>
    //   )}
    //   {/* Your code for displaying the doctor's schedule... */}
    // </div>
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function DoctorScheduleForm({ doctorId }) {
//   const [selectedDay, setSelectedDay] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [doctorSchedule, setDoctorSchedule] = useState([]);
//   const [editingScheduleItemId, setEditingScheduleItemId] = useState(null);
//   const handleSubmit = (event) => {
  //   event.preventDefault();
 {/* <div className="form-group">
            <label htmlFor="day">Day:</label>
            <select
              id="day"
              className="form-control"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <option value="">Select Day</option>
              {next10Days.map((day, index) => (
                <option key={index} value={day.date}>
                  {day.date} ({day.day})
                </option>
              ))}
            </select>
          </div> */}
  //   if (!startTime || !endTime) {
  //     alert('Please select both start and end times.');
  //     return;
  //   }

  //   const scheduleData = {
  //     doctor: User_id,
  //     day: selectedDay,
  //     start_time: startTime,
  //     end_time: endTime
  //   };

  //   if (editingScheduleItemId) {
  //     // If editing a schedule item, update it instead of adding a new one
  //     axios.put(`http://127.0.0.1:8000/availabilities/${editingScheduleItemId}/`, scheduleData)
  //       .then(response => {
  //         console.log('Schedule item updated successfully:', response.data);
  //         setEditingScheduleItemId(null); // Clear the editing schedule item ID
  //         // Fetch the updated doctor's schedule after updating
  //         axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
  //           .then(response => {
  //             setDoctorSchedule(response.data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching doctor schedule after update:', error);
  //           });
  //       })
  //       .catch(error => {
  //         console.error('Error updating schedule item:', error);
  //       });
  //   } else {
  //     // If not editing, add a new schedule item
  //     axios.post(`http://127.0.0.1:8000/availabilities/`, scheduleData)
  //       .then(response => {
  //         console.log('Schedule item added successfully:', response.data);
  //         // Fetch the updated doctor's schedule after addition
  //         axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
  //           .then(response => {
  //             setDoctorSchedule(response.data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching doctor schedule after addition:', error);
  //           });
  //       })
  //       .catch(error => {
  //         console.error('Error adding schedule item:', error);
  //       });
  //   }

  //   // Reset form fields after submission
  //   setSelectedDay('');
  //   setStartTime('');
  //   setEndTime('');
  // };
//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
//       .then(response => {
//         setDoctorSchedule(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching doctor schedule:', error);
//       });
//   }, [doctorId]);

//   const storedId = sessionStorage.getItem('userData');
//   const userDatas = JSON.parse(storedId);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!startTime || !endTime) {
//       alert('Please select both start and end times.');
//       return;
//     }

//     const scheduleData = {
//       doctor: userDatas.id,
//       day: selectedDay,
//       start_time: startTime,
//       end_time: endTime
//     };

//     if (editingScheduleItemId) {
//       // If editing a schedule item, update it instead of adding a new one
//       axios.put(`http://127.0.0.1:8000/availabilities/${editingScheduleItemId}/`, scheduleData)
//         .then(response => {
//           console.log('Schedule item updated successfully:', response.data);
//           setEditingScheduleItemId(null); // Clear the editing schedule item ID
//           // Fetch the updated doctor's schedule after updating
//           axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
//             .then(response => {
//               setDoctorSchedule(response.data);
//             })
//             .catch(error => {
//               console.error('Error fetching doctor schedule after update:', error);
//             });
//         })
//         .catch(error => {
//           console.error('Error updating schedule item:', error);
//         });
//     } else {
//       // If not editing, add a new schedule item
//       axios.post(`http://127.0.0.1:8000/availabilities/`, scheduleData)
//         .then(response => {
//           console.log('Schedule item added successfully:', response.data);
//           // Fetch the updated doctor's schedule after addition
//           axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
//             .then(response => {
//               setDoctorSchedule(response.data);
//             })
//             .catch(error => {
//               console.error('Error fetching doctor schedule after addition:', error);
//             });
//         })
//         .catch(error => {
//           console.error('Error adding schedule item:', error);
//         });
//     }

//     // Reset form fields after submission
//     setSelectedDay('');
//     setStartTime('');
//     setEndTime('');
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://127.0.0.1:8000/availabilities/${id}/`)
//       .then(response => {
//         console.log('Schedule item deleted successfully:', id);
//         // Fetch the updated doctor's schedule after deletion
//         axios.get(`http://127.0.0.1:8000/availabilities/?doctor=${doctorId}`)
//           .then(response => {
//             setDoctorSchedule(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching doctor schedule after deletion:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error deleting schedule item:', error);
//       });
//   };

//   const handleEdit = (id) => {
//     // Find the schedule item to be edited based on its ID
//     const scheduleItemToEdit = doctorSchedule.find(item => item.id === id);
//     if (scheduleItemToEdit) {
//       // Populate the form fields with the data of the schedule item to be edited
//       setSelectedDay(scheduleItemToEdit.day);
//       setStartTime(scheduleItemToEdit.start_time);
//       setEndTime(scheduleItemToEdit.end_time);
//       // Set the ID of the editing schedule item
//       setEditingScheduleItemId(id);
//     }
//   };

//   return (
//     <div className="doctor-schedule-form">
//       {userDatas && userDatas.role === 'Doctor' && (
//         <form onSubmit={handleSubmit} className="schedule-form">
//           <table>
//             <tbody>
//               <tr>
//                 <td>
//                   <div className="form-group">
//                     <label htmlFor="day">Day:</label>
//                     <select
//                       id="day"
//                       value={selectedDay}
//                       onChange={(e) => setSelectedDay(e.target.value)}
//                       required
//                     >
//                       <option value="">Select Day</option>
//                       <option value="Monday">Monday</option>
//                       <option value="Tuesday">Tuesday</option>
//                       <option value="Wednesday">Wednesday</option>
//                       <option value="Thursday">Thursday</option>
//                       <option value="Friday">Friday</option>
//                       <option value="Saturday">Saturday</option>
//                       <option value="Sunday">Sunday</option>
//                     </select>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="form-group">
//                     <label htmlFor="startTime">Start Time:</label>
//                     <input
//                       type="time"
//                       id="startTime"
//                       value={startTime}
//                       onChange={(e) => setStartTime(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <div className="form-group">
//                     <label htmlFor="endTime">End Time:</label>
//                     <input
//                       type="time"
//                       id="endTime"
//                       value={endTime}
//                       onChange={(e) => setEndTime(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </td>
//               </tr>
//               <button type="submit" className="btn-submit">Save</button>
//             </tbody>
//           </table>
//         </form>
//       )}
//       <div className="container">
//         <div className="row" style={{ width: '800px' }}>
//           <div className="col">
//             <h2 className="mt-4 mb-3">Doctor's Schedule</h2>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Day</th>
//                   <th>Start Time</th>
//                   <th>End Time</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {doctorSchedule.map((scheduleItem, index) => (
//                   <tr key={index}>
//                     <td>{scheduleItem.day}</td>
//                     <td>{scheduleItem.start_time}</td>
//                     <td>{scheduleItem.end_time}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-primary me-1"
//                         onClick={() => handleEdit(scheduleItem.id)}
//                       >
//                         Edit
//                       </button>
//                       </td>
//                       <td>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleDelete(scheduleItem.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorScheduleForm;


// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function DoctorScheduleForm() {
// //   // Define initial state for the schedule
// //   const [selectedDay, setSelectedDay] = useState('');
// //   const [startTime, setStartTime] = useState('');
// //   const [endTime, setEndTime] = useState('');
// //   const storedId = sessionStorage.getItem('userData') ;
// //   const userDatas = JSON.parse(storedId); 
// //   // Handle form submission
// //   console.log(userDatas.id)
// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     // Check if both start and end times are selected
// //     if (!startTime || !endTime) {
// //       alert('Please select both start and end times.');
// //       return;
// //     }

// //     // Post the schedule data for the selected day
// //     axios.post(`http://127.0.0.1:8000/availabilities/`, {
// //       doctor: userDatas.id,
// //       day: selectedDay,
// //       start_time: startTime,
// //       end_time: endTime
// //     })
// //     .then(response => {
// //       console.log('Schedule saved successfully:', response.data);
// //       // Optionally, you can redirect the doctor to another page or perform other actions upon successful submission
// //     })
// //     .catch(error => {
// //       console.error('Error saving schedule:', error);
// //       // Handle error if necessary
// //     });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div>
// //         <label htmlFor="day">Day:</label>
// //         <select
// //           id="day"
// //           value={selectedDay}
// //           onChange={(e) => setSelectedDay(e.target.value)}
// //           required
// //         >
// //           <option value="">Select Day</option>
// //           <option value="Monday">Monday</option>
// //           <option value="Tuesday">Tuesday</option>
// //           <option value="Wednesday">Wednesday</option>
// //           <option value="Thursday">Thursday</option>
// //           <option value="Friday">Friday</option>
// //           <option value="Saturday">Saturday</option>
// //           <option value="Sunday">Sunday</option>
// //         </select>
// //       </div>
// //       <div>
// //         <label htmlFor="startTime">Start Time:</label>
// //         <input
// //           type="time"
// //           id="startTime"
// //           value={startTime}
// //           onChange={(e) => setStartTime(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor="endTime">End Time:</label>
// //         <input
// //           type="time"
// //           id="endTime"
// //           value={endTime}
// //           onChange={(e) => setEndTime(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <button type="submit">Save Schedule</button>
// //     </form>
// //   );
// // }

// // export default DoctorScheduleForm;
