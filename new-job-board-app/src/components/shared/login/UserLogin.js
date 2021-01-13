import { Button, InputGroup, Form, FormControl, Toast } from "react-bootstrap";
import {
  loginUserService,
  getSessionService,
} from "../../../services/AccountServices";
import React, { useState, useEffect } from "react";

import "./css/UserLogin.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    getSessionService().then((response) => {
      response.json().then((data) => {
        if (data["session"]) {
          if (data["session"]["user_type"] === 1) {
            window.location.assign("/applicant/applicant-console");
          } else {
            window.location.assign("/employer/employer-console");
          }
        }
      });
    });
  }, []);

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
              setValidationMessage(data["errorMessage"]);
            } else {
              if (data["userType"] === 1) {
                window.location.assign("/applicant/applicant-console");
              } else {
                window.location.assign("/employer/employer-console");
              }
            }
          });
        })
        .catch((error) => {
          setValidationMessage(error);
        });
    }
    setValidated(true);
  };

  return (
    <div className="root">
      <h1>Login</h1>
      <div className="loginForm">
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
        {validationMessage.length !== 0 && (
          <div className="alert alert-danger" role="alert">
            {validationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
