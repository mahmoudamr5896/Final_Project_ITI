import React from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NotFound() {
  return (
    <div style={{ height: '700px' }}>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-6 text-center bg-light" style={{ height: '400px', marginTop: '50px' }}>
            <h4 className="text-danger" style={{ paddingTop: '20px' }}>Can't Found this page</h4>
            <hr />
            <h1 className="text-danger" style={{ fontSize: '200px' }}>404</h1>
            <Link to=''>
              <button className='btn btn-success'>Go Back to home page</button>
            </Link>
          </div>
        </div>
      </div>
      <style>
        {`
          /* Media query for medium screens */
          @media (min-width: 577px) and (max-width: 768px) {
            h1.text-danger {
              font-size: 100px !important;
            }
          }

          /* Media query for small screens */
          @media (max-width: 576px) {
            h1.text-danger {
              font-size: 75px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default NotFound;
