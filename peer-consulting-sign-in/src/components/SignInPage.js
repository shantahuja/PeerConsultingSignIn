import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateSignIn() {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles"
    })
  );
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles"
    })
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onChangeStudentId = e => {
    setStudentId(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const signIn = {
      studentId: studentId,
      date: date,
      time: time
    };

    console.log(signIn);

    axios
      .post("http://localhost:5000/signInCollection/add", signIn)
      .then(res => console.log(res.data));

    setStudentId("");

    window.setTimeout(function() {
      window.location.reload();
    }, 3000);
  };

  return (
    <div>
      <h3>Sign In!</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Student ID: </label>
          <input
            type="text"
            required
            className="form-control"
            value={studentId}
            onChange={onChangeStudentId}
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
