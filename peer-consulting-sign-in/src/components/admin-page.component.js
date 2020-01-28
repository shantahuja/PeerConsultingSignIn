import React, { Component } from "react";
import axios from "axios";
import CsvDownloader from "react-csv-downloader";

const SignIn = props => (
  <tr>
    <td>{props.signIn.studentId}</td>
    <td>{props.signIn.date}</td>
    <td>{props.signIn.time}</td>
  </tr>
);

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  signInCollection() {
    return this.state.signInCollection.map(currentSignIn => {
      return <SignIn signIn={currentSignIn} key={currentSignIn._id} />;
    });
  }

  render() {
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
            </tr>
          </thead>
          <tbody>{this.signInCollection()}</tbody>
        </table>
        <CsvDownloader
          filename="myfile"
          separator=";"
          columns={columns}
          datas={datas}
          text="DOWNLOAD"
        />
      </div>
    );
  }
}
