import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
  render() {
    return (
      <div class="SignIns">
        <h1>You're logged out.</h1>
        <Link to="/">Go back to sign-in page.</Link>
      </div>
    );
  }
}
