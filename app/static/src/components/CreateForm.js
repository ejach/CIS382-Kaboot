import React, { useState } from 'react';

const CreateForm = () => {
  // Handle form submission
  // Create submit button
  return (
    <div className='wide-row'>
      <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
        <div className='features-wide-item'>
          <h4 className='features-title'>Test</h4>
          <div className='col-12'>
            <form action=''>
              <input name='code' type='text' placeholder='Title' required />
              <input name='points' type='text' placeholder='Points' required />
              <input
                name='time-limit'
                type='text'
                placeholder='Time Limit'
                required
              />
              <button type='submit' id='create-exam' className='main-button'>
                Create Exam
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
