import {
  loginUserService,
  getSessionService,
} from "../../../services/AccountServices";
import React, { useState, useEffect } from "react";
import { Form, Input, TextArea } from "semantic-ui-react-form-validator";
import { Button, Card, Container } from "semantic-ui-react";

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
    event.preventDefault();
    event.stopPropagation();
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
  };

  return (
    <Container fluid textAlign="center">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Content>
          <Form onSubmit={handleSubmitButtonClick}>
            <Input
              validators={["required", "isEmail"]}
              errorMessages={[
                "Please enter an email address",
                "Please enter a valid mail address",
              ]}
              onChange={(input) => onEmailChange(input)}
              value={email}
              type="email"
              placeholder="Enter an Email Address"
            />

            <Input
              validators={["required"]}
              errorMessages={["Please enter a password"]}
              onChange={(input) => onPasswordChange(input)}
              value={password}
              type="password"
              placeholder="Password"
            />
            <Button fluid type="submit">
              Submit
            </Button>
          </Form>
        </Card.Content>
        {validationMessage.length !== 0 && (
          <div className="alert alert-danger" role="alert">
            {validationMessage}
          </div>
        )}
      </Card>
    </Container>
  );
}

export default UserLogin;
