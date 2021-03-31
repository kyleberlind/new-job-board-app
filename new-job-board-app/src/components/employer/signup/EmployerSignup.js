import React, { useState } from "react";
import { EMPLOYER_USER_TYPE } from "../../../constants/employer/EmployerConstants";
import { signUpEmployerService } from "../../../services/AccountServices";
import { Card, Form, Container, Message } from "semantic-ui-react";
import {EMPLOYER_SIZE_OPTIONS} from "../../../constants/employer/EmployerConstants"

function EmployerSignup() {
  const [fields, setFields] = useState({
    emailAddress: "",
    confirmEmailAddress: "",
    password: "",
    confirmPassword: "",
    employerName: "",
    employerSize: "0-10",
  });

  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (validate()) {
      signUpEmployerService(fields, EMPLOYER_USER_TYPE)
        .then((response) => {
          response.json().then((data) => {
            if (data["hasError"] === true) {
              setValidationMessage(data["errorMessage"]);
            } else {
              window.location.assign("employer/employer-console");
            }
          });
        })
        .catch((error) => {
          setValidationMessage(error["errorMessage"]);
        });
      setValidationMessage("");
    }
  };

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const validate = () => {
    if (fields.emailAddress !== fields.confirmEmailAddress) {
      setValidationMessage("Emails must match");
      return false;
    }
    if (fields.password !== fields.confirmPassword) {
      setValidationMessage("Passwords must match");
      return false;
    }
    return true;
  };

  return (
    <Container centered>
      <Card fluid>
        <Card.Header> Employer Signup</Card.Header>
        <Card.Content>
          <Form onSubmit={handleSubmitButtonClick}>
            <Form.Group widths="equal">
              <Form.Field
                required
                control="input"
                label="Company Name"
                name="employerName"
                placeholder="Enter company name"
                value={fields.employerName}
                onChange={handleFieldChange}
              />
              <Form.Dropdown
                placeholder="Select Company Size"
                value={fields.employerSize}
                fluid
                required
                selection
                name="employerName"
                label="Company Size"
                onChange={handleFieldChange}
                options={EMPLOYER_SIZE_OPTIONS}
              ></Form.Dropdown>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                name="emailAddress"
                required
                control="input"
                label="Email address"
                type="email"
                placeholder="Enter email"
                value={fields.emailAddress}
                onChange={handleFieldChange}
              />

              <Form.Field
                label="Confirm email address"
                name="confirmEmailAddress"
                required
                control="input"
                type="email"
                placeholder="Confirm email"
                value={fields.confirmEmailAddress}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                required
                label="Password"
                name="password"
                type="password"
                control="input"
                placeholder="Enter password"
                value={fields.password}
                onChange={handleFieldChange}
              />
              <Form.Field
                required
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                control="input"
                placeholder="Confirm Password"
                value={fields.confirmPassword}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Button type="submit" primary>
              Sign Up
            </Form.Button>
          </Form>
          {validationMessage.length !== 0 && (
            <Message
              error
              header="Sign Up Failed"
              content={validationMessage}
            />
          )}
        </Card.Content>
      </Card>
    </Container>
  );
}

export default EmployerSignup;
