import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";

function EmployerConsoleNavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/employer/employer-console">Console</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="/employer/account"> Account</Nav.Link>
      <Nav.Link href="/employer/create-job-posting"> Create Job Posting</Nav.Link>

      </Navbar.Collapse>
      <Button onClick={props.handleLogout}>Logout</Button>
    </Navbar>
  );
}

export default EmployerConsoleNavBar;
