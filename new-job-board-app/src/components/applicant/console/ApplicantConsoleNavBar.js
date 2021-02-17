import React, { useState } from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

import './css/ApplicantConsole.css';

function ApplicantConsoleNavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/applicant/applicant-console">New Job Board</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="/applicant/account"> Account</Nav.Link>
      <Nav.Link href="/applicant/applicant-console"> My Applications</Nav.Link>
      </Navbar.Collapse>
      <div className="navBarButton">
        <Button href="/applicant/job-cart">Job Cart</Button>
      </div>
      <div className="navBarButton">
        <Button onClick={props.handleLogout}>Logout</Button>
      </div>
    </Navbar>
  );
}

export default ApplicantConsoleNavBar;
