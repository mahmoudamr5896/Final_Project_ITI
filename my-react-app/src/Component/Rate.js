import React from 'react';

const StarRating = ({ rate }) => {
  const maxStars = 5;
  const filledStars = Math.round(rate);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= filledStars) {
        stars.push(<span key={i}  >&#11088;</span>);
      } else {
        stars.push(<span key={i}  >&#11088;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="star-rating" style={{color: "gold"}} >{renderStars()}</div>
  );

};

export default StarRating;
