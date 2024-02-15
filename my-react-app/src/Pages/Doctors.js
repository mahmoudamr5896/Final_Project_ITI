import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../Component/CardDoctords';
import Pagination from '../Component/Pagginition';
import DoctorProfileCard from '../Component/List_Component'

import './Css/doctors.css';
const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); 
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const[Islist,setIslist]= useState(true)

    useEffect(() => {
        fetchData();
    }, [currentPage, searchName, searchLocation]); 

    const fetchData = async () => {
        try {
            const response = await axios.get('https://retoolapi.dev/Pf4yJq/data');
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const filterDoctorsByName = (doctor) => {
        if (searchName === '') {
            return true; 
        } else {
            return doctor.name.toLowerCase().includes(searchName.toLowerCase());
        }
    };

    const filterDoctorsByLocation = (doctor) => {
        if (searchLocation === '') {
            return true; 
        } else {
            
            return doctor && doctor.Location && doctor.Location.toLowerCase().includes(searchLocation.toLowerCase());
        }
    };

    // handel show list or cart 
const Handel_Card =()=>{
    setIslist(!Islist);
}
    // Filter doctors 
    const filteredDoctors = doctors.filter(filterDoctorsByName).filter(filterDoctorsByLocation);

    // Paginate the filtered data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages based on number of items after filtering
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

    // Handle page change
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle search name
    const handleNameSearchInputChange = (event) => {
        setSearchName(event.target.value);
        setCurrentPage(1); 
    };

    // Handle search location
    const handleLocationSearchInputChange = (event) => {
        setSearchLocation(event.target.value);
        setCurrentPage(1); 
    };

    return (
        <div className="container-xxl py-5 mt-5 d-flex justify-content-center">
            <div className="container">
                <div className='container '>
                            <div className='row' style={{ marginTop: '30px', marginBottom: '50px' }}>
                            <div className='col-lg-5 col-sm-12'>
                                <div className='input-group'>
                                    <span className="input-group-text">Name</span>
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="Search by doctor's name"
                                        value={searchName}
                                        onChange={handleNameSearchInputChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-close clear-button "
                                        aria-label="Close"
                                        onClick={() => setSearchName('')}
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>
                            <div className='col-lg-5 col-sm-12'>
                                <div className='input-group'>
                                    <span className="input-group-text">Near</span>
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="Search by doctor's location"
                                        value={searchLocation}
                                        onChange={handleLocationSearchInputChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-close clear-button "
                                        aria-label="Close"
                                        onClick={() => setSearchLocation('')}
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-1 col-sm-12 d-flex align-items-center justify-content-center">
                            <i onClick={Handel_Card} class="fas fa-list fa-lg"></i>
                            </div>
                            </div>
                </div>

                <div className="row g-4">
                {Islist ? (
                currentDoctors.map((doctor, index) => (
                    <DoctorProfileCard
                    dname={doctor.name}
                    dPhone={doctor.Phone}
                    dLocation={doctor.Location}
                    id={doctor.id}   
                    rate={doctor.Rating}
                    Bio={doctor.Bio}
                    date={doctor.Start_date}
                    />
       
                        ))
                           ) : (
                        currentDoctors.map((doctor, index) => (
                           
                            <DoctorCard
                                key={index}
                                delay="0.1s"
                                imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
                                name={doctor.name}
                                department="View Profile"
                                id={doctor.id}
                                rating={doctor.Rating}
                            />  
                        ))
                    )}
                    {/* {currentDoctors.map((doctor, index) => (
                        <DoctorCard
                            key={index}
                            delay="0.1s"
                            imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
                            name={doctor.name}
                            department="View Profile"
                            // dept={doctor.Location}
                        />
                    ))} */}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default DoctorsPage;





  //     <div class="d-flex flex-row border mb-2 p-5 d-flex" style={{display:'block'}}>




























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DoctorCard from '../Component/CardDoctords';
// import Pagination from '../Component/Pagginition';
// import StarRating from '../Component/Rate';
// import DoctorProfileCard from '../Component/List_Component'
// import './Css/doctors.css'
// const DoctorsPage = () => { 
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
//     const [searchName, setSearchName] = useState('');
//     const [searchLocation, setSearchLocation] = useState('');
// // display data in currrent page 
//     useEffect(() => {
//         fetchData();
//     }, [currentPage][searchName][searchLocation]); 

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('https://retoolapi.dev/Pf4yJq/data');
//             setDoctors(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };

//     const filterDoctorsByName = (doctor) => {
//         if (searchName === '') {
//             return true; 
//         } else {
//             return doctor.name.toLowerCase().includes(searchName.toLowerCase());
//         }
//     };
//     const filterDoctorsByLocation = (doctor) => {
//         if (searchLocation === '') {
//             return true; 
//         } else {
//             return doctor && doctor.Location && doctor.Location.toLowerCase().includes(searchLocation.toLowerCase());
//         }
//     };

//     // Filter doctors 
//     const filteredDoctors = doctors.filter(filterDoctorsByName).filter(filterDoctorsByLocation);
    



//     // Calculate total pages based on number of items and items per page
//     const totalPages = Math.ceil(doctors.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);
//     // Handle page change
//     const onPageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };


// // handel show list or cart 
// const[Islist,setIslist]= useState(true)
// const Handel_Card =()=>{
//     setIslist(!Islist);
// }

//     // Handle search name
//     const handleNameSearchInputChange = (event) => {
//         setSearchName(event.target.value);
//         setCurrentPage(1); 
//     };

//     // Handle search location
//     const handleLocationSearchInputChange = (event) => {
//         setSearchLocation(event.target.value);
//         setCurrentPage(1); 
//     };


  
//     return (
//         <div className="container-xxl py-5 mt-5 mt-5">  
//             {/* <img onClick={Handel_Card} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/VisualEditor_-_Icon_-_Bullet-list-ltr.svg/768px-VisualEditor_-_Icon_-_Bullet-list-ltr.svg.png' style={{width:'60px'}}/> */}
//             <div className="container-xxl py-5 mt-5 mt-5">
//                 <div className="row">
//                     <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 mb-2 d-flex align-items-center border border-2" style={{width:'100%',height:'auto'}}>
//                     <div className='container '>
//                     <div className='row' style={{ marginTop: '30px', marginBottom: '50px' }}>
//                         <div className='col-lg-5 col-sm-12'>
//                             <div className='col-5 input-group'>
//                                 <span className="input-group-text">Name</span>
//                                 <input
//                                     type="text"
//                                     className="form-control me-2"
//                                     placeholder="Search by doctor's name"
//                                     value={searchName}
//                                     onChange={handleNameSearchInputChange}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="btn btn-close clear-button "
//                                     aria-label="Close"
//                                     onClick={() => setSearchName('')}
//                                 >
//                                     <i className="bi bi-x"></i>
//                                 </button>
//                             </div>
//                         </div>
//                         <div className='col-lg-5 col-sm-12'>
//                             <div className='col-5 input-group'>
//                                 <span className="input-group-text">Near</span>
//                                 <input
//                                     type="text"
//                                     className="form-control me-2"
//                                     placeholder="Search by doctor's location"
//                                     value={searchLocation}
//                                     onChange={handleLocationSearchInputChange}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="btn btn-close clear-button "
//                                     aria-label="Close"
//                                     onClick={() => setSearchLocation('')}
//                                 >
//                                     <i className="bi bi-x"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </div> 
//             <div className='d-flex justify-content-end' style={{width:'100px' , float:'right'}}>                
//             </div>
//              <div className="container">
//               <div className="row g-4">
//             {Islist ? (
//                 currentDoctors.map((doctor, index) => (
//                     <DoctorProfileCard
//                     dname={doctor.name}
//                     dPhone={doctor.Phone}
//                     dLocation={doctor.Location}
//                     id={doctor.id}   
//                     rate={doctor.Rating}
//                     Bio={doctor.Bio}
//                     date={doctor.Start_date}
//                     />
       
//                         ))
//                            ) : (
//                         currentDoctors.map((doctor, index) => (
                           
//                             <DoctorCard
//                                 key={index}
//                                 delay="0.1s"
//                                 imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
//                                 name={doctor.name}
//                                 department="View Profile"
//                                 id={doctor.id}
//                                 rating={doctor.Rating}
//                             />  
//                         ))
//                     )}
//               </div>
//              </div>
//              </div>
//              <div>
//             <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={onPageChange}
//                 />
//              </div>
//                 </div>

//                 )
//                  }

// export default DoctorsPage;






// // const [search, setSearch] = useState('');
//     // const [SearchLoc, setSearchLoc] = useState('');
//     // const handleSearch = async () => {
//     //     try {
//     //         let url = 'https://retoolapi.dev/DY9HtZ/data?';
//     //         if (search) {
//     //             url += `q=${search}`;
//     //         }
//     //         if (SearchLoc) {
//     //             if (search) {
//     //                 url += '&';
//     //             }
//     //             url += `q=${SearchLoc}`;
//     //         }
//     //         const response = await axios.get(url);
//     //         setDoctors(response.data);
//     //         setLoading(false);
//     //     } catch (error) {
//     //         console.error('Error fetching search results:', error);
//     //         setLoading(false);
//     //     }
//     // };
// {/* <div className="col-lg-7 col-md-6 px-0">
// <div className="map_container">
//   <div className="map-responsive">
//     <iframe
//       src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Sandy+Springs+Georgia+UnitedStates"
//       width="600"
//       height="300"
//       frameborder="0"
//       style={{ border: '0;', width: '100%;', height: '100%' }}
//       allowfullscreen
//     ></iframe>
//   </div>
// </div>
// </div> */}



//   //     <div class="d-flex flex-row border mb-2 p-5 d-flex" style={{display:'block'}}>
//                         //     <img src="https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg"  height="100" width="100" class="rounded-circle"/>
//                         //     <div class="d-flex flex-column ms-2">
                        
//                         //         <h6 class="mt-1 text-primary">DR.{doctor.name}</h6>
//                         //         <h6 class="mb-1 text-primary">
//                         //         {/* <i class="fa-solid fa-location-dot" style={{color:'#f70202;'}}></i> */}
//                         //             {doctor.Location}
//                         //         </h6>
//                         //         <ul>
//                         //             <p>sss</p>
//                         //             <p>sss</p>
//                         //             <p>sss</p>
//                         //             <p>sss</p>
//                         //         </ul>
//                         //     </div>
//                         //     <hr/>
//                         //         <div style={{float:'left'}}>
//                         //           <h6 className='btn d-flex justify-content-center'>View Profile</h6>
//                         //     </div>
//                         // </div>
// // import React from 'react';
// // import DoctorCard from '../Component/CardDoctords';
// // import { useState } from 'react';
// // import { useEffect } from 'react';
// // import axios from 'axios';
// // function DoctorsPage() {

// //     const [doctors, setDoctors] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //     const fetchData = async () => {
// //         try {
// //             const response = await axios
// //             .get('https://retoolapi.dev/ysPAGK/data');
// //             setDoctors(response.data);
// //             setLoading(false);
// //         } catch (error) {
// //             console.error('Error fetching data:', error);
// //             setLoading(false);
// //         }
// //     };


// //     return (
// //         <div className="container-xxl py-5 mt-5">
// //         <div className="container">
// //             <div className="row g-4">
// //             {doctors.map((doctor, index) => (
// //         <DoctorCard
// //             key={index}
// //             delay="0.1s"
// //             imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
// //             name={doctor.name}
// //             department="View Profile" 
// //             dept={doctor.Spcialist} 
// //                 />
// //     ))}
// //             </div>
// //         </div>
// //     </div>

// //     );
// // }
//  {/* <input
//                             type="text"
//                             placeholder="Search for doctor by name"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="form-control m-2"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Search for doctor by location"
//                             value={SearchLoc}
//                             onChange={(e) => setSearchLoc(e.target.value)}
//                             className="form-control m-2"
//                         />
//                         <button
//                             type="button"
//                             className="btn btn-outline-primary col-2 m-2"
//                             onClick={handleSearch}
//                         >
//                             <b>Search</b>
//                         </button> */}
// // export default DoctorsPage;
//          {/* <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 mb-3 d-flex align-content-center">
//                 <input
//                     type="text"
//                     placeholder="Search for "
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="form-control"

//                 />
//                 <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>
//                     <b>Search</b>
//                 </button>
//             </div> */}