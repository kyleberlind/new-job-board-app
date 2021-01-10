import React, { useState } from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

function ApplicantConsoleNavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/applicant/applicant-console">Console</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="/applicant/account"> Account</Nav.Link>
      </Navbar.Collapse>
      <Button onClick={props.handleLogout}>Logout</Button>
    </Navbar>
  );
}

export default ApplicantConsoleNavBar;
