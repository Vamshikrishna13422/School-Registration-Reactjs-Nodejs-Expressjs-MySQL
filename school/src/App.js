import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Schools from "./components/Schools";
import SchoolList from "./components/Dashboard/SchoolList.js";
import MySchools from "./components/Dashboard/MySchools.js";
import MyProfile from "./components/Dashboard/MyProfile.js";
import LogoutUser from "./components/Dashboard/Logout.js";

const School = () => {
  const loginuser = false;
  
  return (
    <>
      {loginuser ? (
        <BrowserRouter>
          <Routes>
            <Route path="/user/schools" element={<SchoolList />} />
            <Route path="/user/myschools" element={<MySchools />} />
            <Route path="/user/profile" element={<MyProfile />} />
            <Route path="/user/logout" element={<LogoutUser />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Schools" element={<Schools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default School;

