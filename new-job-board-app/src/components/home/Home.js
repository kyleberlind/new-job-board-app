import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeNavBar from "./HomeNavBar";
import ApplicantSignup from "../applicant/signup/ApplicantSignup";
import UserLogin from "../shared/login/UserLogin";
import { Container } from "semantic-ui-react";

function Home() {
  return (
    <Container fluid>
      <HomeNavBar />
      <Router>
        <Switch>
        </Switch>
      </Router>
    </Container>
  );
}

export default Home;
