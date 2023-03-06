import React, { useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate =useNavigate();
  const [inputrollnumber, setInputrollnumber] = useState("");
  const [mypassword, setpassword] = useState("");
  const [userLogin, setuserLogin] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const addrollnumber = (e) => {
    setInputrollnumber(e.target.value);
  };

  const addPassword = (e) => {
    setpassword(e.target.value);
  };

  const submitTheFrom = (e) => {
    e.preventDefault();

    let newLogin = {
      username: inputrollnumber,
      password: mypassword,
    };

    
    const options={
      method:"Post",
      headers:{ "content-Type":"application/json" },
      body :JSON.stringify(newLogin),
    };
    fetch("http://localhost:3089/user/login/",options)
    .then((response) => response.json())
    .then((res) => {
    if(res.success === true)
    {
       setuserLogin (res.success);
       setResponseMessage (res.message);
       // localStorage.setItem("userLogin",res.success);
       localStorage.setItem("token",res.token);
       navigate("/user/schools")
    }else {
      setuserLogin (res.success);
      setResponseMessage (res.message);
    }
    });

  };

  return (
    <>
      <Header />
      <div className="container p-3 mt-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <img className="img-fluid" src="./img/login.png" />
          </div>
          <div className="col-md-6 mb-2 my-auto">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Login</b>
                </h5>
              </div>
              {userLogin === false ? responseMessage : ""}
              <hr />
              <form onSubmit={submitTheFrom}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputrollnumber"
                    aria-describedby="rollnumberHelp"
                    placeholder="Enter your rollnumber"
                    onChange={addrollnumber}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    onChange={addPassword}
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                  Get Me In
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-6 text-left">
                  <small>
                    No Account? <Link to="/register">Register Now</Link>
                  </small>
                </div>
                <div className="col-6 text-right">
                  <small>
                    <Link to="#">Forgot Password?</Link>
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

export default Login;