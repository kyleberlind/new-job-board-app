import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormFields } from "../../../libs/hooks/useFormFields"

import "./css/CreateJobPosting.css";

const CreateJobPosting = () => {
  const [validated, setValidated] = useState(false);
  const [jobPostingFields, handleJobPostingFieldChange] = useFormFields({
    city: "",
    state: "",
    role: "",
    jobDescription: "",
  });
  const handleSubmitButtonClick = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
    }
    setValidated(true);
  };
  return (
    <div className="root">
      <div className="jobPostingform">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmitButtonClick}
        >
          <Row>
            <Col>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  value={jobPostingFields.city}
                  onChange={handleJobPostingFieldChange}
                  placeholder="Denver"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a City and State
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  value={jobPostingFields.state}
                  onChange={handleJobPostingFieldChange}
                  placeholder="CO"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formJobRole">
            <Form.Label>Job Role</Form.Label>
            <Form.Control
              required
              value={jobPostingFields.role}
              onChange={handleJobPostingFieldChange}
              placeholder="Enter a Job Role"
            />
          </Form.Group>
          <div className="textArea">
            <Form.Group controlId="formJobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                required
                value={jobPostingFields.jobDescription}
                onChange={handleJobPostingFieldChange}
                placeholder="Enter Job Description"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a Job Description
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button className="submitButton" type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateJobPosting;
