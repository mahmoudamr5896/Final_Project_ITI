import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function Editmsg() {
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push(`/`);
    }, 3000);

    return () => clearTimeout(timeout); 
  }, [history, userId]);

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <h1 className='text-success'>Edit uploaded successfully</h1>
    </div>
  );
}

export default Editmsg;
