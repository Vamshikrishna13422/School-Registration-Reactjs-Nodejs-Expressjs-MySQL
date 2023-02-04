import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login.js";
import Register from "./components/user/Register.js";
import Home from "./components/user/Home.js";
import Schools from "./components/user/Schools.js";

const School = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default School;
