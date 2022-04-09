// Imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import HostRoom from './pages/HostRoom';
import axios from 'axios'

// CSS
import './css/style.css';

const App = () => {
  const [getMessage, setGetMessage] = useState({})
  
  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='host' element={<HostRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
