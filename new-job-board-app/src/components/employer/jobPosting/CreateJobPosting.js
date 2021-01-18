import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormFields } from "../../../libs/hooks/useFormFields";
import { saveNewJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";

import "./css/CreateJobPosting.css";

const CreateJobPosting = (props) => {
  const [validated, setValidated] = useState(false);
  const [validationMessageType, setValidationMessageType] = useState("success");
  const [validationMessage, setValidationMessage] = useState("");

  const [jobPostingFields, handleJobPostingFieldChange] = useFormFields({
    role: "",
    description: "",
    questions: [],
  });

  const [location, handleLocationFieldChange] = useFormFields({
    city: "",
    state: "",
    zipCode: "",
  });

  const handleSubmitButtonClick = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      saveNewJobPostingService({
        employerId: props.employer.employerId,
        location: location,
        ...jobPostingFields,
      })
        .then((response) => {
          response.json().then((data) => {
            if (data["hasError"]) {
              setValidationMessage(data["errorMessage"]);
            } else if (data["success"]) {
              setValidationMessageType("success");
              setValidationMessage("Successfully saved job posting!");
              window.location.assign("employer-console");
            } else {
              setValidationMessageType("danger");
              setValidationMessage("Failed to save job posting");
            }
          });
        })
        .catch((error) => {
          setValidationMessage(error["errorMessage"]);
        });
    }
    setValidated(true);
  };
  return (
    <div className="root">
      <div className="jobPostingForm">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitButtonClick}
        >
          <Row>
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  value={location.city}
                  onChange={handleLocationFieldChange}
                  placeholder="Denver"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a city, state and zipcode
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  value={location.state}
                  onChange={handleLocationFieldChange}
                  placeholder="CO"
                />
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  required
                  value={location.zipCode}
                  onChange={handleLocationFieldChange}
                  placeholder="80220"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="role">
            <Form.Label>Job Role</Form.Label>
            <Form.Control
              required
              value={jobPostingFields.role}
              onChange={handleJobPostingFieldChange}
              placeholder="Enter a Job Role"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a job role
            </Form.Control.Feedback>
          </Form.Group>
          <div className="textArea">
            <Form.Group controlId="description">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                required
                value={jobPostingFields.description}
                onChange={handleJobPostingFieldChange}
                placeholder="Enter Job Description"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a Job Description
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Container fluid>
            <Row>
              <Col>
                <Button className="button" type="submit" variant="primary">
                  Submit
                </Button>
              </Col>
              <Col>
                <Button
                  className="button"
                  href="employer-console"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
      <Alert
        show={validationMessage.length !== 0}
        variant={validationMessageType}
        dismissible
        onClose={() => {
          setValidationMessage("");
        }}
      >
        {validationMessage}
      </Alert>
    </div>
  );
};

CreateJobPosting.propTypes = {
  employer: PropTypes.object.isRequired,
};

export default CreateJobPosting;
