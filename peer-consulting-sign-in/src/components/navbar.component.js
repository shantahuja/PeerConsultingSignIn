import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        <Link to="/" className="navbar-brand">
          Peer Consulting Sign-In
        </Link>
        <div className="collapse navbar-collapse justify-content-between">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Sign-In
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <NavBarLogin />
          </ul>
        </div>
      </nav>
    );
  }
}
