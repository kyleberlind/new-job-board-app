import { Button, InputGroup, Form, FormControl, Toast } from "react-bootstrap";
import { loginUserService } from "../../../services/AccountServices";
import React, { useState } from "react";

import "./css/EmployerLogin.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

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
          setValidationMessage(error);
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
        {validationMessage.length !== 0 && (
          <div class="alert alert-danger" role="alert">
            {validationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
