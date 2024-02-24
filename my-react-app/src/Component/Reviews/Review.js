import React from "react";
import "./Review.css"; // Import the CSS file for styling

const Reviews = () => {


  
  return (
    <div className="reviews-container">
      
      <div className="review">
        <div className="user">
          <img src="https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg" alt="User Avatar" />
          <div>
            <span>John Doe</span>
            <p>Verified Buyer</p>
          </div>
        </div>
        <p className="comment">"Lorem ipsum dolor sit amet, m at convallis."</p>
      </div>
      <div className="review">
        <div className="user">
          <img src="https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg" alt="User Avatar" />
          <div>
            <span>John Doe</span>
            <p>Verified Buyer</p>
          </div>
        </div>
        <p className="comment">"Lorem ipsum dolor sit amet, coeget ipsum at convallis."</p>
      </div>
      
    </div>
  );
};

export default Reviews;
