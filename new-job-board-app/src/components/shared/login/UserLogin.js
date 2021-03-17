import {
  loginUserService,
  getSessionService,
} from "../../../services/AccountServices";
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "semantic-ui-react";

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
    <Container fluid>
      <Card.Group centered>
        <Card>
          <Card.Header textAlign="center">Login</Card.Header>
          <Card.Content>
            <Form onSubmit={handleSubmitButtonClick}>
              <Form.Field
                required
                label="Email Address"
                control="input"
                name="email"
                type="email"
                onChange={(input) => onEmailChange(input)}
                value={email}
                placeholder="Enter an Email Address"
              />

              <Form.Field
                name="password"
                required
                label="Password"
                control="input"
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
      </Card.Group>
    </Container>
  );
}

export default UserLogin;
