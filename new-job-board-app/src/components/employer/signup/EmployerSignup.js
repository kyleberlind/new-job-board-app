import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { EMPLOYER_USER_TYPE } from "../../../constants/employer/EmployerConstants";
import { signUpUserService } from "../../../services/AccountServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";

import React, { useState } from "react";

import "./css/EmployerSignup.css";

function EmployerSignup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [validationMessage, setValidationMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (validate(event.currentTarget)) {
      signUpUserService(fields.email, fields.password, EMPLOYER_USER_TYPE)
        .then((response) => {
          response.json().then((data) => {
            if (data["hasError"] === true) {
              setValidationMessage(data["errorMessage"]);
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
          setValidationMessage(error["errorMessage"])
        });
      setValidationMessage("");
    }
    setValidated(true);
  };

  const validate = (form) => {
    if (fields.email !== fields.confirmEmail) {
      setValidationMessage("Emails must match");
      return false;
    }
    if (fields.password !== fields.confirmPassword) {
      setValidationMessage("Passwords must match");
      return false;
    }
    return form.checkValidity();
  };
  return (
    <div className="root">
      <h1>Employer Signup</h1>
      <Form
        noValidate
        className="form"
        validated={validated}
        onSubmit={handleSubmitButtonClick}
      >
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={fields.email}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmEmail">
          <Form.Label>Confirm email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Confirm email"
            value={fields.confirmEmail}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Please confirm email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={fields.password}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Please confirm your password
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="button" type="submit" variant="primary">
          Sign Up
        </Button>
        {validationMessage.length !== 0 && (
          <div class="alert alert-danger" role="alert">
            {validationMessage}
          </div>
        )}
      </Form>
    </div>
  );
}

export default EmployerSignup;
