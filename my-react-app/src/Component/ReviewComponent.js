import React from 'react';
import StarRating from './Rate';
const CommentSection = () => {

    return (
        <div className="container  border mt-5">
            <div className="d-flex justify-content-start row">
                <div className="col-md-8">
                    <div className="d-flex flex-column comment-section">
                        <div className="bg-white p-2">
                            <div className="d-flex flex-row user-info">
                                {/* <img className="rounded-circle" src="" width="40" alt="User" /> */}
                                <div className="d-flex flex-column justify-content-start ml-2">
                                <span className="date text-black-50"><StarRating/></span>

                                    <span className="d-block font-weight-bold name">Great Doctor </span>
                                    <span className="date text-black-50"></span>

                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="comment-text">Very encouraging!is an excellent doctor. Very knowledgeable and efficient. I felt comfortable in her presence and knew that she was quite capable. A very caring and empathetic doctor which is rare these days. Lucky to have her as my doctor.</p>
                            </div>
                        </div>
                        <div className="bg-white">
                            <div className="d-flex flex-row fs-12">
                                <div className="like p-2 cursor">
                                {/* <i class="fa-solid fa-thumbs-up fa-lg"></i>
                                <span className="ml-1">Like</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;
