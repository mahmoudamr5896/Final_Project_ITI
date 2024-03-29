import axios from "axios";
import { useState ,useEffect} from "react";
function DoctorReview({ doctor , User }) {
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);

 if(User & doctor){
  setError('Please Log in First')
 }

  const handleNameChange = (event) => {
    const inputReview = event.target.value;
    setNewReview(inputReview);
  };

  const handleReview = async (event) => {

    event.preventDefault();
    const stars = '⭐️'.repeat(selectedRating);
    const reviewData = {
      Rate: stars,
      Review: newReview,
      User_id: User.id,
      Doctor_id: doctor.id,
      User_name: User.name,
      Doctor_Name: doctor.name, // Assuming the name is stored in the 'name' field
    };

    if (newReview.length < 10 || /^\d/.test(newReview)) {
      setError('Review must be at least 10 characters long and cannot start with a number');
      return;
    }

    const apiKey = 'id';
    console.log(reviewData);
    try {
      const response = await axios.post('https://retoolapi.dev/NJuvHL/Reviews', reviewData, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      console.log('Review posted successfully:', response.data);
      setNewReview('');
      setSelectedRating(0);
      setError(null);
    } catch (error) {
      console.error('Error posting review:', error);
      setError('Error posting review');
    }
  };
  
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.......
  const [selectedRating, setSelectedRating] = useState(0);
  // const handleChange_rate = (event) => {
  //   const rating = parseInt(event.target.getAttribute('name'));
  //   setSelectedRating(rating);
  // };
  const handleChange_rate = (event) => {
    const rating = parseInt(event.target.getAttribute('name'));
    if (rating === 5) {
      setSelectedRating(5); 
    } else {
      setSelectedRating(rating);
    }
  };

  return (
    <div className="col-12 border mt-4">
      <style>
        {`
 .star-container {
  margin-top: 1rem;
}

.star {
  font-size: 1.5rem;
  color: gray;
  cursor: pointer;
}

.star.checked {
  color: gold;
}
        `}
      </style>
      <h5 className="text-start pt-3">Leave a review</h5>
      <div className="mt-4">
      <i className={`fas fa-star star ${selectedRating >= 1 ? 'checked' : ''}`} name='1' onClick={handleChange_rate}></i>
  <i className={`fas fa-star star ${selectedRating >= 2 ? 'checked' : ''}`} name='2' onClick={handleChange_rate}></i>
  <i className={`fas fa-star star ${selectedRating >= 3 ? 'checked' : ''}`} name='3' onClick={handleChange_rate}></i>
  <i className={`fas fa-star star ${selectedRating >= 4 ? 'checked' : ''}`} name='4' onClick={handleChange_rate}></i>
  <i className={`fas fa-star star ${selectedRating >= 5 ? 'checked' : ''}`} name='5' onClick={handleChange_rate}></i><br/>
        <p>You rated {selectedRating} star{selectedRating !== 1 ? 's' : ''}</p>
      </div>
      <p className="text-start">How was your experience with Dr.{doctor.name} </p> 
      <div className="d-flex pb-4">
        <input
          className="form-control me-2"
          type="text"
          onChange={handleNameChange}
          placeholder="Leave Review ..."
          value={newReview}
        />
        <button className="btn btn-success rounded-pill" onClick={handleReview}>
          Continue
        </button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default DoctorReview;
