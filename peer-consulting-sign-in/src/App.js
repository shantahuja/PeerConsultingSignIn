import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import SignInPage from "./components/sign-in-page.component";
import AdminPage from "./components/admin-page.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SignInPage} />
        <Route path="/admin" exact component={AdminPage} />
      </div>
    </Router>
  );
}

export default App;
