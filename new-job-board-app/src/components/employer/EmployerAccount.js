import React from "react";
import { Container, Row, Card } from "react-bootstrap";
import PropTypes from "prop-types";

const EmployerAccount = (props) => {
  return (
    <Container fluid>

      <Card>
        <Card.Header>
          {props.employer.employerName} Account Information
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>ID: {props.employer.employerId}</Row>
            <Row>Size: {props.employer.employerSize}</Row>
            <Row>Account Created: {props.employer.signUpDate}</Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

EmployerAccount.propTypes = {
  employer: PropTypes.object.isRequired,
};

export default EmployerAccount;
