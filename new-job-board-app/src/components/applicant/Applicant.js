import ApplicantLogin from "./login/ApplicantLogin.js";
import ApplicantSignup from "./signup/ApplicantSignup.js";
import ApplicantConsole from "./console/ApplicantConsole";

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function Applicant() {
  return (
    <Router>
      <Switch>
        <Route path="/applicant" exact>
          <h2>Hello Applicant</h2>
        </Route>
        <Route path="/applicant/signup" component={ApplicantSignup} />
        <Route path="/applicant/login" component={ApplicantLogin} />
        <Route path="/applicant/applicant-console" component={ApplicantConsole} />
      </Switch>
    </Router>
  );
}

export default Applicant;
