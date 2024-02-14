import React from 'react';
import StarRating from '../Component/Rate';

const DoctorProfileCard = ({ props }) => {
    return (
        <div className="d-flex flex-row border mb-2 p-5 align-items-center">
            <img src="https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg" height="160" width="100" />
            <div className='bg-dark' style={{ width: '300px', position: '' }}>
                <h5 className='row'>DR.{props.d_name}</h5>
                <h6 >Medical Family</h6>
                <h6 >Ex:7years</h6>
                <StarRating />
                <span style={{ position: 'absolute' }}>Bio: Headings must have content and the content must be accessible by a screen reader</span>
            </div>
            <div className="d-flex flex-column ms-2 flex-grow-1">
                <h6 className="ml-1 text-primary"></h6>
                <h6 className="mb-1">
                </h6>
                <ul>
                    <p>

                    </p>
                </ul>
            </div>
            <div className="ml-auto" style={{ width: '150px' }}>
                <button className="btn btn-primary"> View Profile </button>
                <button className="btn btn-danger m-2">{props.d_Phone}</button>

            </div>
        </div>
    );
}

export default DoctorProfileCard;
