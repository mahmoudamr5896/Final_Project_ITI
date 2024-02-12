import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../Component/CardDoctords';
import Pagination from '../Component/Pagginition';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery]); // Fetch data when page changes or search query changes

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
        if (searchQuery === '') {
            return true; // If search query is empty, show all doctors
        } else {
            return doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
    };

    // Filter doctors based on search query
    const filteredDoctors = doctors.filter(filterDoctorsByName);

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

    // Handle search input change
  
    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value;
        setSearch(inputValue);
        if (inputValue.trim() === '') {
            setSearchQuery(''); // Reset search query when input is empty
        }
    };

    // Handle search button click
    const handleSearch = () => {
        setSearchQuery(search);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <div className="container-xxl py-5 mt-5 d-flex justify-content-center">
            <div className="container">
                {/* Search Form */}
                <div className='row' style={{marginTop:'30px'}}>
                   
                <form className="mb-3 d-flex justify-content-end">
                <div className='col-3'>
                <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search by doctor's name"
                        value={search}
                        onChange={handleSearchInputChange}
                    />
                        
                        </div>
                        <div className='col-1'>
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleSearch}>Search</button>

                        </div>
                    
                </form>
                </div>
                
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
