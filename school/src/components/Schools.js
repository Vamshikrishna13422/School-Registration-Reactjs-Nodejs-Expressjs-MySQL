import React, { useEffect, useState} from "react";
import Header from "./Header";
import SchoolsList from "./schoolsList";

const Schools = () => {

const [listOfSchools, setListOfSchools] =useState([]); 
useEffect(() => {
  const options={
    method:"GET",
  };
  fetch("http://localhost:3089/school/i/list/",options)
  .then((response) => response.json())
  .then((res) => setListOfSchools (res.results));
},[]);


return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <h1>Schools</h1>
        <div className="row p-2">
          {listOfSchools.length !== 0 ? ( 
            <SchoolsList schoolsList={listOfSchools} />
        ): (
          <>
          <p>Loading Schools....</p>
          </>
        )}
        </div>
        </div>
  </>
        );
};

export default Schools;
