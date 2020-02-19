import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastsContainer, ToastsStore } from "react-toasts";

export default function CreateSignIn() {
  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: "onChange"
  });

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

  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onChangeStudentId = e => {
    setStudentId(e.target.value);
  };

  const onChangePurposeOfVisit = e => {
    setPurposeOfVisit(e.target.value);
  };

  const onSubmit = e => {
    const signIn = {
      studentId: studentId,
      date: date,
      time: time,
      purposeOfVisit: purposeOfVisit
    };

    console.log(signIn);

    axios
      .post("http://localhost:5000/signInCollection/add", signIn)
      .then(response => {
        ToastsStore.success("Thanks for signing in!");
        console.log(response.data);
      });

    setStudentId("");

    window.setTimeout(function() {
      window.location.reload();
    }, 3000);
  };

  return (
    <div>
      <h3>Sign In!</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Student ID: </label>
          <input
            name="Student ID"
            type="text"
            required
            onChange={onChangeStudentId}
            className="form-control"
            ref={register({
              required: true,
              pattern: {
                value: /^[%][0-9]{9}[?]$|^[0-9]{9}$/,
                message: "must be 9 digits or % + 9 digits + ?"
              }
            })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <label>Purpose of visit: </label>
        <select
          name="Purpose"
          type="text"
          required
          className="form-control"
          defaultValue=""
          onChange={onChangePurposeOfVisit}
          ref={register({ required: true })}
        >
          <option disabled={true} value="">
            Select...
          </option>
          <option value="Self-study">Self-study</option>
          <option value="Tutor help">Tutor help</option>
          <option value="Both">Both</option>
        </select>
        <div className="form-group">
          <button
            disabled={
              !formState.dirty || (formState.dirty && !formState.isValid)
            }
            type="submit"
            value="Create Sign-In"
            className="btn btn-primary"
          >
            Sign-In!
          </button>
          <ToastsContainer store={ToastsStore} position={"top_center"} />
        </div>
      </form>
    </div>
  );
}
