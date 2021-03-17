import React, { useState, useEffect } from "react";
import { updateJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";
import { jobPostingShape } from "../../../shapes/JobPostingShape";
import JobPostingQuestionLabel from "./JobPostingQuestionLabel";
import {
  Dropdown,
  Modal,
  Button,
  Grid,
  Card,
  Container,
  Form,
} from "semantic-ui-react";

const EditJobPostingModal = (props) => {
  const [validationMessageType, setValidationMessageType] = useState("success");
  const [validationMessage, setValidationMessage] = useState("");
  const [jobPostingGeneralInfo, setJobPostingGeneralInfo] = useState(
    props.jobPosting.generalInfo
  );
  const [jobPostingLocation, setJobPostingLocation] = useState(
    props.jobPosting.location
  );

  const [
    jobPostingFieldIdsMappedToRequiredFlag,
    setJobPostingFieldIdsMappedToRequiredFlag,
  ] = useState(() => {
    const selectedJobPostingFieldIdsMappedToRequiredFlag = {};
    props.jobPosting.jobPostingFields.map((field) => {
      selectedJobPostingFieldIdsMappedToRequiredFlag[field.id] = field.required;
    });
    return selectedJobPostingFieldIdsMappedToRequiredFlag;
  });

  useEffect(() => {
    setJobPostingGeneralInfo(props.jobPosting.generalInfo);
    setJobPostingLocation(props.jobPosting.location);
    setJobPostingFieldIdsMappedToRequiredFlag(() => {
      const selectedJobPostingFieldIdsMappedToRequiredFlag = {};
      props.jobPosting.jobPostingFields.map((field) => {
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

  const handleJobPostingChange = (event, setJobPostingInfo, jobPostingInfo) => {
    setJobPostingInfo({
      ...jobPostingInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    updateJobPostingService({
      generalInfo: jobPostingGeneralInfo,
      location: jobPostingLocation,
      jobPostingFields: formatJobPostingFields(),
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
      <JobPostingQuestionLabel
        questionTitle={item.text}
        value={item.value}
        checked={!!jobPostingFieldIdsMappedToRequiredFlag[item.value]}
        removeJobPostingField={removeJobPostingField}
        makeJobPostingFieldRequired={makeJobPostingFieldRequired}
      />
    );
  };

  return (
    <Modal
      onClose={() => props.setShowEditJobPostingModal(false)}
      onOpen={() => props.setShowEditJobPostingModal(true)}
      open={props.showEditJobPostingModal}
      closeIcon="cancel"
    >
      <Modal.Header>Edit Job Posting</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={(event) => {
            handleSaveButtonClick(event);
          }}
        >
          <Card fluid>
            <Card.Content>
              <Card.Header>Location</Card.Header>
              <Form.Group widths="equal">
                <Form.Field
                  name="city"
                  label="City"
                  required
                  control="input"
                  validators={["required"]}
                  errorMessages={["Please enter a city"]}
                  value={jobPostingLocation.city}
                  onChange={(event) => {
                    handleJobPostingChange(
                      event,
                      setJobPostingLocation,
                      jobPostingLocation
                    );
                  }}
                  placeholder="Enter a City"
                />

                <Form.Field
                  label="State"
                  name="state"
                  required
                  control="input"
                  value={jobPostingLocation.state}
                  onChange={(event) => {
                    handleJobPostingChange(
                      event,
                      setJobPostingLocation,
                      jobPostingLocation
                    );
                  }}
                  placeholder="Enter a State"
                />
                <Form.Field
                  label="Zip Code"
                  name="zipCode"
                  required
                  control="input"
                  value={jobPostingLocation.zipCode}
                  onChange={(event) => {
                    handleJobPostingChange(
                      event,
                      setJobPostingLocation,
                      jobPostingLocation
                    );
                  }}
                  placeholder="Enter a Zip Code"
                />
              </Form.Group>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Card.Header>General Info</Card.Header>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.Field
                      name="role"
                      label="Job Role"
                      required
                      control="input"
                      value={jobPostingGeneralInfo.role}
                      onChange={(event) => {
                        handleJobPostingChange(
                          event,
                          setJobPostingGeneralInfo,
                          jobPostingGeneralInfo
                        );
                      }}
                      placeholder="Enter a Job Role"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      label="Team"
                      name="team"
                      control="input"
                      value={jobPostingGeneralInfo.team}
                      onChange={(event) => {
                        handleJobPostingChange(
                          event,
                          setJobPostingGeneralInfo,
                          jobPostingGeneralInfo
                        );
                      }}
                      placeholder="Enter a Team"
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Form.Field
                      label="Job Description"
                      name="description"
                      required
                      control="textarea"
                      value={jobPostingGeneralInfo.description}
                      onChange={(event) => {
                        handleJobPostingChange(
                          event,
                          setJobPostingGeneralInfo,
                          jobPostingGeneralInfo
                        );
                      }}
                      placeholder="Enter Job Description"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Card.Header>Job Posting Questions</Card.Header>
              <Dropdown
                placeholder="Select Job Posting Questions"
                fluid
                search
                selection
                multiple
                value={Object.keys(jobPostingFieldIdsMappedToRequiredFlag).map(
                  Number
                )}
                renderLabel={renderItemContent}
                onChange={handleJobPostingFieldChange}
                options={jobPostingFieldOptions()}
              />
            </Card.Content>
          </Card>
          <Container textAlign="center">
            <Button.Group attached="bottom">
              <Button positive>Saves</Button>
              <Button.Or />
              <Button
                negative
                onClick={() => {
                  props.setShowEditJobPostingModal(false);
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Container>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

EditJobPostingModal.propTypes = {
  showEditJobPostingModal: PropTypes.bool.isRequired,
  setShowEditJobPostingModal: PropTypes.func.isRequired,
  jobPosting: jobPostingShape.isRequired,
};

EditJobPostingModal.defaultProps = {

};

export default EditJobPostingModal;
