import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastsContainer, ToastsStore } from "react-toasts";
import "../App.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      loggedIn,
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;

    const login = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:5000/userAdminCollection/authenticate", login)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/");
        localStorage.setItem("token", "999888777");
        ToastsStore.success(
          "Thanks for logging in, administrator!\nYour admin options should show momentarily."
        );
      })
      .catch((error) => {
        ToastsStore.error("Error logging in! ");
        console.log(error);
      });

    window.setTimeout(function () {
      window.location.reload();
    }, 2000);
  }
  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/admin" />;
    }
    return (
      <div class="SignIns">
        <h3 class="container center_divLoginTitle">Login</h3>
        <br />
        <form onSubmit={this.submitForm} class="container center_div">
          <div className="form-group">
            <input
              className="form-control"
              autoFocus={true}
              type="text"
              placeholder="username"
              name="username"
              autoComplete="off"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <div className="form-group" class="container center_divLogInButton">
              <button
                type="submit"
                value="Create Sign-In"
                className="btn btn-primary mt-3"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <ToastsContainer store={ToastsStore} position={"top_center"} />
      </div>
    );
  }
}
