import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../ot-logo.png";

function Navbar() {
  const token = localStorage.getItem("token");

  let loggedIn = false;
  if (token === "999888777") {
    loggedIn = true;
  }

  console.log(loggedIn);

  return (
    <nav
      class="color-nav"
      className="navbar navbar-dark bg-dark navbar-expand-lg "
    >
      <Link to="/" className="navbar-brand">
        <img src={logo} height="35px"></img>
      </Link>
      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Sign-In
            </Link>
          </li>
          <li className="navbar-item">
            {loggedIn && (
              <Link to="/signinlist" className="nav-link">
                Sign In List
              </Link>
            )}
          </li>
          <li className="navbar-item">
            {loggedIn && (
              <Link to="/subjectlist" className="nav-link">
                Subject List
              </Link>
            )}
          </li>
        </ul>
        <ul className="navbar-nav">
          {!loggedIn && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
          {loggedIn && (
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
