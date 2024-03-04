import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Editmsg() {
    const history = useHistory();
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        history.push(`/`)
      }, 3000);
  
      return () => clearTimeout(timeout); 
    }, [history]);


 
    return(
        <div className="container  "style={{marginTop:'100px'}}>
            <h1 className='text-success'>edit uploaded successfully</h1>
        </div>
            

        )
    }

export default Editmsg;