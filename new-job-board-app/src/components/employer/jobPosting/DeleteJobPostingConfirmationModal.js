import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Modal, Segment } from "semantic-ui-react";
import { deleteJobPostingService } from "../../../services/employer/EmployerServices";

const DeleteJobPostingConfirmationModal = (props) => {
  const formattedJobLocation = `${props.jobPosting.location.city}, ${props.jobPosting.location.state}, ${props.jobPosting.location.zipCode}`;
  const handleConfirmDeleteButtonClick = () => {
    deleteJobPostingService(props.jobPosting.generalInfo.id)
      .then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            props.setShowDeleteJobPostingConfirmationModal(false);
            console.log(data["errorMessage"]);
          } else if (data["success"]) {
            console.log("Deleted job posting");
            window.location.assign("employer-console");
          } else {
            console.log("Failed to delete job posting");
          }
          props.setShowDeleteJobPostingConfirmationModal(false);
        });
      })
      .catch((error) => {
        console.log("Failed to delete job posting");
      });
  };
  return (
    <Modal
      size="tiny"
      open={props.showDeleteJobPostingConfirmationModal}
      onClose={() => {
        props.setShowDeleteJobPostingConfirmationModal(false);
      }}
      onOpen={() => {
        props.setShowDeleteJobPostingConfirmationModal(true);
      }}
      closeIcon="cancel"
    >
      <Modal.Header>Delete Job Posting</Modal.Header>
      <Modal.Content>
        <Segment vertical>ID: {props.jobPosting.generalInfo.id}</Segment>
        <Segment vertical>Role: {props.jobPosting.generalInfo.role}</Segment>
        <Segment vertical>Team: {props.jobPosting.generalInfo.team}</Segment>
        <Segment vertical>Location: {formattedJobLocation}</Segment>
      </Modal.Content>
      <Modal.Actions>
        <Container textAlign="center">
          <Button.Group attached="bottom">
            <Button
              positive
              onClick={() => {
                handleConfirmDeleteButtonClick();
              }}
            >
              Confirm Delete
            </Button>
            <Button.Or />
            <Button
              negative
              onClick={() => {
                props.setShowDeleteJobPostingConfirmationModal(false);
              }}
            >
              Cancel
            </Button>
          </Button.Group>
        </Container>
      </Modal.Actions>
    </Modal>
  );
};

DeleteJobPostingConfirmationModal.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default DeleteJobPostingConfirmationModal;
