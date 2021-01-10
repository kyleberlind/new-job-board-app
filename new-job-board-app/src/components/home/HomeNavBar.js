import { Button, Navbar, Nav, Container } from "react-bootstrap";
import React, { useState } from "react";
import "./css/HomeNavBar.css";

const HomeNavBar = props => {
  return (
    <div className="homeNavBar">
      <Navbar bg="dark" variant="dark" expand="lg" fill>
        <Navbar.Brand href="/">New Job Board Application</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button href="/login">Login</Button>
      </Navbar>
    </div>
  );
};

export default HomeNavBar;
