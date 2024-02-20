import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewSection({ doctorId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`https://retoolapi.dev/NJuvHL/Reviews?Doctor_id=${doctorId}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [doctorId]);

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`https://retoolapi.dev/NJuvHL/Reviews/${reviewId}`)
      .then(response => {
        console.log('Review deleted successfully:', response.data);
        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  //_____________________________________
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from session storage
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div className="container border mt-5">
      {reviews.map(review => (
        <div className="d-flex justify-content-center row" key={review.id}>
          <div className="col-md-8">
            <div className="d-flex flex-column comment-section">
              <div className="bg-white p-2">
                <h6>{review.Uswer_Name}</h6>
                <div className="d-flex flex-row user-info">    
                  <div className="d-flex flex-column justify-content-center ml-2">
                    <span className="date text-black-50">{review.Rate}</span>
                    <span className="d-block font-weight-bold name">{review.Review}</span>
                    <span className="date text-black-50">{review.date}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="comment-text">{review.comment}</p>
                  {userData && userData.role === 'doctor' && (
                  <button className="btn btn-danger" onClick={() => handleDeleteReview(review.id)}>Delete</button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewSection;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ReviewSection() {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     axios.get('https://retoolapi.dev/MborCQ/Reviews')
//       .then(response => {
//         setReviews(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching reviews:', error);
//       });
//   }, []);

//   return (

//     <div className="container justify-content-start  mt-5">
//       {reviews.map(review => (
//         <div className="d-flex border  row m-2" key={review.id}>
//           <div className="col-md-8">
//             <div className="d-flex flex-column comment-section">
//               <div className="bg-white p-2">
//                 <div className="d-flex flex-row user-info">
//                   {/* You can add the user avatar here if available */}
//                   <div className="d-flex flex-column justify-content-start ml-2">
//                     <span className="date text-black-50">{review.Rate}</span>
//                     <span className="d-block font-weight-bold name">{review.Review}</span>
//                     <span className="date text-black-50">{review.date}</span>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <p className="comment-text">{review.UserName}</p>
//                 </div>
//               </div>
//               <div className="bg-white">
//                 <div className="d-flex flex-row fs-12">
//                   {/* You can add like functionality here if needed */}
//                   {/* <div className="like p-2 cursor">
//                     <i class="fa-solid fa-thumbs-up fa-lg"></i>
//                     <span className="ml-1">Like</span>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ReviewSection;
