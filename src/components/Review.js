import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Navbar from './Navbar';
import axiosInstance from '../axiosInstance';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', place: '', description: '' });


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get('/api/reviews'); 
        const data = response.data; 
        
        setReviews(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchReviews();
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, place, description } = newReview;

    if (name && place && description) {
      const newReviewData = { name, place , description };

      try {

        const response = await axiosInstance.post('/api/reviews', newReviewData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        // const result = await response.json();
      
        setNewReview({ name: '', place: '', description: '' });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  };
  console.log(reviews)

  return (
    <div>
    <Navbar/>
    <div className='flex flex-col justify-center items-center '>
      <div className="p-4 bg-gray-100 bg-[url('https://res.cloudinary.com/dmnjig3al/image/upload/v1725171376/xrqwzb7tt5dmsrnychts.jpg')] bg-cover h-screen">
        <div className="mb-4 flex justify-center items-center flex-col max-w-6xl mx-auto">
          <h2 className="font-semibold mb-2 mt-4 text-3xl">Share Your Review</h2>
          <div className="bg-white p-4 rounded-lg shadow-md w-full mt-8">
            <form onSubmit={submitHandler}>
              <div className="flex flex-row space-x-4 justify-between items-center">
                <div className="mb-4 w-2/6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newReview.name}
                    onChange={changeHandler}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              <div className="mb-4 px-2">
                <label htmlFor="place" className="block text-gray-700 font-semibold mb-2">place</label>
                  <ul className="flex flex-row  items-center justify-center w-full">
                    {['Household', 'Workplace', 'Club', 'Lonely Road', 'Institutes'].map((loc) => (
                      <li key={loc} className='border-2 mx-2 px-2'>
                        <div className="flex items-center">
                          <input
                            id={loc.toLowerCase().replace(/\s+/g, '-')}
                            type="radio"
                            value={loc}
                            name="place"
                            checked={newReview.place === loc}
                            onChange={changeHandler}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label htmlFor={loc.toLowerCase().replace(/\s+/g, '-')} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{loc}</label>
                        </div>
                      </li>
                    ))}
                  </ul>
              </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newReview.description}
                  onChange={changeHandler}
                  className="border border-gray-300 rounded-md p-2 w-full resize-none"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Submit</button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 px-16 mt-20">
          {reviews.slice(0, 6).map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:scale-105 mx-4 my-4">
              <h3 className="text-lg font-semibold flex flex-row gap-2">
                <FaUser className='mt-1' />
                {review.name}
              </h3>
              <p className="mt-2 text-gray-700">{review.description}</p>
              <div className="mt-4 flex justify-between text-blue-600">
                <span>📍 {review.place}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Reviews;
