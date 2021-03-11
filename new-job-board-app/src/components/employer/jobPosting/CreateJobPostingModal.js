import React, { useState } from "react";
import { Form, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useFormFields } from "../../../libs/hooks/useFormFields";
import { saveNewJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";
import {
  Dropdown,
  Label,
  Checkbox,
  Icon,
  Button,
  Modal,
} from "semantic-ui-react";

import "./css/CreateJobPosting.css";

const CreateJobPostingModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [validationMessageType, setValidationMessageType] = useState("success");
  const [validationMessage, setValidationMessage] = useState("");
  const [
    jobPostingGeneralInfo,
    handleJobPostingGeneralInfoChange,
  ] = useFormFields(props.jobPosting.generalInfo);
  const [jobPostingLocation, handleJobPostingLocationChange] = useFormFields(
    props.jobPosting.location
  );
  const [
    jobPostingFieldIdsMappedToRequiredFlag,
    setJobPostingFieldIdsMappedToRequiredFlag,
  ] = useState({});

  const jobPostingFieldOptions = () => {
    return props.jobPostingFields.map((field) => {
      return {
        key: field.id,
        value: field.id,
        text: field.value,
      };
    });
  };

  const addJobPostingField = (event, data) => {
    const currentJobPostingFields = {};
    data["value"].forEach((fieldId) => {
      if (!(fieldId in jobPostingFieldIdsMappedToRequiredFlag)) {
        currentJobPostingFields[fieldId] = false;
      } else {
        currentJobPostingFields[fieldId] =
          jobPostingFieldIdsMappedToRequiredFlag[fieldId];
      }
    });
    setJobPostingFieldIdsMappedToRequiredFlag(currentJobPostingFields);
  };

  const makeJobPostingFieldRequired = (fieldId) => {
    const currentJobPostingFieldIdsMappedToRequiredFlag = {
      ...jobPostingFieldIdsMappedToRequiredFlag,
    };
    if (currentJobPostingFieldIdsMappedToRequiredFlag[fieldId]) {
      currentJobPostingFieldIdsMappedToRequiredFlag[fieldId] = false;
    } else {
      currentJobPostingFieldIdsMappedToRequiredFlag[fieldId] = true;
    }
    setJobPostingFieldIdsMappedToRequiredFlag(
      currentJobPostingFieldIdsMappedToRequiredFlag
    );
  };

  const handleSubmitButtonClick = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      saveNewJobPostingService({
        location: jobPostingLocation,
        generalInfo: {
          employerId: props.employer.employerId,
          ...jobPostingGeneralInfo,
        },
        jobPostingFields: formatJobPostingFields(),
      })
        .then((response) => {
          response.json().then((data) => {
            if (data["hasError"]) {
              setValidationMessage(data["errorMessage"]);
              props.setShowCreateJobPostingModal(false);
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

  const formatJobPostingFields = () => {
    return Object.keys(jobPostingFieldIdsMappedToRequiredFlag).map((id) => {
      return { id, required: jobPostingFieldIdsMappedToRequiredFlag[id] };
    });
  };

  const renderItemContent = (item) => {
    return (
      <Label horizontal>
        <Icon name="delete" />
        {item.text}
        <Label.Detail>
          <Checkbox
            checked={!!jobPostingFieldIdsMappedToRequiredFlag[item.value]}
            onChange={() => {
              makeJobPostingFieldRequired(item.value);
            }}
            label="Mark Required"
          />
        </Label.Detail>
      </Label>
    );
  };

  return (
    <div className="root">
      <Modal
        onClose={() => props.setShowCreateJobPostingModal(false)}
        onOpen={() => props.setShowCreateJobPostingModal(true)}
        open={props.showCreateJobPostingModal}
        centered
      >
        <Modal.Header>
          {props.edit ? (
            <>Edit Job Posting</>
          ) : (
            <>Create Job Posting</>
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              handleSubmitButtonClick(event);
            }}
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
                          value={jobPostingLocation.city}
                          onChange={handleJobPostingLocationChange}
                          placeholder="Enter a City"
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
                          value={jobPostingLocation.state}
                          onChange={handleJobPostingLocationChange}
                          placeholder="Enter a State"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group controlId="zipCode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          required
                          value={jobPostingLocation.zipCode}
                          onChange={handleJobPostingLocationChange}
                          placeholder="Enter a Zip Code"
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
                          value={jobPostingGeneralInfo.role}
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
                          value={jobPostingGeneralInfo.team}
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
                            value={jobPostingGeneralInfo.description}
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
                <Dropdown
                  placeholder="Select Job Posting Questions"
                  fluid
                  search
                  selection
                  multiple
                  renderLabel={renderItemContent}
                  onChange={addJobPostingField}
                  options={jobPostingFieldOptions()}
                />
              </Card.Body>
            </Card>
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
                    onClick={() => {
                      props.setShowCreateJobPostingModal(false);
                    }}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Content>
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

CreateJobPostingModal.propTypes = {
  employer: PropTypes.object.isRequired,
  jobPostingFields: PropTypes.array.isRequired,
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

CreateJobPostingModal.defaultProps = {
  edit: false,
  jobPosting: {
    generalInfo: {
      role: "",
      team: "",
      description: "",
    },
    location: {
      city: "",
      state: "",
      zipCode: "",
    },
  },
};

export default CreateJobPostingModal;
