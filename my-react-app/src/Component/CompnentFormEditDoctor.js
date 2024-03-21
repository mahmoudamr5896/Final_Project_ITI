import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory ,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
function EditDoctorPage({ userId }) {
  const [userData, setUserData] = useState({
    id:'',
    username: '',
    name: '',
    age: 0,
    image: '',
    experience: 0,
    gender: '',
    phone: '',
    location: ''
  });

  //"id": 1,
  // "username": "mahmoudamr",
  // "name": "mahmoud",
  // "age": 23,
  // "image": null,
  // "experience": 2,
  // "gender": "M",
  // "phone": "01060860534",
  // "location": "cairo"

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://127.0.0.1:8000/doctors/${userId.id}/`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {

    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;//.split('\\').pop();
    setUserData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };
const handleSubmit = (e) => { 
    // e.preventDefault();

    // Create FormData object
    const formData = new FormData();

    // Append user data fields to the FormData object
    formData.append('username', userData.username);
    formData.append('name', userData.name);
    formData.append('age', userData.age);
    formData.append('experience', userData.experience);
    formData.append('gender', userData.gender);
    formData.append('phone', userData.phone);
    formData.append('location', userData.location);

    // Check if there's a new image selected
    if (userData.image instanceof File) {
        formData.append('image', userData.image); // Append the image file
    }

    // Make a PATCH request with FormData
    axios.patch(`http://127.0.0.1:8000/doctors/${userData.id}/`, formData)
        .then(response => {
            console.log('User data updated successfully:', response.data);
            // history.push(`profile/${userData.id}`);
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
};

const history = useHistory()
const[Error,setError]=useState()

  return (
    // <div className='container m-5'>
    //   {/* <h1>Edit Doctor Profile</h1> style={{width:'500px'}}*/}
    //   <form   onSubmit={handleSubmit}  >
    //     <div className='row border p-4'>
    //       <div className='col-6'>
    //               <div className="mb-3">
    //                 <label htmlFor="username" className="form-label " >Username:</label>
    //                 <input type="text" id="username" name="username" className="form-control"disabled value={userData.username} onChange={handleChange} />
    //               </div>
    //               <div className="mb-3">
    //                 <label htmlFor="name" className="form-label">Name:</label>
    //                 <input type="text" id="name" name="name" className="form-control" value={userData.name} onChange={handleChange} />
    //               </div>
    //               <div className="mb-3">
    //                 <label htmlFor="age" className="form-label">Age:</label>
    //                 <input type="number" id="age" name="age" className="form-control" value={userData.age} onChange={handleChange} />
    //               </div>
    //                <div className="mb-3">
    //                     <label htmlFor="image" className="form-label">Image:</label>
    //                     <input type="file" id="image" name="image" className="form-control" onChange={handleChange} />
    //                   </div>
    //       </div>
    //       <div className='col-6'>
                     
    //                   <div className="mb-3">
    //                     <label htmlFor="experience" className="form-label">Experience:</label>
    //                     <input type="number" id="experience" name="experience" className="form-control" value={userData.experience} onChange={handleChange} />
    //                   </div>
    //                   <div className="mb-3">
    //                     <label htmlFor="gender" className="form-label">Gender:</label>
    //                     <select id="gender" name="gender" className="form-control" value={userData.gender} onChange={handleChange}>
    //                       <option value="">Select Gender</option>
    //                       <option value="M">Male</option>
    //                       <option value="F">Female</option>
    //                     </select>
    //                   </div>
    //                   <div className="mb-3">
    //                     <label htmlFor="phone" className="form-label">Phone:</label>
    //                     <input type="text" id="phone" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
    //                   </div>  <div className="mb-3">
    //       <label htmlFor="location" className="form-label">Location:</label>
    //       <input type="text" id="location" name="location" className="form-control" value={userData.location} onChange={handleChange} />
           
    //     </div> 
        
    //       </div>
    //     </div>
    //   <button type="submit" className="btn btn-sm btn-primary mt-3"style={{width:'150px'}}>Save Changes</button>

    //     <p className='text-danger'>{Error}</p>
      
    //   </form>
    // </div>
    <div className='container '>
  {/* <h1>Edit Doctor Profile</h1> style={{width:'500px'}}*/}
  <form onSubmit={handleSubmit}>
    <div className='row border p-4'>
      <div className='col-lg-6 col-md-12'>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" id="username" name="username" className="form-control" disabled value={userData.username} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name" className="form-control" value={userData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="number" id="age" name="age" className="form-control" value={userData.age} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input type="file" id="image" name="image" className="form-control" onChange={handleChange} />
        </div>
      </div>
      <div className='col-lg-6 col-md-12'>
        <div className="mb-3">
          <label htmlFor="experience" className="form-label">Experience:</label>
          <input type="number" id="experience" name="experience" className="form-control" value={userData.experience} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <select id="gender" name="gender" className="form-control" value={userData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" id="phone" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input type="text" id="location" name="location" className="form-control" value={userData.location} onChange={handleChange} />
        </div>
      </div>
    </div>
    <button type="submit" className="btn btn-sm btn-primary mt-3" style={{ width: '150px' }}>Save Changes</button>
    <p className='text-danger'>{Error}</p>
  </form>
</div>

  );
}

export default EditDoctorPage;

  // "id": 1,
  // "username": "mahmoudamr",
  // "name": "mahmoud",
  // "age": 23,
  // "image": null,
  // "experience": 2,
  // "gender": "M",
  // "phone": "01060860534",
  // "location": "cairo"
  // const handleSubmit = (e) => { 
  //   e.preventDefault();

  // // Basic validation
  // if (!userData.username.trim()) {
  //   setError('Please enter a username.');
  //   return;
  // }
  
  // if (!userData.name.trim()) {
  //   setError('Please enter a name.');
  //   return;
  // }

  // if (userData.age <= 0) {
  //   setError('Please enter a valid age.');
  //   return;
  // }
  // const PhoneRegex = /^\+?[1-9]\d{1,14}$/;


  // if (!userData.phone.trim() || !PhoneRegex.test(userData.phone)) {
  //   setError('Please enter a valid phone number.');
  //   return;
  // }

  //   console.log(userData)
  //   axios.put(`http://127.0.0.1:8000/doctors/${userData.id}/`, userData)
  //     .then(response => {
  //       console.log('User data updated successfully:', response.data);
  //       history.push(`profile/${userData.id}`)
  //     })
  //     .catch(error => {
  //       console.error('Error updating user data:', error);
  //       console.log(userData)

  //     });
  // };
