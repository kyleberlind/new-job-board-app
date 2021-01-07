import { Button, InputGroup, Form, FormControl, Toast } from "react-bootstrap";
import { loginUserService } from "../../../services/AccountServices";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";

import "./css/EmployerLogin.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (input) => {
    setEmail(input.target.value);
  };

  const onPasswordChange = (input) => {
    setPassword(input.target.value);
  };

  const handleSubmitButtonClick = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      loginUserService(email, password, 2)
        .then((response) => {
          response.json().then((data) => {
            if (data["hasError"] === true) {
              setErrorMessage(data["errorMessage"]);
              setShowToast(true);
            } else {
              if (data["userType"] === 1) {
                window.location.assign("applicant-console");
              } else {
                window.location.assign("employer-console");
              }
            }
          });
        })
        .catch((error) => {
          setErrorMessage(error);
        });
    }
    setValidated(true);
  };

  return (
    <div className="root">
      <h1>Employer Login</h1>
      <div className="form">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitButtonClick}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              onChange={(input) => onEmailChange(input)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              onChange={(input) => onPasswordChange(input)}
              type="password"
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="submitButton" type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </div>
      <Toast
        show={showToast}
        onClose={() => {
          setShowToast(false);
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">
            Oops! Something went Wrong.
          </strong>
        </Toast.Header>
        <Toast.Body>
          <small>{errorMessage}</small>
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default UserLogin;
