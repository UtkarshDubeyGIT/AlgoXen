import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const DashBoard = ()=>{
    const [User,setUser] = useState({name : '' , email : ''})
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              return;
            }
    
            const response = await axiosInstance.get('/api/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response)
    
            setUser({name : response.data['name'],email : response.data['email']});
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, [setUser]);


    return (
        <div className="bg-[#23368B] flex flex-col w-80 h-screen">
            <div className='flex justify-center w-full rounded-md'><img src = 'https://res.cloudinary.com/dmnjig3al/image/upload/v1725114690/q9zycowlgi0fngj0x6pz.jpg' className='mt-10 rounded-md h-52 w-44' alt="Error"></img></div>
            <p className="text-center font-semibold text-white text-xl mt-4">Personal Info</p>
            {User ? (
        <div className='flex flex-col items-center mt-6 text-white gap-y-3'>
          <p>{User.name}</p>
          <p>{User.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
        </div>
    )
}

export default DashBoard;