import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  return (
    <div className="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link class="navbar-brand" to="/">
        schools POC
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-item nav-link" to="/">
              Home
            </Link>
            <Link class="nav-item nav-link" to="/schools">
              schools
            </Link>
            <Link class="nav-item nav-link" to="/login">
              Login
            </Link>
            <Link class="nav-item nav-link" to="/register">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;