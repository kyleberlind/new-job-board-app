import React, { useState } from "react";
import { Button, Card, Form, Container, Message } from "semantic-ui-react";
import { APPLICANT_USER_TYPE } from "../../../constants/applicant/ApplicantConstants.js";
import { signUpApplicantService } from "../../../services/AccountServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";

function ApplicantSignup() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    confirmEmailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const [resumeFile, setResumeFile] = useState();
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (validate()) {
      signUpApplicantService(fields, APPLICANT_USER_TYPE)
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            if (data["hasError"]) {
              setValidationMessage(data["errorMessage"]);
            } else {
              console.log(data["userType"]);
              window.location.assign("applicant/applicant-console");
            }
          });
        })
        .catch((error) => {
          setValidationMessage(error["errorMessage"]);
        });
      setValidationMessage("");
    }
  };

  const onResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
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
      <Card.Group>
        <Card fluid>
          <Card.Header>
            <Container>
              Applicant Signup
              <Button basic floated="right" href="/employer-signup">
                Sign Up As Employer?
              </Button>
            </Container>
          </Card.Header>
          <Card.Content>
            <Form onSubmit={handleSubmitButtonClick}>
              <Form.Group widths="equal">
                <Form.Field
                  autoFocus
                  label="First Name"
                  control="input"
                  name="firstName"
                  required
                  fluid
                  placeholder="Enter first name"
                  value={fields.firstName}
                  onChange={handleFieldChange}
                />
                <Form.Field
                  label="Last Name"
                  control="input"
                  name="lastName"
                  required
                  placeholder="Enter last name"
                  value={fields.lastName}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  name="emailAddress"
                  label="Email address"
                  required
                  type="email"
                  control="input"
                  placeholder="Enter email"
                  value={fields.emailAddress}
                  onChange={handleFieldChange}
                />
                <Form.Field
                  type="email"
                  label="Confirm Email Address"
                  required
                  name="confirmEmailAddress"
                  control="input"
                  placeholder="Confirm email"
                  value={fields.confirmEmailAddress}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  label="Password"
                  type="password"
                  required
                  name="password"
                  control="input"
                  placeholder="Enter password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
                <Form.Field
                  label="Confirm password"
                  name="confirmPassword"
                  required
                  control="input"
                  type="password"
                  placeholder="Confirm Password"
                  value={fields.confirmPassword}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Button width={6} input type="file" onClick={onResumeUpload}>
                Upload Resume
              </Form.Button>
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
      </Card.Group>
    </Container>
  );
}

export default ApplicantSignup;
