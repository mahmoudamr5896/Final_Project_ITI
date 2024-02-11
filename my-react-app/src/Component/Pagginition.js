import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const prevPage = () => {
        onPageChange(currentPage - 1);
    };

    const nextPage = () => {
        onPageChange(currentPage + 1);
    };

    const goToPage = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button  key={i} onClick={() => goToPage(i)} className={i === currentPage ? 'active btn btn-sm btn-primary ' : ' btn btn-primary '}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        //     
        //     <Link className='btn btn-primary'>Page {currentPage} of {totalPages}</Link>
        //     <button className='btn' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        // </div>        // 
        <div className="pagination d-flex justify-content-center mt-5">
        <ul class="pagination">
          <li class="page-item"><Link  className='btn page-link' onClick={prevPage} disabled={currentPage === 1}>Previous</Link></li>
        {/* <button >Previous</button> */}
         {renderPageNumbers()}
          <li class="page-item">
           <Link  className='btn page-link' onClick={nextPage} disabled={currentPage === totalPages}>Next</Link>
          </li>
        </ul>
        </div>
    );
};

export default Pagination;

