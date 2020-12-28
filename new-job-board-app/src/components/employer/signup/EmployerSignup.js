import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { useFormFields } from "../../../libs/hooks/useFormFields.js";

import React, { useState } from 'react';

import './css/EmployerSignup.css';

function EmployerSignup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldValidationMessage, setFieldValidationMessage] = useState("");
  const [areFieldsValid, setAreFieldsValid] = useState(false);

  const onSubmit = () => {
    // validate fields
    if (fields.email.length === 0) {
      setFieldValidationMessage("Please enter a email");
    } else if (fields.confirmEmail.length === 0) {
      setFieldValidationMessage("Please confirm your email");
    } else if (fields.email !== fields.confirmEmail) {
      setFieldValidationMessage("Please ensure your emails match");
    } else if (fields.password.length < 6) {
      setFieldValidationMessage("Please enter a password of 6 characters or longer");
    } else if (fields.password !== fields.confirmPassword) {
      setFieldValidationMessage("Please ensure your passwords match");
    } else {
        // TODO: Hook up with backend and actually sign up this user
      setFieldValidationMessage("");
      setAreFieldsValid(true);
    }
  }

  return (
    <div className="root">
      <h1>
        Employer Signup
      </h1>
      <Form className="form">
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmEmail">
          <Form.Label>Confirm email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Confirm email"
            value={fields.confirmEmail}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confrimPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={fields.confrimPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button className="button" onClick={onSubmit} variant="primary">
          Sign Up
        </Button>
        {
            fieldValidationMessage.length !== 0
              &&
              <div class="alert alert-danger" role="alert">
                {fieldValidationMessage}
              </div>
        }
        {
            areFieldsValid
              &&
              <div class="alert alert-success" role="alert">
                Success!
              </div>
        }
      </Form>
    </div>
  );
}

export default EmployerSignup;
