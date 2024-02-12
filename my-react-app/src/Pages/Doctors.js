import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../Component/CardDoctords';
import Pagination from '../Component/Pagginition';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
    //const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage]); // Fetch data when page changes

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

    // Slice data for current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container-xxl py-5 mt-5">
            <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4 mb-3 d-flex align-items-center">
                <input
                    type="text"
                    placeholder="Search for "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control mx-3 custom-input-dark"
                />
                <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>
                    <b>Search</b>
                </button>
            </div>
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
                        />
                    ))}
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
