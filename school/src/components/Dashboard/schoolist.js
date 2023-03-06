import React, { useEffect, useState} from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
//import SchoolsList from "../SchoolsList";

const SchoolsList = () => {
  const navigate= useNavigate();
  const [listOfSchools, setListOfSchools] =useState([]);
  const [userAuth, setUserAuth] =useState();
  const token= localStorage.getItem("token");
  
 // if(!userlogin) {
    //localStorage.removeItem("token");
    //localStorage.removeItem("userLogin");
    //navigate("/login");
  //}

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
    } else  {
      localStorage.removeItem('token');
      navigate('/login');
    }
  });
} else {
  navigate('/login');
}
  },[]);

  if(userAuth) {
    const options={
      method:"GET",
    };
    fetch("http://localhost:3089/school/i/list/",options)
    .then((response) => response.json())
    .then((res) => setListOfSchools (res.results));
  }


  const listview =listOfSchools.map((school, i) => {
    return(
    <div className="col-md-6 p-2 mb-2" key={i}>
  <div className="border border-primary rounded p-3 shadow-sm">
    <h3>{school.school_name}</h3>
    <p>{school.school_description}</p>
    <hr />
    <div className="row">
      <div className="col text-left">
        <b>
        {school.adimission_date} | {school.school_fee}
        </b>
      </div>
      <div className="col text-right">
      <button className="btn btn-primary"onclick={() => {
        navigate(`/user/school/${school.school_id}`);
      }}
      >
        Take Admission
        </button>
      </div>
    </div>
  </div>
  </div>
  
  )
})
  
  return (
    <>
      <Header />
      <div className="container">
      <div className="row">{listview}</div>
      </div>
  </>
  );
};

export default SchoolsList;
