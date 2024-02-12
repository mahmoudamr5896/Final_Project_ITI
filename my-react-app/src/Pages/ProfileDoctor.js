import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../Component/CardDoctords';
import { useParams } from 'react-router-dom';
const DoctorProfile = () => {
    const [Doctor, setDoctor] = useState(null);
  
    useEffect(() => {
        axios
            .get(`https://retoolapi.dev/ysPAGK/data}`)
            .then(response => setDoctor(response.data))
            .catch(error => console.error('Error fetching doctor:', error));
    }, []);
    console.log(Doctor)

    return (
        <div className="mt-5">
        </div>
    );
};

export default DoctorProfile;


//#endregion// import React ,{ useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// const DoctorProfile = ({  }) => {
//     const { Id } = useParams();
//     console.log(Id);
//       const [Doctor, setDoctor] = useState(null);
  
//     useEffect(() => {
//       axios
//         .get(`https://jsonplaceholder.typicode.com/users/${Id}`)
//         .then(response => setDoctor(response.data))
//         .catch(error => console.error('Error fetching doctor:', error));
//     }, [Id]);

//     return (
//         <div className="doctor-profile">
//             {Doctor ? (
//                 <>
//                     <h1>{Doctor.name}</h1>
//                     <p>Specialist: {Doctor.specialist}</p>
//                     <p>Location: {Doctor.location}</p>
//                     {/* Add more details about the doctor as needed */}
//                 </>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default DoctorProfile;

