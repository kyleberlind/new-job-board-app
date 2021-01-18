// Components
import Applicant from "./components/applicant/Applicant.js";
import Employer from "./components/employer/Employer.js";
import Home from "./components/home/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";

// css
import "./App.css";

// React
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLogin from "./components/shared/login/UserLogin.js";

// TODO: should probably move all routing to a separate file

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/employer" component={Employer} />
        <Route path="/applicant" component={Applicant} />
        <Route path="/login" component={UserLogin} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

export default App;
