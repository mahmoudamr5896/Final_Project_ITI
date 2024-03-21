import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css"; // Import the CSS file for styling

const Reviews = ({id}) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(1); // Display only one review per page

  useEffect(() => {
    // Fetch reviews from the API
    axios.get("http://127.0.0.1:8000/reviews-all/")
      .then(response => {
        const filteredDoctor = response.data.filter((doctor) => doctor.Doctor_id == id );
        setReviews(filteredDoctor);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  // Get current review
  const currentReview = reviews.find((_, index) => index === currentPage - 1);

  // Change page
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="reviews-container">
      <h5><span>Rev</span><span>iews</span></h5>
      {currentReview && (
        <div className="review">
          <div className="user">
            {/* Use doctor's profile image or a placeholder if not available */}
            {/* <img src={currentReview.doctor_image || "https://example.com/placeholder.jpg"} alt="User Avatar" /> */}
            <div>
              <span className="patient-name">From:{currentReview.User_Name}</span>
            </div>
          </div>
          <div className="rating">Rating:⭐️ {currentReview.Rate} </div>
          <div className="comment">Comment: "{currentReview.Review}"</div>
        </div>
      )}
      {/* Pagination */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === reviews.length}>Next</button>
      </div>
    </div>
  );
};

export default Reviews;