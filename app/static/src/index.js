// Imports
import React, { Fragment, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import HostRoom from './pages/HostRoom';

// CSS
import './css/style.css';

const App = () => {
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
