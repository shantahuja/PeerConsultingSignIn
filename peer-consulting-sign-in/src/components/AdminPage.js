import React, { Component } from "react";
import axios from "axios";
import CsvDownloader from "react-csv-downloader";
import { Redirect } from "react-router-dom";

const SignIn = props => (
  <tr>
    <td>{props.signIn.studentId}</td>
    <td>{props.signIn.date}</td>
    <td>{props.signIn.time}</td>
    <td>{props.signIn.purposeOfVisit}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteSignIn(props.signIn._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.deleteSignIn = this.deleteSignIn.bind(this);

    this.state = {
      loggedIn,
      signInCollection: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/signInCollection/")
      .then(res => {
        this.setState({ signInCollection: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteSignIn(id) {
    axios
      .delete("http://localhost:5000/signInCollection/" + id)
      .then(res => console.log(res.data));
    this.setState({
      signInCollection: this.state.signInCollection.filter(el => el._id !== id)
    });
  }

  deleteSignInCollection() {
    axios.delete("http://localhost:5000/signInCollection/deleteAll/");
    window.location.reload();
  }

  signInCollection() {
    return this.state.signInCollection.map(currentSignIn => {
      return (
        <SignIn
          signIn={currentSignIn}
          deleteSignIn={this.deleteSignIn}
          key={currentSignIn._id}
        />
      );
    });
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    const columns = [
      {
        id: "studentId",
        displayName: "Student ID"
      },
      {
        id: "date",
        displayName: "Date"
      },
      {
        id: "time",
        displayName: "Time"
      },
      {
        id: "purposeOfVisit",
        displayName: "Purpose of Visit"
      }
    ];
    console.log(this.signInCollection());

    const datas = this.state.signInCollection;

    return (
      <div>
        <h3>Logged Sign-Ins</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Student ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Purpose Of Visit</th>
            </tr>
          </thead>
          <tbody>{this.signInCollection()}</tbody>
        </table>
        <CsvDownloader
          id="btnDownload"
          className="btn btn-primary btn-sm btn-space"
          filename="myfile"
          separator=";"
          columns={columns}
          datas={datas}
          text="DOWNLOAD"
        />
        <button
          type="button"
          id="btnDeleteAll"
          className="btn btn-primary btn-sm btn-space"
          onClick={() => {
            this.deleteSignInCollection();
          }}
        >
          Delete All
        </button>
      </div>
    );
  }
}
