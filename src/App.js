import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Graph from './components/graph';
import Homepage from './components/Homepage';
import Notfound from './components/Notfound';
import Home from './components/Home';
import Reviews from './components/Review';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Homepage/>}>
          <Route index element = {<Login/>} />
          <Route path='/Home' element = {<Home/>}></Route>
          <Route path= '/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path = '/graph' element = {<Graph/>}/>
          <Route path = '/review' element = {<Reviews/>}></Route>
          <Route path = "*" element = {<Notfound/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
