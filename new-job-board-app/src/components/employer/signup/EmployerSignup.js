import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { EMPLOYER_USER_TYPE } from "../../../constants/employer/EmployerConstants";
import { signUpEmployerService } from "../../../services/AccountServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";

import "./css/EmployerSignup.css";

function EmployerSignup() {
  const [fields, handleFieldChange] = useFormFields({
    emailAddress: "",
    confirmEmailAddress: "",
    password: "",
    confirmPassword: "",
    employerName: "",
    employerSize: "0-10",
  });
  const [validationMessage, setValidationMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (validate(event.currentTarget)) {
      signUpEmployerService(fields, EMPLOYER_USER_TYPE)
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
          setValidationMessage(error["errorMessage"]);
        });
      setValidationMessage("");
    }
    setValidated(true);
  };

  const validate = (form) => {
    if (fields.emailAddress !== fields.confirmEmailAddress) {
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
        <Form.Group controlId="employerName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            required
            placeholder="Enter company name"
            value={fields.employerName}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a Company Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="employerSize">
          <Form.Label>Company Size</Form.Label>
          <Form.Control as="select" onChange={handleFieldChange}>
            <option value="0-10">0-10</option>
            <option value="10-500">10-50</option>
            <option value="10-500">50-500</option>
            <option value="500-1000">500-1000</option>
            <option value="1000-3000">1000-3000</option>
            <option value="1000-3000">3000-10000</option>
            <option value="1000-3000">{">"}10000</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="emailAddress">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={fields.emailAddress}
            onChange={handleFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmEmailAddress">
          <Form.Label>Confirm email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Confirm email"
            value={fields.confirmEmailAddress}
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
          <div className="alert alert-danger" role="alert">
            {validationMessage}
          </div>
        )}
      </Form>
    </div>
  );
}

export default EmployerSignup;
