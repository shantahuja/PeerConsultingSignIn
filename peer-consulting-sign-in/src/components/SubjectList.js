import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ToastsContainer, ToastsStore } from "react-toasts";

const Subject = props => (
  <tr>
    <td>{props.subject.name}</td>
    <td>{props.subject.description}</td>
    <td width="10%">
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

export default function SubjectList() {
  const [nameState, setNameState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [subjectCollection, setSubjectCollection] = useState([]);

  // function componentDidMount() {
  //   axios
  //     .get("http://localhost:5000/subjectCollection/")
  //     .then(response => {
  //       this.setState({ subjectCollection: response.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  useEffect(() => {
    axios
      .get("http://localhost:5000/subjectCollection/")
      .then(response => {
        setSubjectCollection(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onChangeNewName = e => {
    const name = e.target.value;
    setNameState(name);
  };

  const onChangeNewDescription = e => {
    const description = e.target.value;
    setDescriptionState(description);
  };

  const onSubmit = e => {
    const subject = {
      name: nameState,
      description: descriptionState
    };

    console.log(subject);

    axios
      .post("http://localhost:5000/subjectCollection/add", subject)
      .then(response => {
        ToastsStore.success("Subject added!");
        console.log(response.data);
      })
      .catch(error => {
        ToastsStore.error("Bad request to server!");
        console.log(error);
      });

    setNameState("");
    setDescriptionState("");
    window.setTimeout(function() {
      window.location.reload();
    }, 500);
  };

  function deleteSubject(id) {
    axios
      .delete("http://localhost:5000/subjectCollection/" + id)
      .then(response => {
        ToastsStore.success("Subject deleted!");
        console.log(response.data);
      });

    setSubjectCollection(subjectCollection.filter(el => el._id !== id));
  }

  function subjectList() {
    return subjectCollection
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(currentsubject => {
        return (
          <Subject
            subject={currentsubject}
            deleteSubject={deleteSubject}
            key={currentsubject._id}
          />
        );
      });
  }

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
        <tbody>{subjectList()}</tbody>
      </table>
      <h3>Create New Subject</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Subject: </label>
          <input
            type="text"
            required
            className="form-control"
            value={nameState}
            onChange={onChangeNewName}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            required
            className="form-control"
            value={descriptionState}
            onChange={onChangeNewDescription}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Subject"
            className="btn btn-primary"
          />
        </div>
        <ToastsContainer store={ToastsStore} position={"top_center"} />
      </form>
    </div>
  );
}
