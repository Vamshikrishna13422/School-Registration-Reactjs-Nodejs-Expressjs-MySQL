import React, { useEffect, useState} from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const MySchools = () => {
  const navigate= useNavigate();
  const [userAuth, setUserAuth] =useState();
  const [authUserDetails,setAuthUserDetails] =useState([]);
  const token= localStorage.getItem("token");
  
  useEffect(() => {
  if(token !== null || undefined) {
    const options={
      method:"POST",
      headers:{ "content-Type":"application/json", 
      local_header_key: token,
      },
    };
   fetch("http://localhost:3089/user/auth/",options)
  .then((response) => response.json())
  .then((res) => {
    if(res.success === true){
      setUserAuth(res.success);
      setAuthUserDetails(res.user);
    } else  {
      localStorage.removeItem('token');
      navigate('/login');
    }
  });
} else {
  navigate('/login');
}
  },[]);

  return (
    <>
     <Header />
      <div className="container mt-3 pt-3">
        <h1>Schools</h1>
        <div className="row p-2">
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>School One</h3>
              <b> <p> Vamshi High School </p> </b>
              <p>
                Reading, re-sharing, and posting testimonials Conducting interviews 
                Listening to videos Looking on social media for comments and reviews
              </p>
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>Jan 22, 2023</b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary">Take Admission</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>School Two</h3>
              <b> <p>Warangal Public School</p></b>
              <p>
              Infographics are another great way to showcase your school's story through visually 
              appealing graphics and statistics. 
              It's important to remember, though, you shouldn't just rely on putting numbers 
              together to create an infographic. 
              </p>
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>Jan 22, 2023</b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary">Take Admission</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySchools;
