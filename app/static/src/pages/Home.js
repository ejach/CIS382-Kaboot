import React, { Fragment, useState } from "react";
import Loader from "../components/Loader";
import Welcome from "../components/Welcome";
import SelectionScreen from "../components/SelectionScreen";

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
