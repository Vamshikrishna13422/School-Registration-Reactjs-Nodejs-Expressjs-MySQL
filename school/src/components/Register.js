import React, { useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputName, setInputName] = useState("");
  const [inputrollnumber, setInputrollnumber] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    const registerUser = {
      name: inputName,
      rollnumber: inputrollnumber,
      mobile: inputMobile,
      password: inputPassword,
    };

    console.log(registerUser);
  };

  return (
    <>
      <Header />
      <div className="container p-3 mt-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <img alt="Register" className="img-fluid" src="./img/signup.png" />
          </div>
          <div className="col-md-6 mb-2 my-auto">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Register</b>
                </h5>
              </div>
              <hr />
              <form onSubmit={registerUser}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputname"
                    aria-describedby="nameHelp"
                    placeholder="Enter Your Name"
                    onChange={(e) => setInputName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputrollnumber"
                    aria-describedby="rollnumberHelp"
                    placeholder="Enter roll number"
                    onChange={(e) => setInputEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputmobile"
                    aria-describedby="mobileHelp"
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setInputMobile(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Get Register
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-12 text-center">
                  <small>
                    Already Have Account? <Link to="/login">Login Now</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;