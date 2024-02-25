import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

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
//____Delete Review_____________________________________________________________________________________________
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
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); 
    }
  }, []);
//________________________________________________________________________________________________________
const[showModal,setshowModal]=useState(false)
const openEditModal=()=>{
setshowModal(false)
}
const [selectedRating, setSelectedRating] = useState(0);
const handleChange_rate = (event) => {
  const rating = parseInt(event.target.getAttribute('name'));
  setSelectedRating(rating);
};
const[newReview,setNewReview]=useState({})
const handleNameChange = (event) => {
  const inputReview = event.target.value;
  setNewReview(inputReview);
};

//--------------------------------------------------------------------------------------------------------
if(userData){
  var Id = (userData.id)
console.log(Id)
}
//______________________________________________________________________________________________________________
const [newReviewText, setNewReviewText] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [newRating, setNewRating] = useState(0);
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

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setNewReviewText(review.Review);
    setNewRating(review.Rate);
  };

  const handleUpdateReview = () => {
    if (!selectedReview) return;
     
    axios
      .put(`https://retoolapi.dev/NJuvHL/Reviews/${selectedReview.id}`, {
        Review: newReviewText,
        Rate: '⭐️'.repeat(newRating),
        Review: newReviewText,
        User_id: selectedReview.User_id,
        Doctor_id: selectedReview.Doctor_id,
        User_name: selectedReview.Uswer_Name,
        Doctor_Name: selectedReview.Doctor_Name,
      })
      .then(response => {
        console.log('Review updated successfully:', response.data);
        // Refresh reviews after update
        axios
          .get(`https://retoolapi.dev/NJuvHL/Reviews?Doctor_id=${doctorId}`)
          .then(response => {
            setReviews(response.data);
          })
          .catch(error => {
            console.error('Error fetching reviews:', error);
          });
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
    // Close the modal
    setSelectedReview(null);
    setNewReviewText('');
    setNewRating(0);
  };

  return (
    <div className="container  mt-5">
      {reviews.map(review => (
        <div className="d-flex justify-content-center row" key={review.id}>
          <div className="col-md-8 ">
            <div className="d-flex  border flex-column comment-section m-2">
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
                  {userData && userData.role === 'Patient' && Id === review.User_id &&  (
                    <>
                    <button className="btn btn-danger m-3" onClick={() => handleDeleteReview(review.id)}>Delete</button>
                    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"  data-bs-whatever="@mdo">Edit</button> */}
                     <button className="btn btn-warning m-3" onClick={() => handleEditReview(review)}>Edit</button>
                  {/* <button className="btn btn-warning m-3" onClick={() => openEditModal(review)}>Edit</button> */}
                    </>
                   )
                  }
              </div>
              </div>
            </div>
            {/* {showModal && ( */}
             {/* <div>
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Review</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form>
                          <div className="col-12 border mt-4">
                                <h5 className="text-start pt-3">Leave a review</h5>
                                <div className="mt-4">
                                  <i className={`fas fa-star ${selectedRating >= 1 ? 'checked' : ''}`} name='1' onClick={handleChange_rate}></i>
                                  <i className={`fas fa-star ${selectedRating >= 2 ? 'checked' : ''}`} name='2' onClick={handleChange_rate}></i>
                                  <i className={`fas fa-star ${selectedRating >= 3 ? 'checked' : ''}`} name='3' onClick={handleChange_rate}></i>
                                  <i className={`fas fa-star ${selectedRating >= 4 ? 'checked' : ''}`} name='4' onClick={handleChange_rate}></i>
                                  <i className={`fas fa-star ${selectedRating >= 5 ? 'checked' : ''}`} name='5' onClick={handleChange_rate}></i>
                                  <br/>
                                  <p>You rated {selectedRating} star{selectedRating !== 1 ? 's' : ''}</p>
                                </div>
                                <p className="text-start">How was your experience with Dr.{} </p> 
                                <div className="d-flex pb-4">
                                  <input
                                    className="form-control me-2"
                                    type="text"
                                    onChange={handleNameChange}
                                    placeholder="Leave Review ..."
                                    value={review}
                                  />
                                </div>
                              </div>


                        
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save Review</button>
                        </div>
                      </div>
                    </div>
                  </div>
             </div> */}
             {selectedReview && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editReviewModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editReviewModal">Edit Review</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedReview(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="reviewText" className="form-label">Review Text</label>
                  <textarea className="form-control" id="reviewText" value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">Rating</label>
                  <input type="number" className="form-control" id="rating" value={newRating} onChange={(e) => setNewRating(e.target.value)}></input>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedReview(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateReview}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
                   )}
            {/* )} */}
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
