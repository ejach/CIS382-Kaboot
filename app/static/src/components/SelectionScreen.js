import React, { Fragment, useState } from 'react';
import LargeSelection from './LargeSelection';
import { useNavigate } from 'react-router-dom';

const SelectionScreen = () => {
  // Create large selections for joining or creating a room
  let navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();

    if (event.target.id == 'join') {
      // joining a room via code, we need query the code
      const validated = true;
      if (validated) {
        console.log('Do something');
      }
    } else {
      // hosting, redirect them
      navigate('/host');
    }
  };

  return (
    <section className='section home-feature'>
      <div className='container'>
        <div className='col-lg-12'>
          <div className='row'>
            <LargeSelection
              title={'Join'}
              id={'join'}
              manualCode={true}
              eventHandler={submit}
            />
            <LargeSelection title={'Host'} id={'host'} eventHandler={submit} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionScreen;
