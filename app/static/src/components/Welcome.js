import React, { Fragment, useState } from 'react';

const Welcome = () => {
  // Create large selections for joining or creating a room
  return (
    <div className='container'>
      <div className='welcome-area' id='welcome'>
        <div className='header-text'>
          <div className='offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12'>
            <h1>
              Welcome to <strong>Kaboot</strong>
            </h1>
            <p>No copyright infringement intended</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
