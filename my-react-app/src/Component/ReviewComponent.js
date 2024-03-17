import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import Pagination from './Pagination';

function ReviewSection({ doctorId }) {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(3);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [error, setError] = useState(null);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://127.0.0.1:8000/reviews-all/?doctor_id=${doctorId}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [doctorId, currentPage, reviewsPerPage]);

  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`http://127.0.0.1:8000/reviews-all/${reviewId}/`)
      .then(response => {
        console.log('Review deleted successfully:', response.data);
        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (userData) {
    var Id = userData.id;
    console.log(Id);
  }

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://127.0.0.1:8000/reviews-all/?doctor_id=${doctorId}`)
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

    if (newReviewText.length < 10 || /^\d/.test(newReviewText)) {
      setError('The review cannot start with a number and must be at least 10 characters long.');
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/reviews-all/${selectedReview.id}/`, {
        Review: newReviewText,
        Rate: newRating,
      })
      .then(response => {
        console.log('Review updated successfully:', response.data);
        axios
          .get(`http://127.0.0.1:8000/reviews-all/?doctor_id=${doctorId}`)
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
    setSelectedReview(null);
    setNewReviewText('');
    setNewRating(0);
  };

  const openEditModal = () => {
    setshowModal(false);
  };

  const handleChange_rate = (event) => {
    const rating = parseInt(event.target.getAttribute('name'));
    setSelectedRating(rating);
  };

  const handleNameChange = (event) => {
    const inputReview = event.target.value;
    setNewReviewText(inputReview);
  };

  return (
    <div className="container mt-5">
      {reviews.map(review => (
        <div className="d-flex justify-content-center row" key={review.id}>
          <div className="col-md-8">
            <div className="d-flex border flex-column comment-section m-2">
              <div className="bg-white p-2">
                <h6 style={{ textAlign: 'center' }}>{review.User_Name}</h6>
                <div className="d-flex flex-row user-info" style={{ textAlign: 'center' }}>
                  <div className="d-flex flex-column justify-content-center ml-2">
                    <span className="date text-black-50" style={{ textAlign: 'center' }}>
                      {Array.from({ length: review.Rate }, (_, index) => (
                        <span key={index}>⭐️</span>
                      ))}
                    </span>
                    <span className="d-block font-weight-bold name" style={{ textAlign: 'center' }}>{review.Review}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="comment-text">{review.comment}</p>
                  {userData && userData.role === 'Patient' && Id === review.User_id && (
                    <Dropdown alignRight>
                      <Dropdown.Toggle style={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        float: 'right',
                        color: 'black',
                        top: '30px'
                      }} variant="link" id="dropdown-basic">
                        ...
                      </Dropdown.Toggle>

                      <style>
                        {`
                .dropdown-toggle::after {
                  display: none;
                }
              `}
                      </style>

                      <Dropdown.Menu>
                        <span>
                          <Dropdown.Item onClick={() => setDeleteConfirmation(true)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </Dropdown.Item>
                        </span>
                        <hr></hr>
                        <Dropdown.Item onClick={() => handleEditReview(review)}>
                          <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>

            {deleteConfirmation && (
              <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="deleteReviewModal" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteReviewModal">Delete Review</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => setDeleteConfirmation(false)}></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete this review?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirmation(false)}>Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => { handleDeleteReview(review.id); setDeleteConfirmation(false); }}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rating" className="form-label">New Rating</label>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`fas fa-star ${star <= newRating ? 'checked' : ''}`}
                            onClick={() => setNewRating(star)}
                          ></i>
                        ))}
                        <br />
                        <p>You rated {newRating} star{newRating !== 1 ? 's' : ''}</p>
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
          </div>
        </div>
      ))}
      {/* <Pagination
        currentPage={currentPage}
        // onPageChange={onPageChange}
        totalPages={Total} // Assuming you have the total pages available
      /> */}
    </div>
  );
}
export default ReviewSection;
