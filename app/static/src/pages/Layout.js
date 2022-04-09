import React, { Fragment, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
