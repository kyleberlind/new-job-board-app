import React, { useState, useRef } from "react";
import { saveNewJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Card,
  Modal,
  Label,
  Checkbox,
  Dropdown,
  Icon,
  Grid,
} from "semantic-ui-react";
import { Form, Input, TextArea } from "semantic-ui-react-form-validator";

const CreateJobPostingModal = (props) => {
  const [validationMessage, setValidationMessage] = useState("");
  const [validationMessageType, setValidationMessageType] = useState("");

  const [jobPostingGeneralInfo, setJobPostingGeneralInfo] = useState(
    props.jobPosting.generalInfo
  );
  const [jobPostingLocation, setJobPostingLocation] = useState(
    props.jobPosting.location
  );
  const [
    jobPostingFieldIdsMappedToRequiredFlag,
    setJobPostingFieldIdsMappedToRequiredFlag,
  ] = useState({});

  const handleJobPostingChange = (event, setJobPostingInfo, jobPostingInfo) => {
    setJobPostingInfo({
      ...jobPostingInfo,
      [event.target.name]: event.target.value,
    });
  };

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
    event.preventDefault();
    event.stopPropagation();

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
  };

  const formatJobPostingFields = () => {
    return Object.keys(jobPostingFieldIdsMappedToRequiredFlag).map((id) => {
      return { id, required: jobPostingFieldIdsMappedToRequiredFlag[id] };
    });
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

  const removeJobPostingField = (fieldId) => {
    const currentJobPostingFieldIdsMappedToRequiredFlag = {
      ...jobPostingFieldIdsMappedToRequiredFlag,
    };
    delete currentJobPostingFieldIdsMappedToRequiredFlag[fieldId];
    setJobPostingFieldIdsMappedToRequiredFlag(
      currentJobPostingFieldIdsMappedToRequiredFlag
    );
  };

  return (
    <Modal
      onClose={() => props.setShowCreateJobPostingModal(false)}
      onOpen={() => props.setShowCreateJobPostingModal(true)}
      open={props.showCreateJobPostingModal}
      closeIcon="cancel"
    >
      <Modal.Header>
        Create Job Posting
      </Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={(event) => {
            handleSubmitButtonClick(event);
          }}
        >
          <Card fluid>
            <Card.Content>
              <Card.Header>Location</Card.Header>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Input
                      name="city"
                      label="City *"
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
                  </Grid.Column>
                  <Grid.Column>
                    <Input
                      label="State *"
                      name="state"
                      value={jobPostingLocation.state}
                      validators={["required"]}
                      errorMessages={["Please enter a state"]}
                      onChange={(event) => {
                        handleJobPostingChange(
                          event,
                          setJobPostingLocation,
                          jobPostingLocation
                        );
                      }}
                      placeholder="Enter a State"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Input
                      label="Zip Code *"
                      name="zipCode"
                      value={jobPostingLocation.zipCode}
                      validators={["required"]}
                      errorMessages={["Please enter a zip code"]}
                      onChange={(event) => {
                        handleJobPostingChange(
                          event,
                          setJobPostingLocation,
                          jobPostingLocation
                        );
                      }}
                      placeholder="Enter a Zip Code"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Card.Header textAlign="left">General Info</Card.Header>
              <Grid>
                <Grid.Row columns={2} s>
                  <Grid.Column>
                    <Input
                      name="role"
                      label="Job Role *"
                      validators={["required"]}
                      errorMessages={["Please enter a job role"]}
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
                    <Input
                      label="Team"
                      name="team"
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
                    <TextArea
                      label="Job Description *"
                      name="description"
                      value={jobPostingGeneralInfo.description}
                      validators={["required"]}
                      errorMessages={["Please enter a Job Description"]}
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
                onChange={addJobPostingField}
                options={jobPostingFieldOptions()}
              />
            </Card.Content>
          </Card>
          <Container textAlign="center">
            <Button.Group attached="bottom">
              <Button positive>Submit</Button>
              <Button.Or />
              <Button
                negative
                onClick={() => {
                  props.setShowCreateJobPostingModal(false);
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
      jobPostingFields: PropTypes.array,
    }),
  }),
};

CreateJobPostingModal.defaultProps = {
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
    jobPostingFields: [],
  },
};

export default CreateJobPostingModal;
