import EmployerLogin from "./login/EmployerLogin.js";
import EmployerSignup from "./signup/EmployerSignup.js";

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function Employer() {
  return (
    <Router>
      <Switch>
        <Route path="/employer/" exact>
          <h2>Hello Employer</h2>
        </Route>
        <Route path="/employer/signup" component={EmployerSignup} />
        <Route path="/employer/login" component={EmployerLogin} />
      </Switch>
    </Router>
  );
}

export default Employer;
