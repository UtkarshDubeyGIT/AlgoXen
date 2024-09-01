import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import axiosInstance from '../axiosInstance';

const Signup = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axiosInstance.post('/signup', { name, email, password , confirm_password });
      localStorage.setItem('token', response.data.token); 
      navigate('/home');
    } catch (error) {
      console.error('Signup Error:', error.response?.data?.msg || error.message);
      alert('Signup failed: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-Siuu bg-cover">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative mt-3">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 shadow-md rounded-full">
        <div class="text-black flex flex-row">
            Algo<div class="font-bold">X</div><div>en</div>
            </div>
        </div>
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">Register</h2>
        <p className="text-center text-gray-500 mb-6">Create a new account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400 ml-2"></FaEnvelope>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
