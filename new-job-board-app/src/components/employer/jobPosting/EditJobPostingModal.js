import React, { useState, useEffect } from "react";
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
import { updateJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";

const EditJobPostingModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [validationMessageType, setValidationMessageType] = useState("success");
  const [validationMessage, setValidationMessage] = useState("");

  const [jobPostingGeneralInfo, setJobPostingGeneralInfo] = useState(
    props.jobPosting.generalInfo
  );
  const [jobPostingLocationInfo, setJobPostingLocationInfo] = useState(
    props.jobPosting.location
  );
  const [jobPostingQuestionInfo, setJobPostingQuestionInfo] = useState(
    props.jobPosting.questions
  );

  const handleJobPostingChange = (
    event,
    setJobPostingFields,
    jobPostingInfo
  ) => {
    setJobPostingFields({
      ...jobPostingInfo,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setJobPostingGeneralInfo(props.jobPosting.generalInfo);
    setJobPostingLocationInfo(props.jobPosting.location);
    setJobPostingQuestionInfo(props.jobPosting.questions);
  }, [props.jobPosting]);

  const handleSubmitButtonClick = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      updateJobPostingService({
        generalInfo: jobPostingGeneralInfo,
        location: jobPostingLocationInfo,
      }).then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            setValidationMessage(data["errorMessage"]);
            props.setShowEditJobPostingModal(false);
          } else if (data["success"]) {
            setValidationMessageType("success");
            setValidationMessage("Successfully updated job posting!");
            window.location.assign("employer-console");
          } else {
            setValidationMessageType("danger");
            setValidationMessage("Failed to updated job posting");
          }
        });
      });
    }
    setValidated(true);
  };
  return (
    <div className="root">
      <Modal
        show={props.showEditJobPostingModal}
        onHide={() => {
          props.setShowEditJobPostingModal(false);
        }}
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
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          name="city"
                          required
                          value={jobPostingLocationInfo.city}
                          onChange={(event) => {
                            handleJobPostingChange(
                              event,
                              setJobPostingLocationInfo,
                              jobPostingLocationInfo
                            );
                          }}
                          placeholder="Denver"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a city, state and zipcode
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          name="state"
                          required
                          value={jobPostingLocationInfo.state}
                          onChange={(event) => {
                            handleJobPostingChange(
                              event,
                              setJobPostingLocationInfo,
                              jobPostingLocationInfo
                            );
                          }}
                          placeholder="CO"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          name="zipCode"
                          required
                          value={jobPostingLocationInfo.zipCode}
                          onChange={(event) => {
                            handleJobPostingChange(
                              event,
                              setJobPostingLocationInfo,
                              jobPostingLocationInfo
                            );
                          }}
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
                      <Form.Group>
                        <Form.Label>Job Role</Form.Label>
                        <Form.Control
                          name="role"
                          required
                          value={jobPostingGeneralInfo?.role}
                          onChange={(event) => {
                            handleJobPostingChange(
                              event,
                              setJobPostingGeneralInfo,
                              jobPostingGeneralInfo
                            );
                          }}
                          placeholder="Enter a Job Role"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a job role
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Team</Form.Label>
                        <Form.Control
                          name="team"
                          value={jobPostingGeneralInfo?.team}
                          onChange={(event) => {
                            handleJobPostingChange(
                              event,
                              setJobPostingGeneralInfo,
                              jobPostingGeneralInfo
                            );
                          }}
                          placeholder="Enter a Team"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="textArea">
                        <Form.Group>
                          <Form.Label>Job Description</Form.Label>
                          <Form.Control
                            name="description"
                            as="textarea"
                            rows={6}
                            required
                            value={jobPostingGeneralInfo?.description}
                            onChange={(event) => {
                              handleJobPostingChange(
                                event,
                                setJobPostingGeneralInfo,
                                jobPostingGeneralInfo
                              );
                            }}
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
                    Save
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
      location: PropTypes.shape({
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
