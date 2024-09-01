// src/App.js
import React from 'react';
import BarChart from './Barchart';
import PieChart from './PieChart';
import Navbar from './Navbar';

const Graph = () => {
  return (
    <div>
    <Navbar/>
    <div className='bg-Siuu bg-cover h-screen'>
      <h2 className='text-center text-3xl font-bold pt-6 '>CUSTOMER REVIEW MANAGEMENT</h2>
    <div className='flex w-[100vw] gap-x-20 justify-between px-24 mt-10 items-center h-[70vh]'>
        <div className='flex flex-col w-5/12 items-center justify-center gap-y-6'>
            <div className='text-center font-semibold'>BarChart</div>
            <BarChart />
        </div>
        <div className='flex flex-col w-4/12 items-center justify-center gap-y-6'>
            <div className='text-center font-semibold'>PieChart</div>
            <PieChart/>
        </div>
    </div>
    </div>
    </div>
  );
};

export default Graph;
