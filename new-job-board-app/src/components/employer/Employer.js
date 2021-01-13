import UserLogin from "../shared/login/UserLogin.js";
import EmployerSignup from "./signup/EmployerSignup.js";
import EmployerConsole from "./console/EmployerConsole.js";
import EmployerConsoleNavBar from "./console/EmployerConsoleNavBar.js";
import CreateJobPosting from "./createJobPosting/CreateJobPosting";
import { Container } from "react-bootstrap";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { logoutService } from "../../services/AccountServices";

function Employer() {
  const handleLogout = () => {
    logoutService()
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <EmployerConsoleNavBar handleLogout={handleLogout} />
      <Router>
        <Switch>
          <Route path="/employer/" exact>
            <h2>Hello Employer</h2>
          </Route>
          <Route path="/employer/signup" component={EmployerSignup} />
          <Route path="/employer/login" component={UserLogin} />
          <Route
            path="/employer/create-job-posting"
            component={CreateJobPosting}
          />
          <Route
            path="/employer/employer-console"
            component={EmployerConsole}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default Employer;
