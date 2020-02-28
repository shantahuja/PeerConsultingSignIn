import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Subject = props => (
  <tr>
    <td>{props.subject.name}</td>
    <td>{props.subject.description}</td>
    <td>
      <Link to={"/edit/" + props.subject._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteSubject(props.subject._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class SubjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteSubject = this.deleteSubject.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = { name: "", description: "", subjectCollection: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/subjectCollection/")
      .then(response => {
        this.setState({ subjectCollection: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const subject = {
      name: this.state.name,
      description: this.state.description
    };

    console.log(subject);

    axios
      .post("http://localhost:5000/subjectCollection/add", subject)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  deleteSubject(id) {
    axios
      .delete("http://localhost:5000/subjectCollection/" + id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      subjectCollection: this.state.subjectCollection.filter(
        el => el._id !== id
      )
    });
  }

  subjectList() {
    return this.state.subjectCollection.map(currentsubject => {
      return (
        <Subject
          subject={currentsubject}
          deleteSubject={this.deleteSubject}
          key={currentsubject._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Subject List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.subjectList()}</tbody>
        </table>
        <h3>Create New Subject</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Subject: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            ></input>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Subject"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
