import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import SignInPage from "./components/SignInPage";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import withAuth from "./components/WithAuth";

function App() {
  const token = localStorage.getItem("token");

  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SignInPage} />
        {loggedIn ? (
          <Route path="/admin" exact component={withAuth(AdminPage)} />
        ) : (
          <Redirect to="/" />
        )}
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
      </div>
    </Router>
  );
}

export default App;
