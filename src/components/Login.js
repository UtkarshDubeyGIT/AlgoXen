import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/login', { email, password });
      localStorage.setItem('token', response.data.token); 
      navigate('/Home');
    } catch (error) {
      console.error('Login Error:', error.response?.data?.msg || error.message);
      alert('Login failed: ' + (error.response?.data?.msg || 'An error occurred'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-Siuu bg-cover">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative -inset-y-10">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 shadow-md rounded-full">
            <div class="text-black flex flex-row">
            Algo<div class="font-bold">X</div><div>en</div>
            </div>
        </div>
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">Login</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
          <div className="mb-6">
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
          
       <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-6">
          
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
