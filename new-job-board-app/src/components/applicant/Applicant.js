import ApplicantLogin from "./login/ApplicantLogin.js";
import ApplicantSignup from "./signup/ApplicantSignup.js";
import ApplicantConsole from "./console/ApplicantConsole";
import ApplicantAccount from "./account/ApplicantAccount";
import ApplicantJobCart from "./job_cart/ApplicantJobCart";
import { Container } from "react-bootstrap";
import { logoutService } from "../../services/AccountServices";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplicantConsoleNavBar from "./console/ApplicantConsoleNavBar";

function Applicant() {
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
      <ApplicantConsoleNavBar handleLogout={handleLogout} />
      <Router>
        <Switch>
          <Route path="/applicant" exact>
            <h2>Hello Applicant</h2>
          </Route>
          <Route path="/applicant/account" component={ApplicantAccount} />
          <Route path="/applicant/signup" component={ApplicantSignup} />
          <Route path="/applicant/login" component={ApplicantLogin} />
          <Route
            path="/applicant/applicant-console"
            component={ApplicantConsole}
          />
          <Route
            path="/applicant/job-cart"
            component={ApplicantJobCart}
          />
        </Switch>
      </Router>
    </Container>
  );
}

export default Applicant;
