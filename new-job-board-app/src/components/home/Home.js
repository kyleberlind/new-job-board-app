import { Button, Navbar, Nav, Container } from "react-bootstrap";
import HomeNavBar from "./HomeNavBar";
import {getSessionService} from "../../services/AccountServices"
import React, { useState, useEffect } from "react";

import "./css/Home.css";
function Home() {
  return (
    <Container fluid>
      <HomeNavBar logout/>
      <div className="root">
        <div className="buttonContainer">
          <Button
            variant="primary"
            className="button"
            href={"/applicant/signup"}
            block
          >
            Sign up as Applicant
          </Button>
          <Button
            className="button"
            href={"/employer/signup"}
            variant="outline-primary"
            block
          >
            Sign up as Employer
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Home;
