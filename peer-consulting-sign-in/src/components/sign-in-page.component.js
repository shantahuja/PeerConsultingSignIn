import React, { Component } from "react";
import axios from "axios";

export default class CreateSignIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentId = this.onChangeStudentId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.date = new Date().toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles"
    });
    this.time = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles"
    });

    this.state = {
      studentId: "",
      date: new Date(),
      time: new Date()
    };
  }

  onChangeStudentId(e) {
    this.setState({
      studentId: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const signIn = {
      studentId: this.state.studentId,
      date: this.state.date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles"
      }),
      time: this.state.date.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles"
      })
    };

    console.log(signIn);

    axios
      .post("http://localhost:5000/signInCollection/add", signIn)
      .then(res => console.log(res.data));

    this.setState({
      studentId: ""
    });
  }

  render() {
    return (
      <div>
        <h3>Sign In!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Student ID: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.studentId}
              onChange={this.onChangeStudentId}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Sign-In"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
