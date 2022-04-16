import React, { Fragment, useState } from 'react';
import Loader from '../components/Loader';
import Welcome from '../components/Welcome';
import SelectionScreen from '../components/SelectionScreen';
import QuestionCreation from './QuestionCreation';

const Home = () => {
  return (
    <Fragment>
      <Loader />
      <Welcome />
      <SelectionScreen />
    </Fragment>
  );
};

export default Home;
