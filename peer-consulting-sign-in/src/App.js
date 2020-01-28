import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import SignInPage from "./components/sign-in-page.component";
import AdminPage from "./components/admin-page.component";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { isAuthenticated } = useAuth0();
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SignInPage} />
        {isAuthenticated && <Route path="/admin" exact component={AdminPage} />}
      </div>
    </Router>
  );
}

export default App;
