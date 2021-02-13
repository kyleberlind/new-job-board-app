import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  FormControl,
  Card,
  Modal,
} from "react-bootstrap";
import { useFormFields } from "../../../libs/hooks/useFormFields";
import { saveNewJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";

const EditJobPostingModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [validationMessageType, setValidationMessageType] = useState("success");
  const [validationMessage, setValidationMessage] = useState("");
  const [
    jobPostingGeneralInfo,
    handleJobPostingGeneralInfoChange,
  ] = useFormFields(props.jobPosting);
  const [
    jobPostingLocationInfo,
    handleJobPostingLocationInfoChange,
  ] = useFormFields(props.jobPosting.locationInfo);

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
      <Modal
        show={props.showEditJobPostingModal}
        onHide={() => props.setShowEditJobPostingModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Posting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmitButtonClick}
          >
            <Card>
              <Card.Header>Location</Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          required
                          value={jobPostingLocationInfo?.city}
                          onChange={handleJobPostingLocationInfoChange}
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
                          value={jobPostingLocationInfo?.state}
                          onChange={handleJobPostingLocationInfoChange}
                          placeholder="CO"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group controlId="zipCode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          required
                          value={jobPostingLocationInfo?.zipCode}
                          onChange={handleJobPostingLocationInfoChange}
                          placeholder="80220"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>General Info</Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col xs={6}>
                      <Form.Group controlId="role">
                        <Form.Label>Job Role</Form.Label>
                        <Form.Control
                          required
                          value={jobPostingGeneralInfo?.role}
                          onChange={handleJobPostingGeneralInfoChange}
                          placeholder="Enter a Job Role"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a job role
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group controlId="team">
                        <Form.Label>Team</Form.Label>
                        <Form.Control
                          value={jobPostingGeneralInfo?.team}
                          onChange={handleJobPostingGeneralInfoChange}
                          placeholder="Enter a Team"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="textArea">
                        <Form.Group controlId="description">
                          <Form.Label>Job Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            required
                            value={jobPostingGeneralInfo?.description}
                            onChange={handleJobPostingGeneralInfoChange}
                            placeholder="Enter Job Description"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a Job Description
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Job Posting Questions</Card.Header>
              <Card.Body>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <Button variant="primary">Search</Button>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Small" />
                </InputGroup>
              </Card.Body>
            </Card>
            <Container fluid>
              <Row>
                <Col>
                  <Button className="button" type="submit" variant="primary">
                    Edit
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="button"
                    onClick={() => {
                      props.setShowEditJobPostingModal(false);
                    }}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
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

EditJobPostingModal.propTypes = {
  showEditJobPostingModal: PropTypes.bool.isRequired,
  setShowEditJobPostingModal: PropTypes.func.isRequired,
  jobPosting: PropTypes.shape({
    jobPostingInfo: PropTypes.shape({
      generalInfo: PropTypes.shape({
        role: PropTypes.string,
        team: PropTypes.string,
        description: PropTypes.string,
      }),
      locationInfo: PropTypes.shape({
        city: PropTypes.string,
        state: PropTypes.string,
        zipCode: PropTypes.string,
      }),
    }),
  }),
};

EditJobPostingModal.defaultProps = {
  jobPosting: {
    generalInfo: {
      role: "",
      team: "",
      description: "",
    },
    locationInfo: {
      city: "",
      state: "",
      zipCode: "",
    },
  },
};

export default EditJobPostingModal;
