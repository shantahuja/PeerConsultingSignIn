import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

import Navbar from "./components/Navbar";
import SignInPage from "./components/SignInPage";
import SignInList from "./components/SignInList";
import SubjectList from "./components/SubjectList";
import EditSubject from "./components/EditSubject";
import Login from "./components/Login";
import Logout from "./components/Logout";
// import withAuth from "./components/WithAuth";

function App() {
  const token = localStorage.getItem("token");

  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }
  return (
    <html>
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={SignInPage} />
          {loggedIn ? (
            <Route path="/signinlist" exact component={SignInList} />
          ) : (
            <Redirect to="/" />
          )}
          {loggedIn ? (
            <Route path="/subjectlist" exact component={SubjectList} />
          ) : (
            <Redirect to="/" />
          )}
          {loggedIn ? (
            <Route path="/edit/:id" exact component={EditSubject} />
          ) : (
            <Redirect to="/" />
          )}
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
        </div>
      </Router>
    </html>
  );
}

export default App;
