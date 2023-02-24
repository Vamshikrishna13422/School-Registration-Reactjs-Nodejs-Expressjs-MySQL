import React from "react";
import Header from "./Header";

const SchoolsList = () => {
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

export default SchoolsList;
