import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Alert,
  Card,
  Modal,
  Button,
} from "react-bootstrap";
import { updateJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";
import { jobPostingShape } from "../../../shapes/JobPostingShape";

import { Dropdown, Label, Checkbox, Icon } from "semantic-ui-react";

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

  const [
    jobPostingFieldIdsMappedToRequiredFlag,
    setJobPostingFieldIdsMappedToRequiredFlag,
  ] = useState(() => {
    const selectedJobPostingFieldIdsMappedToRequiredFlag = {};
    props.jobPosting.fields.map((field) => {
      selectedJobPostingFieldIdsMappedToRequiredFlag[field.id] = field.required;
    });
    return selectedJobPostingFieldIdsMappedToRequiredFlag;
  });

  useEffect(() => {
    setJobPostingGeneralInfo(props.jobPosting.generalInfo);
    setJobPostingLocationInfo(props.jobPosting.location);
    setJobPostingFieldIdsMappedToRequiredFlag(() => {
      const selectedJobPostingFieldIdsMappedToRequiredFlag = {};
      props.jobPosting.fields.map((field) => {
        selectedJobPostingFieldIdsMappedToRequiredFlag[field.id] =
          field.required;
      });
      return selectedJobPostingFieldIdsMappedToRequiredFlag;
    });
  }, [props.jobPosting]);

  const jobPostingFieldOptions = () => {
    return props.jobPostingFields.map((field) => {
      return {
        key: field.id,
        value: field.id,
        text: field.value,
      };
    });
  };

  const handleJobPostingFieldChange = (event, data) => {
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
    const currentJobPostingFieldIdsMappedToRequiredFlag = {...jobPostingFieldIdsMappedToRequiredFlag}
    if (currentJobPostingFieldIdsMappedToRequiredFlag[fieldId]) {
      currentJobPostingFieldIdsMappedToRequiredFlag[fieldId] = false;
    } else {
      currentJobPostingFieldIdsMappedToRequiredFlag[fieldId] = true;
    }
    setJobPostingFieldIdsMappedToRequiredFlag(currentJobPostingFieldIdsMappedToRequiredFlag)
  };

  const handleJobPostingChange = (event, setJobPostingInfo, jobPostingInfo) => {
    setJobPostingInfo({
      ...jobPostingInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveButtonClick = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      updateJobPostingService({
        generalInfo: jobPostingGeneralInfo,
        location: jobPostingLocationInfo,
        fields: formatJobPostingFields(),
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

  const formatJobPostingFields = () => {
    return Object.keys(jobPostingFieldIdsMappedToRequiredFlag).map((id) => {
      return { id, required: jobPostingFieldIdsMappedToRequiredFlag[id] };
    });
  };

  const removeJobPostingField = (fieldId) => {
    const currentJobPostingFieldIdsMappedToRequiredFlag = {
      ...jobPostingFieldIdsMappedToRequiredFlag,
    };
    delete currentJobPostingFieldIdsMappedToRequiredFlag[fieldId];
    setJobPostingFieldIdsMappedToRequiredFlag(
      currentJobPostingFieldIdsMappedToRequiredFlag
    );
  };

  const renderItemContent = (item) => {
    return (
      <Label horizontal>
        <Label.Group>
          {item.text}
          <Icon
            link
            onClick={() => removeJobPostingField(item.value)}
            name="delete"
          />
          <Label.Detail>
            <Checkbox
              checked={!!jobPostingFieldIdsMappedToRequiredFlag[item.value]}
              onChange={() => {
                makeJobPostingFieldRequired(item.value);
              }}
              label="Required"
            />
          </Label.Detail>
        </Label.Group>
      </Label>
    );
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
            onSubmit={handleSaveButtonClick}
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
                <Dropdown
                  placeholder="Select Job Posting Questions"
                  fluid
                  search
                  selection
                  multiple
                  value={Object.keys(
                    jobPostingFieldIdsMappedToRequiredFlag
                  ).map(Number)}
                  renderLabel={renderItemContent}
                  onChange={handleJobPostingFieldChange}
                  options={jobPostingFieldOptions()}
                />
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
  jobPosting: jobPostingShape.isRequired,
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
