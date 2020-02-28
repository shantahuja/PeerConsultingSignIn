import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastsContainer, ToastsStore } from "react-toasts";

const useStateWithLocalStorage = localStorageKey => {
  const [
    studentIdState,
    setStudentIdState,
    purposeOfVisit,
    setPurposeOfVisit,
    subjectSelected,
    setSubjectSelected
  ] = React.useState(localStorage.getItem(localStorageKey) || "");
  React.useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      studentIdState,
      purposeOfVisit,
      subjectSelected,
      setSubjectSelected
    );
  }, [studentIdState, purposeOfVisit, subjectSelected, setSubjectSelected]);
  return [
    studentIdState,
    setStudentIdState,
    purposeOfVisit,
    setPurposeOfVisit,
    subjectSelected,
    setSubjectSelected
  ];
};

export default function CreateSignIn() {
  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: "onChange"
  });

  const [studentIdState, setStudentIdState] = useStateWithLocalStorage(
    "studentIdInLocalStorage"
  );
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

  const [purposeOfVisit, setPurposeOfVisit] = useStateWithLocalStorage(
    "purposeOfVisitInLocalStorage"
  );

  const [subjectCollection, setSubjectCollection] = useState([]);
  const [subjectSelected, setSubjectSelected] = useStateWithLocalStorage(
    "setSubjectSelectedInLocalStorage"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

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

  const onChangeStudentId = e => {
    setStudentIdState(e.target.value);
  };

  const onChangePurposeOfVisit = e => {
    setPurposeOfVisit(e.target.value);
  };

  const onChangeSubjectSelected = e => {
    setSubjectSelected(e.target.value);
  };

  const onSubmit = e => {
    const signIn = {
      studentId: studentIdState,
      date: date,
      time: time,
      purposeOfVisit: purposeOfVisit,
      subject: subjectSelected
    };

    console.log(signIn);

    axios
      .post("http://localhost:5000/signInCollection/add", signIn)
      .then(response => {
        ToastsStore.success("Thanks for signing in!");
        console.log(response.data);
      })
      .catch(error => {
        ToastsStore.error("Bad request to server!");
        console.log(error);
      });

    setStudentIdState("");
    setPurposeOfVisit("");
    setSubjectSelected("");
    window.setTimeout(function() {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <h3>Sign In!</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            autoFocus={true}
            placeholder="Student ID"
            name="studentId"
            id="studentId"
            defaultValue={studentIdState}
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
            style={
              errors.studentId
                ? { borderLeft: "solid thick #e75480" }
                : undefined
            }
          />
        </div>
        <div className="form-group">
          <select
            name="purposeOfVisit"
            type="text"
            required
            className="form-control"
            value={purposeOfVisit}
            onChange={onChangePurposeOfVisit}
            ref={register({ required: true })}
            style={
              errors.purposeOfVisit
                ? { borderLeft: "solid thick #e75480" }
                : undefined
            }
          >
            <option disabled={true} value="">
              Purpose of visit?
            </option>
            <option value="Self-study">Self-study</option>
            <option value="Tutor help">Tutor help</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="form-group">
          <select
            name="subjectSelected"
            type="text"
            required
            className="form-control"
            value={subjectSelected}
            onChange={onChangeSubjectSelected}
            ref={register({ required: true })}
            style={
              errors.purposeOfVisit
                ? { borderLeft: "solid thick #e75480" }
                : undefined
            }
          >
            <option disabled={true} value="">
              Subject area?
            </option>
            {subjectCollection
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(subject => (
                <option key={subject.name} value={subject.description}>
                  {subject.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <button
            disabled={formState.dirty && !formState.isValid}
            type="submit"
            value="Create Sign-In"
            className="btn btn-primary mt-3"
          >
            Sign-In!
          </button>
        </div>
        <ToastsContainer store={ToastsStore} position={"top_center"} />
      </form>
    </div>
  );
}
