import React, { useState, useEffect } from "react";
import UserLogin from "../shared/login/UserLogin.js";
import EmployerSignup from "./signup/EmployerSignup.js";
import EmployerConsole from "./console/EmployerConsole.js";
import EmployerConsoleNavBar from "./console/EmployerConsoleNavBar.js";
import EmployerAccount from "./EmployerAccount";
import CreateJobPosting from "./jobPosting/CreateJobPosting";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { logoutService } from "../../services/AccountServices";
import { loadEmployerInfoService } from "../../services/employer/EmployerServices";

function Employer() {
  const [employer, setEmployer] = useState({});

  useEffect(() => {
    loadEmployerInfoService().then((response) => {
      response.json().then((data) => {
        if (!data) {
          window.location.assign("login");
        } else {
          setEmployer(data);
        }
      });
    });
  }, []);

  const handleLogout = () => {
    logoutService()
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //this component will render before the useEffect has fired so employer will be null, is there a better way to load the employer and pass it down
  return (
    <Container fluid>
      <EmployerConsoleNavBar handleLogout={handleLogout} />
      <Router>
        <Switch>
          <Route path="/employer/" exact>
            <h2>Hello {employer}</h2>
          </Route>
          <Route path="/employer/signup" component={EmployerSignup} />
          <Route path="/employer/login" component={UserLogin} />
          <Route
            path="/employer/account"
            render={() => <EmployerAccount employer={employer} />}
          />
          <Route
            path="/employer/create-job-posting"
            render={() => <CreateJobPosting employer={employer} />}
          />
          <Route
            path="/employer/employer-console"
            render={() => <EmployerConsole employer={employer} />}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default Employer;
