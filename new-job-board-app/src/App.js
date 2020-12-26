// Components
import LoginContainer from "./components/login/LoginContainer.react.js";
import Applicant from "./components/applicant/Applicant.js";
import Employer from "./components/employer/Employer.js";
import Home from "./components/home/Home.js";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



// css
import "./App.css";

// React
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Backend
import { getHelloWorldMessageService } from "./services/HelloWorldServices";

// TODO: should probably move all routing to a separate file


function App() {
  const handleButtonClick = () => {
    getHelloWorldMessageService()
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">New Job Board Application</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/employer" component={Employer} />
        <Route path="/applicant" component={Applicant} />
        <Route path="/about" component={About} />
        <button onClick={handleButtonClick}>click to connect to backend </button>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

export default App;
