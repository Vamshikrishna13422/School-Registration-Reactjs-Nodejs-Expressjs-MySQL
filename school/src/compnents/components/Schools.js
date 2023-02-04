import React from "react";
import Header from "./Header";

const schools = () => {
  return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <h1>schools</h1>
        <div className="row p-2">
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>school Name</h3>
              <p>
                warangal public school
              </p>
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>Jan 22, 2023</b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary">Take admission</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>school Name </h3>
              <p>
                Delhi Public School
              </p>
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>Jan 22, 2023</b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary">Take admission</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default schools;