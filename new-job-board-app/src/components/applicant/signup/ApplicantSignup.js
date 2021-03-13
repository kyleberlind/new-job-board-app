import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { APPLICANT_USER_TYPE } from "../../../constants/applicant/ApplicantConstants.js";
import { signUpApplicantService } from "../../../services/AccountServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";

import React, { useState } from 'react';

import './css/ApplicantSignup.css';

function ApplicantSignup() {
  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    emailAddress: "",
    confirmEmailAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [resumeFile, setResumeFile] = useState();
  const [validationMessage, setValidationMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (validate(event.currentTarget)) {
      signUpApplicantService(fields, APPLICANT_USER_TYPE)
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            if (data["hasError"]) {
              setValidationMessage(data["errorMessage"]);
            } else {
              console.log(data["userType"]);
              window.location.assign("applicant-console");
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

  const onResumeUpload = e => {
    setResumeFile(e.target.files[0]);
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
      <h1>
        Applicant Signup
      </h1>
      <Button href="/employer-signup" >
        Sign Up As Employer
      </Button>
      <Form
        noValidate
        className="form"
        validated={validated}
        onSubmit={handleSubmitButtonClick}
      >
        <Form.Group controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter first name"
            value={fields.firstName}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            placeholder="Enter last name"
            value={fields.lastName}
            onChange={handleFieldChange}
          />
          </Form.Group>
          <Form.Group controlId="emailAddress">
        <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={fields.emailAddress}
            onChange={handleFieldChange}
          />
          </Form.Group>
        <Form.Group controlId="confirmEmailAddress">
          <Form.Label>Confirm email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Confirm email"
            value={fields.confirmEmailAddress}
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Label>Resume</Form.Label>
        <input type="file" onChange={onResumeUpload}/>
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

export default ApplicantSignup;
