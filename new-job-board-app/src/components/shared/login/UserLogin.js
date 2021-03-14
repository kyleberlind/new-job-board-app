import {
  loginUserService,
  getSessionService,
} from "../../../services/AccountServices";
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form} from "semantic-ui-react";

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
            <Form.Input
              required
              name="email"
              type="email"
              onChange={(input) => onEmailChange(input)}
              value={email}
              placeholder="Enter an Email Address"
            />

            <Form.Input
              name="password"
              required
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
