import React, { Component } from "react";
import axios from "axios";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = {
      name: "",
      description: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/subjectCollection/" + this.props.match.params.id
      )
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description
        });
      })
      .catch(function(error) {
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
      .post(
        "http://localhost:5000/subjectCollection/update/" +
          this.props.match.params.id,
        subject
      )
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Subject</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
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
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
