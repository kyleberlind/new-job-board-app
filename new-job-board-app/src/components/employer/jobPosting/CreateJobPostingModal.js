import React, { useState } from "react";
import { useFormFields } from "../../../libs/hooks/useFormFields";
import { saveNewJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
  Modal,
  Card,
  Container,
  Form,
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
    const currentJobPostingFieldIdsMappedToRequiredFlag = {...jobPostingFieldIdsMappedToRequiredFlag}
    if (currentJobPostingFieldIdsMappedToRequiredFlag[fieldId]) {
      currentJobPostingFieldIdsMappedToRequiredFlag[fieldId] = false;
    } else {
      currentJobPostingFieldIdsMappedToRequiredFlag[fieldId] = true;
    }
    setJobPostingFieldIdsMappedToRequiredFlag(currentJobPostingFieldIdsMappedToRequiredFlag)
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
    <Modal
      onClose={() => props.setShowCreateJobPostingModal(false)}
      onOpen={() => props.setShowCreateJobPostingModal(true)}
      open={props.showCreateJobPostingModal}
      closeIcon="cancel"
    >
      <Modal.Header>
        <>Create Job Posting</>
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
              <Form.Group widths="equal" inline>
                <Form.Input
                  controlId="city"
                  fluid
                  required
                  label="City"
                  value={jobPostingLocation.city}
                  onChange={handleJobPostingLocationChange}
                  placeholder="Enter a City"
                  error={{
                    content: "Please enter a city",
                    pointing: "below",
                  }}
                />

                <Form.Input
                  controlId="state"
                  fluid
                  label="State"
                  required
                  value={jobPostingLocation.state}
                  onChange={handleJobPostingLocationChange}
                  placeholder="Enter a State"
                  error={{
                    content: "Please enter a state",
                    pointing: "below",
                  }}
                />

                <Form.Input
                  controlId="zipCode"
                  label="Zip Code"
                  fluid
                  required
                  value={jobPostingLocation.zipCode}
                  onChange={handleJobPostingLocationChange}
                  placeholder="Enter a Zip Code"
                  error={{
                    content: "Please enter a zip code ",
                    pointing: "below",
                  }}
                />
              </Form.Group>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content>
              <Card.Header textAlign="left">General Info</Card.Header>

              <Form.Group widths="equal" inline>
                <Form.Input
                  fluid
                  controlId="role"
                  label="Job Role"
                  
                  value={jobPostingGeneralInfo.role}
                  onChange={handleJobPostingGeneralInfoChange}
                  placeholder="Enter a Job Role"
                  error={{
                    content: "Please enter a job role",
                    pointing: "below",
                  }}
                />
                <Form.Input
                  fluid
                  controlId="team"
                  label="Team"
                  value={jobPostingGeneralInfo.team}
                  onChange={handleJobPostingGeneralInfoChange}
                  placeholder="Enter a Team"
                />
              </Form.Group>

              <Form.Group widths="equal"  controlId="description">
                <Form.TextArea
                  label="Job Description"
                  fluid
                  value={jobPostingGeneralInfo.description}
                  onChange={handleJobPostingGeneralInfoChange}
                  placeholder="Enter Job Description"
                  error={{
                    content: "Please enter a Job Description",
                    pointing: "below",
                  }}
                />
              </Form.Group>
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
                renderLabel={renderItemContent}
                onChange={addJobPostingField}
                options={jobPostingFieldOptions()}
              />
            </Card.Content>
          </Card>
          <Container fluid>
            <Button className="button" type="submit" variant="primary">
              Submit
            </Button>
            <Button
              className="button"
              onClick={() => {
                props.setShowCreateJobPostingModal(false);
              }}
              variant="secondary"
            >
              Cancel
            </Button>
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
  },
};

export default CreateJobPostingModal;
