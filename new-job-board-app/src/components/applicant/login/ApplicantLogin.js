import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import React, { useState } from "react";

import "./css/ApplicantLogin.css";

function ApplicantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onEmailChange = (input) => {
    isSubmitted && setIsSubmitted(false);
    setEmail(input.target.value);
  };

  const onPasswordChange = (input) => {
    isSubmitted && setIsSubmitted(false);
    setPassword(input.target.value);
  };

  return (
    <div className="root">
      <h1>Applicant Login</h1>
      <div className="form">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(input) => onEmailChange(input)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(input) => onPasswordChange(input)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className="submitButton"
            onClick={() => setIsSubmitted(true)}
            variant="primary"
          >
            Submit
          </Button>
        </Form>
      </div>
      {isSubmitted && (
        <div>
          <p>Email: {email}</p>
          <p>Password: {password}</p>
        </div>
      )}
    </div>
  );
}

export default ApplicantLogin;
