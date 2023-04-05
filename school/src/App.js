import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Schools from "./components/Schools";
import SchoolList from "./components/Dashboard/schoolist.js";
import MySchools from "./components/Dashboard/MySchools.js";
import MyProfile from "./components/Dashboard/MyProfile.js";
import LogoutUser from "./components/Dashboard/Logout.js";
import DetailsOfSchool from "./components/Dashboard/DetailsOfSchool.js";
import SchoolDetalis from "./components/SchoolDetalis.js";
import privateRoute from "./privateRoute/index.jsx";

const App = () => {
  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path="/user/schools" 
            element={
            <privateRoute>
              <SchoolList/>
              </privateRoute>
              } />
            <Route path="/user/myschools" element={<MySchools />} />
            <Route path="/user/profile" element={<MyProfile />} />
            <Route path="/user/logout" element={<LogoutUser />} />
            <Route path="/user/school/:sid" element={<DetailsOfSchool/>} />
            <Route path="/" element={<Home />} />
            <Route path="/Schools" element={<Schools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/school/:sid" element={<SchoolDetalis/>} />
          </Routes>
        </BrowserRouter>
      
    </>
  );
};

export default App;

