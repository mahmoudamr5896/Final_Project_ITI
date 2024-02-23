import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function ReviewForm({ doctorInfo }) {
const[doctor,Setdoctor]=useState('')
    useEffect(() => {
        if (doctorInfo) {
          axios
            .get(`https://retoolapi.dev/NJuvHL/Reviews?Doctor_id=${doctorInfo}`)
            .then(response => {
              Setdoctor(response.data);
            })
            .catch(error => {
              console.error('Error fetching reviews:', error);
            });
        }
      }, [doctorInfo]);
  const [newReview, setNewReview] = useState('');
  const handleNameChange = (e) => {
    setNewReview(e.target.value);
  };
//________________________________________________________

const storedId = sessionStorage.getItem('userData') ;
const userDatas = JSON.parse(storedId);
if(userDatas){
    var User_id = userDatas.id;
}


// handle posting a review // handell review 
const handleReview = (event) => {
event.preventDefault();
 const reviewData = {
      "Rate": "⭐️⭐️⭐️",
      "Review": newReview,
      "User_id": User_id,
      "Doctor_id": doctor.id,
      "User_name": "mahmoud",
      "Doctor_Name": doctor.Doctor_Name
    };
    axios
    .post('https://retoolapi.dev/NJuvHL/Reviews', reviewData)
      .then(response => {
        console.log('Review posted successfully:', response.data);
        setNewReview('')
      })
      .catch(error => {
        console.error('Error posting review:', error);
      });
  };
//___

  return (
    <div className="col-12 border mt-4">
      <h5 className="text-start pt-3">Leave a review</h5>
      <p className="text-start">How was your experience with Dr. {doctorInfo.Doctor_Name}</p>
      <div className="d-flex pb-4">
        <input
          className="form-control me-2"
          type="text"
          onChange={handleNameChange}
          placeholder="Leave Review ..."
          value={newReview}
        />
        <button
          className="btn btn-success rounded-pill"
          onClick={handleReview}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ReviewForm;
