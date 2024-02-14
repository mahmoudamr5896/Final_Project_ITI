import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../Component/CardDoctords';
import Pagination from '../Component/Pagginition';
import './Css/Doctors.css';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, searchName, searchLocation]); // Fetch data when page changes 

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
                            <div className='col-5 input-group'>
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
                            <div className='col-5 input-group'>
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
                    </div>
                </div>

                <div className="row g-4">
                    {currentDoctors.map((doctor, index) => (
                        <DoctorCard
                            key={index}
                            delay="0.1s"
                            imageUrl='https://professions.ng/wp-content/uploads/2023/07/The-Process-of-Becoming-a-Doctor-in-Nigeria-A-Roadmap2-768x768.jpg'
                            name={doctor.name}
                            department="View Profile"
                            dept={doctor.Location}
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
