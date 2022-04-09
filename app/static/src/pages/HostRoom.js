import React, { Fragment, useState } from 'react';
import CreateForm from '../components/CreateForm';

const HostRoom = () => {
  return (
    <Fragment>
      <div className='container'>
        <div className='title-area'>
          <div className='header-text'>
            <h1>Create Exam</h1>
          </div>
        </div>
      </div>

      <CreateForm />

      <div className='wide-row'>
        <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
          <div className='features-wide-item'>
            <h4 className='features-title'>Test</h4>
            <div className='col-12'>
              <form id='question' action=''>
                <input name='code' type='text' placeholder='Code' required />
                <button
                  type='submit'
                  //   id={id}
                  className='main-button'
                  //   onClick={eventHandler}
                >
                  {/* {title + ' Room'} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HostRoom;
