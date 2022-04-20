// Imports
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDom from "react-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HostRoom from "./pages/HostRoom";
import Questions from "./pages/Questions";
import Waiting from "./pages/Waiting";
import { ToastContainer } from "react-toastify";
import { SocketContext, socket } from "./context/socket";

// CSS
import "./css/style.css";

const App = () => {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="host" element={<HostRoom />} />
              <Route path="questions" element={<Questions />} />
              <Route path="waiting" element={<Waiting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
      <ToastContainer />
    </>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
