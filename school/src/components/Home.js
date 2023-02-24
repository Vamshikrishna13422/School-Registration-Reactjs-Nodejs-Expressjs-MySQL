import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container mt-3 p-3">
        <div className="row p-2">
          <div className="col-md-6 p-3 my-auto text-center">
            <h3>
              <b>
                school Registrations<br /> POC
              </b>
            </h3>
            <br />
            <p>- Project By Vamshi Krishna</p>
          </div>
          <div className="col-md-6 p-3">
            <p>
              This is a poc of School registration <br />
              <br />
              Tech used in this project :<br />
              <br />
              <b>HTML</b>
              <br />
              <b>CSS</b>
              <br />
              <b>REACT JS</b>
              <br />
              <b>NODE JS</b>
              <br />
              <b>EXPRESS JS</b>
              <br />
              <b>MySQL DB</b>
              <br />
            </p>
            <p>
              Dynamically developed with REST APIS in Node with MySQL database
            </p>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="text-center">
          <p>Copy @ Vamshi Krishna - 2023</p>
        </div>
      </div>
    </>
  );
};

export default Home;