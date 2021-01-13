import { Container, Button, Row, Col, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { loadEmployerInfoService } from "../../../services/employer/EmployerServices";

const EmployerConsole = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadEmployerInfoService().then((response) => {
      response.json().then((data) => {
        if (!data["employerData"]) {
          window.location.assign("login");
        } else {
          setToken(data["employerData"]["token"]);
        }
      });
    });
  });

  return (
    <Container fluid>
      <Row noGutters>
        <Col>
          <Card>
            <Card.Title>My Job Postings</Card.Title>
            <Card.Body>{token}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerConsole;
