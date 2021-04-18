// Components
import Applicant from "./components/applicant/Applicant.js";
import Employer from "./components/employer/Employer.js";
import Home from "./components/home/Home.js";
import ApplicantSignup from "./components/applicant/signup/ApplicantSignup";
import EmployerSignup from "./components/employer/signup/EmployerSignup";
import UserLogin from "./components/shared/login/UserLogin.js";
import Toast from "./components/shared/toast/Toast"
// css
import "./App.css";

// React
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// TODO: should probably move all routing to a separate file

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/employer" component={Employer} />
      <Route path="/applicant" component={Applicant} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={ApplicantSignup} />
      <Route path="/employer-signup" component={EmployerSignup} />
      <Route path="/login" component={UserLogin} />
      <Toast />
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

export default App;
