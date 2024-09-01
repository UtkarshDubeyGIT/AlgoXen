import React from "react"
import { NavLink } from "react-router-dom";
import '../styles.css'

const Navbar = () => {
  return (
    <header className="bg-blue-800 text-white flex justify-between items-center p-4">
      <div className="mx-6 flex flex-row text-3xl"><p>Algo</p><p className="font-bold text-3xl">X</p><p className="text-3xl">en</p></div>
      <nav className="space-x-6 mr-6">
      <NavLink to='/Home'><button className="bg-[#667EEA] text-white py-2 px-4 rounded hover:bg-gray-200 w-24 h-10 text-center">Home</button></NavLink>
      <NavLink to='/review'><button className="bg-white text-blue-800 py-2 px-4 rounded hover:bg-gray-200 w-24 h-10 text-center">Review</button></NavLink>
      <NavLink to ='/graph'><button className="bg-white text-blue-800 py-2 px-4 rounded hover:bg-gray-200 w-24 h-10 text-center">Analysis</button></NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
