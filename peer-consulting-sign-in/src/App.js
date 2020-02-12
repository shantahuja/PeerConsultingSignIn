import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import SignInPage from "./components/SignInPage";
import AdminPage from "./components/AdminPage";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SignInPage} />
        {isAuthenticated ? (
          <Route path="/admin" exact component={AdminPage} />
        ) : (
          <Redirect to="/" />
        )}
      </div>
    </Router>
  );
}

export default App;
