import axios from "axios";
import { useState ,useEffect} from "react";

function DoctorReview() {
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(''
  
);


useEffect(() => {
    axios(`https://retoolapi.dev/EBWb8G/Doctors/`)
        .then((res) => {
          const doctorInfo = res.data[0] 
          setDoctorInfo(doctorInfo);
        })
        .catch((err) => console.log(err));
  }, []);
  

  const handleNameChange = (event) => {
    const inputReview = event.target.value;
    setNewReview(inputReview);
  };

  const handleReview = async (event) => {
    event.preventDefault();
    const reviewData = {
      Rate: '⭐️⭐️⭐️',
      Review: newReview,
      User_id: 1,
      Doctor_id: doctorInfo.id,
      User_name: 'mahmoud',
      Doctor_Name: doctorInfo.name, // Assuming the name is stored in the 'name' field
    };
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
      setError(null);
    } catch (error) {
      console.error('Error posting review:', error);
      setError('Error posting review');
    }
  };
  

  return (
    <div className="col-12 border mt-4">
      <h5 className="text-start pt-3">Leave a review</h5>
      <p className="text-start">How was your experience with Dr. </p> 
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
