import React, { useState } from 'react';
import StarRating from '../Component/Rate';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './CSS/list.css'
const DoctorProfileCard = ({ dname, dLocation, phone ,id ,rate ,Bio ,date ,image}) => {
    const [Phone, setPhone] = useState(false);
    const Handel_phone = () => {
        setPhone(!Phone);
    }
    return (
        // <div className='align-items-center' > 
        //           <hr></hr>
        //                  <div className="d-flex flex-row border-start border-end  mb-2 p-5 align-items-center" >
        //                             {image && (
        //                         <img src={`${image}`} alt="Doctor" style={{ height:"160px", width:"100px"  }} />
        //                             )}
        //                             <div className='' style={{ width: '250px', position: '' }}>
        //                             <h5 className='text-start m-2'>DR.{dname}</h5>
        //                             <h6 className='text-start m-2'>Medical Family</h6>
        //                             <h6 className='text-start m-2'>Start Date :{date}</h6>
        //                             <p className='text-start m-2'>Rate: {rate}&#11088;</p>
        //                             <hr></hr>
        //                             <Link
        //                             to={`/profile/${id}`}
        //                                 style={{ textDecoration: 'none' }}
        //                             >
        //                             <i class="far fa-star"></i>
        //                             Leave review
        //                             </Link>
        //                             </div>       
        //                             <div className="d-flex flex-column ms-2 flex-grow-1">
        //                                 <h6 className="ml-1 text-primary"></h6>
        //                                 <a className="btn btn-sm btn-light me-2" href="#"><i className="fab fa-facebook-f"></i></a>
        //                                 <a className="btn btn-sm btn-light me-2" href="#"><i className="fab fa-twitter"></i></a>
        //                                 <a className="btn btn-sm btn-light" href="#"><i className="fab fa-instagram"></i></a>
        //                             </div>
        //                             {/* bottom */}
        //                             <div className="ml-auto" style={{ width: '170px' }}>
        //                             <Link
        //                                     to={`/profile/${id}`}
        //                                     className="btn btn-white border rounded-pill"
        //                                     style={{ textDecoration: 'none' }}
        //                                 >
        //                                     View Profile
        //                                 </Link>
        //                                 {!Phone ? (
        //                                     <button onClick={Handel_phone} className="btn btn-success m-2 rounded-pill ">
        //                                         <i class="fas fa-phone" style={{color: "#74C0FC;"}}></i>
        //                                     </button>
        //                                 ) : (
        //                                     <button onClick={Handel_phone} className="btn btn-white text-dark m-2 border rounded-pill">
        //                                     {phone}
        //                                     </button>
        //                                 )}
        //                                 <br></br>
        //                                 <Link  to={`/profile/${id}`}>
        //                                 <i class="fas fa-map-marker-alt fa-lg" style={{color: "#fa3e00;"}}></i>
        //                                 </Link>
        //                                 <h6>{dLocation}</h6>
        //                             </div>
        // </div>    
        // <hr></hr>
        // </div>
        <div className='align-items-center'>
  <hr />
  {/* Doctor Info */}
  <div className="d-flex flex-row border-start border-end mb-2 p-5 align-items-center">
    {image && (
      <img src={`${image}`} alt="Doctor" style={{ height: "160px", width: "100px" }} />
    )}
    <div style={{ width: '250px', position: '' }}>
      <h5 className='text-start m-2'>DR.{dname}</h5>
      <h6 className='text-start m-2'>Medical Family</h6>
      <h6 className='text-start m-2'>Start Date :{date}</h6>
      <p className='text-start m-2'>Rate: {rate}&#11088;</p>
      <hr />
      <Link to={`/profile/${id}`} style={{ textDecoration: 'none' }}>
        <i class="far fa-star"></i> Leave review
      </Link>
    </div>
    {/* Social Media Icons */}
    <div className="d-flex flex-column ms-2 flex-grow-1">
      <h6 className="ml-1 text-primary"></h6>
      <a className="btn btn-sm btn-light me-2" href="#"><i className="fab fa-facebook-f"></i></a>
      <a className="btn btn-sm btn-light me-2" href="#"><i className="fab fa-twitter"></i></a>
      <a className="btn btn-sm btn-light" href="#"><i className="fab fa-instagram"></i></a>
    </div>
    {/* Buttons (Visible on Medium and Large Screens) */}
    <div className="ml-auto d-none d-md-block" style={{ width: '170px' }}>
      <Link to={`/profile/${id}`} className="btn btn-white border rounded-pill" style={{ textDecoration: 'none' }}>View Profile</Link>
      {!Phone ? (
        <button onClick={Handel_phone} className="btn btn-success m-2 rounded-pill">
          <i class="fas fa-phone" style={{ color: "#74C0FC;" }}></i>
        </button>
      ) : (
        <button onClick={Handel_phone} className="btn btn-white text-dark m-2 border rounded-pill">
          {phone}
        </button>
      )}
      <br />
      <Link to={`/profile/${id}`}>
        <i class="fas fa-map-marker-alt fa-lg" style={{ color: "#fa3e00;" }}></i>
      </Link>
      <h6>{dLocation}</h6>
    </div>
  </div>
  <hr />
</div>

       
    );
}

export default DoctorProfileCard;





            {/* <img src="https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg" height="160" width="100" /> */}


//         <div className="d-flex flex-row border mb-2 p-5 ">        
//<img src="https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg" height="160" width="100" />

//     <div className='' style={{ width: '250px', position: '' }}>
//      <ul className='class="list-group"'>
//         <li class="list-group-item">DR.{dname}</li>
//         <li class="list-group-item">Medical Family</li>
//         <li class="list-group-item">{dLocation}</li>
//         <li class="list-group-item">Ex: 7 years</li>
//         <li class="list-group-item">{rate}</li>
//      </ul>
    
//     </div>
//     <div className="d-flex flex-column ms-2 flex-grow-1">
//         <span style={{ position: 'relative', width: '100%' }}>
//             Bio: {Bio}
//         </span>
//         <h6 className="ml-1 text-primary"></h6>
//         <h6 className="mb-1"></h6>
//         <ul>
//             <p></p>
//         </ul>
//     </div>
//     <div className="ml-auto" style={{ width: '150px' }}>
//         <Link to={`/profile/${id}`} className="btn btn-primary"> View Profile </Link>
//         {!Phone ? (
//             <button onClick={Handel_phone} className="btn btn-danger m-2">Call</button>
//         ) : (
//             <button onClick={Handel_phone} className="btn btn-danger m-2">{dPhone}</button>
//         )}
//     </div>
// </div>