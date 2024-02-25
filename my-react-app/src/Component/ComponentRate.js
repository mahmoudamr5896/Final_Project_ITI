import React, { useState } from 'react';
import axios from "axios";
function ReviewComponent({ doctorInfo }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const[NewReview,setNewReview]=useState({})

  const handleChange_rate = (event) => {
    const rating = parseInt(event.target.getAttribute('name'));
    setSelectedRating(rating);
  };
    console.log(selectedRating)
    const handleReview = (event) => {
      event.preventDefault();
    
      // Convert the selected rating to the desired representation
      const stars = '⭐️'.repeat(selectedRating);
    
      // Prepare the review data object with the selected rating
      const reviewData = {
        "Rate": stars
      };
    
      // Send the POST request to the API with the review data
      axios.post('https://retoolapi.dev/NJuvHL/Reviews', reviewData)
        .then(response => {
          console.log('Review posted successfully:', response.data);
          // Clear the selected rating after posting the review
          setSelectedRating(0);
        })
        .catch(error => {
          console.error('Error posting review:', error);
        });
    };

  // const handleReview = (event) => {
  //   event.preventDefault();
  //    const reviewData = {
  //         "Rate": ('⭐️' * selectedRating )
  //       };
  //       axios
  //       .post('https://retoolapi.dev/NJuvHL/Reviews', reviewData)
  //         .then(response => {
  //           console.log('Review posted successfully:', response.data);
  //           setNewReview('')
  //         })
  //         .catch(error => {
  //           console.error('Error posting review:', error);
  //         });
  //     };
    
  return (

    <div className="col-6 border">
      <p className="pt-3">Leave Review</p>
      <hr />
      <>
        How likely are you to recommend
        <br />
        Dr.{doctorInfo.name}
      </>
      <br />
      <div className="mt-4">
        <i className={`fas fa-star ${selectedRating >= 1 ? 'checked' : ''}`} name='1' onClick={handleChange_rate}></i>
        <i className={`fas fa-star ${selectedRating >= 2 ? 'checked' : ''}`} name='2' onClick={handleChange_rate}></i>
        <i className={`fas fa-star ${selectedRating >= 3 ? 'checked' : ''}`} name='3' onClick={handleChange_rate}></i>
        <i className={`fas fa-star ${selectedRating >= 4 ? 'checked' : ''}`} name='4' onClick={handleChange_rate}></i>
        <i className={`fas fa-star ${selectedRating >= 5 ? 'checked' : ''}`} name='5' onClick={handleChange_rate}></i>
        <br />
      </div>
      <p>You rated {selectedRating} star{selectedRating !== 1 ? 's' : ''}</p>
      {/* <button onClick={handleReview}>Save</button> */}
    </div>

  );
}

export default ReviewComponent;
