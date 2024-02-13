import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../Component/CardDoctords';
import Pagination from '../Component/Pagginition';
import StarRating from '../Component/Rate';
const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage]); 

    const fetchData = async () => {
        try {
            const response = await axios.get('https://retoolapi.dev/ysPAGK/data');
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://retoolapi.dev/ysPAGK/data?name=${search}`);
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setLoading(false);
        }
    };


    // Calculate total pages based on number of items and items per page
    const totalPages = Math.ceil(doctors.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



const[Islist,setIslist]= useState(true)
const Handel_Card =()=>{
    setIslist(!Islist);
}

    return (
        <div className="container-xxl py-5 mt-5 mt-5">
            <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 mb-3 d-flex align-content-center">
                <input
                    type="text"
                    placeholder="Search for "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control"

                />
                <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>
                    <b>Search</b>
                </button>
            </div>
            <div> 
                <button onClick={Handel_Card}><i class="fa-solid fa-list"></i></button>
                {/* <button onClick={Handel_List}>List</button> */}
            </div>
             <div className="container">
                            <div className="row g-4">
            {Islist ? (
                        currentDoctors.map((doctor, index) => (
                        //     <div class="d-flex flex-row border mb-2 p-5 d-flex" style={{display:'block'}}>
                        //     <img src="https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg"  height="100" width="100" class="rounded-circle"/>
                        //     <div class="d-flex flex-column ms-2">
                        
                        //         <h6 class="mt-1 text-primary">DR.{doctor.name}</h6>
                        //         <h6 class="mb-1 text-primary">
                        //         {/* <i class="fa-solid fa-location-dot" style={{color:'#f70202;'}}></i> */}
                        //             {doctor.Location}
                        //         </h6>
                        //         <ul>
                        //             <p>sss</p>
                        //             <p>sss</p>
                        //             <p>sss</p>
                        //             <p>sss</p>
                        //         </ul>
                        //     </div>
                        //     <hr/>
                        //         <div style={{float:'left'}}>
                        //           <h6 className='btn d-flex justify-content-center'>View Profile</h6>
                        //     </div>
                        // </div>
            <div className="d-flex flex-row border mb-2 p-5 align-items-center">
                        <img src="https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg" height="160" width="100" />
                        <div>
                        <h5 className='text-primary'>DR.{doctor.name}</h5> 
                        <h5 className='text-primary'>{doctor.Spcialist}</h5> 
                        <h5 className='text-primary'>Exprience:7y</h5> 
                        </div>
                        <div className="d-flex flex-column ms-2 flex-grow-1">
                            <h6 className="ml-1 text-primary">DR. {doctor.name}</h6>
                            <h6 className="mb-1">
                                {doctor.Location}
                            </h6>
                            <ul>
                                <p>Rate :
                                    <StarRating/>
                                </p>
                            </ul>
                        </div>
                        <div className="ml-auto" style={{width:'150px'}}>
                            <button className="btn btn-primary"> View Profile </button>
                            Call
                            <button className="btn btn-danger m-2">{doctor.Phone}</button>
                            Find 
                            <i class="fa-solid fa-location-dot" style={{color: '#fb2504;'}}></i>
                            {/* <button className="btn btn-danger m-2">{doctor.Location}</button> */}
                        </div>
             </div>

                        ))
                           ) : (
                        currentDoctors.map((doctor, index) => (
                           
                            <DoctorCard
                                key={index}
                                delay="0.1s"
                                imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
                                name={doctor.name}
                                department="View Profile"
                                dept={doctor.Spcialist}
                                id={doctor.id}
                            />  
                        ))
                    )}
              </div>
        </div>

            {/* {!Islist   ? ( 
               <div className="container">
                <div className="row g-4">
                    {currentDoctors.map((doctor, index) => (
                        <DoctorCard
                            key={index}
                            delay="0.1s"
                            imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
                            name={doctor.name}
                            department="View Profile"
                            dept={doctor.Spcialist}
                            id={doctor.id}
                        />
                    ))}
                </div>
               </div>
                        ):(
                    <div class="container py-5">
                            <div class="row text-center text-white mb-5">
                                <div class="col-lg-7 mx-auto">
                                    <h1 class="display-4">Product List</h1>
                                </div>
                            </div>
                            <div class="row">
                            <div class="col-lg-8 mx-auto">
                                    <ul class="list-group shadow">
                                        <li class="list-group-item">
                                            <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                                                <div class="media-body order-2 order-lg-1">
                                                    <h5 class="mt-0 font-weight-bold mb-2">Apple iPhone XR (Red, 128 GB)</h5>
                                                    <p class="font-italic text-muted mb-0 small">128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor</p>
                                                    <div class="d-flex align-items-center justify-content-between mt-1">
                                                        <h6 class="font-weight-bold my-2">₹64,999</h6>
                                                        <ul class="list-inline small">
                                                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                            <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                            <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                                        </ul>
                                                    </div>
                                                </div><img src="https://i.imgur.com/KFojDGa.jpg" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2" />
                                            </div> 
                                    </li> 
                                    </ul>
                        </div>
                        </div>
                    </div>
                        )}
            {IsCard ? (
        <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4">Product List</h1>
                    </div>
                </div>
                <div class="row">
                <div class="col-lg-8 mx-auto">
                        <ul class="list-group shadow">
                            <li class="list-group-item">
                                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                                    <div class="media-body order-2 order-lg-1">
                                        <h5 class="mt-0 font-weight-bold mb-2">Apple iPhone XR (Red, 128 GB)</h5>
                                        <p class="font-italic text-muted mb-0 small">128 GB ROM | 15.49 cm (6.1 inch) Display 12MP Rear Camera | 7MP Front Camera A12 Bionic Chip Processor</p>
                                        <div class="d-flex align-items-center justify-content-between mt-1">
                                            <h6 class="font-weight-bold my-2">₹64,999</h6>
                                            <ul class="list-inline small">
                                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                                                <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                            </ul>
                                        </div>
                                    </div><img src="https://i.imgur.com/KFojDGa.jpg" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2" />
                                </div> 
                         </li> 
                         </ul>
               </div>
            </div>
        </div>
                        ):(          
                    <div className="container">
                            <div className="row g-4">
                                {currentDoctors.map((doctor, index) => (
                                    <DoctorCard
                                        key={index}
                                        delay="0.1s"
                                        imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
                                        name={doctor.name}
                                        department="View Profile"
                                        dept={doctor.Spcialist}
                                        id={doctor.id}
                                    />
                                ))}
                            </div>
                    </div> )
                         } */}
            <div>
            <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
                </div>

                )
                 }

export default DoctorsPage;


{/* <div className="col-lg-7 col-md-6 px-0">
<div className="map_container">
  <div className="map-responsive">
    <iframe
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Sandy+Springs+Georgia+UnitedStates"
      width="600"
      height="300"
      frameborder="0"
      style={{ border: '0;', width: '100%;', height: '100%' }}
      allowfullscreen
    ></iframe>
  </div>
</div>
</div> */}




// import React from 'react';
// import DoctorCard from '../Component/CardDoctords';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
// function DoctorsPage() {

//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios
//             .get('https://retoolapi.dev/ysPAGK/data');
//             setDoctors(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };


//     return (
//         <div className="container-xxl py-5 mt-5">
//         <div className="container">
//             <div className="row g-4">
//             {doctors.map((doctor, index) => (
//         <DoctorCard
//             key={index}
//             delay="0.1s"
//             imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
//             name={doctor.name}
//             department="View Profile" 
//             dept={doctor.Spcialist} 
//                 />
//     ))}
//             </div>
//         </div>
//     </div>

//     );
// }

// export default DoctorsPage;
