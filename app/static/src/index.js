// Imports
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDom from "react-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HostRoom from "./pages/HostRoom";
import Questions from "./pages/Questions";

// CSS
import "./css/style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="host" element={<HostRoom />} />
          <Route path="questions" element={<Questions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
