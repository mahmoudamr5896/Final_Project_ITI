import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {


  // 
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };



  return (
          <div className="pagination d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link"  aria-label="Previous" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {generatePageNumbers().map(pageNumber => (
                  <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(pageNumber)}>
                      {pageNumber}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button className="page-link" to='/products' aria-label="Next" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
  );
};

export default Pagination;





































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { useEffect } from 'react';
// import axios from 'axios';
// const Pagination = () => {
//   const generatePageNumbers = () => {
//     const pages = [];{ currentPage, totalPages, onPageChange }
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };



//   return (
//     <div className="pagination d-flex justify-content-center">
//         <nav aria-label="Page navigation example">
//         <ul className="pagination">
//             <li className="page-item">
//             <Link className="page-link" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//             </Link>
//             </li>
//             <li className="page-item"><Link className="page-link" >1</Link></li>
//             <li className="page-item"><Link className="page-link" >2</Link></li>
//             <li className="page-item"><Link className="page-link" >3</Link></li>
//             <li className="page-item">
//             <Link className="page-link" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//             </Link>
//             </li>
//         </ul>
//         </nav>
//     </div>
//   );
// };

// export default Pagination;
