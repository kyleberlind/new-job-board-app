import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Container, Modal, Segment } from "semantic-ui-react";
import { deleteJobPostingService } from "../../../services/employer/EmployerServices";
import {
  getFailureToastWithMessage,
  getSuccessToastWithMessage,
} from "../../shared/toast/ToastOptions";

const DeleteJobPostingConfirmationModal = (props) => {
  const formattedJobLocation = `${props.jobPosting.location.city}, ${props.jobPosting.location.state}, ${props.jobPosting.location.zipCode}`;
  const handleConfirmDeleteButtonClick = () => {
    deleteJobPostingService(props.jobPosting.id)
      .then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            props.openToast(getFailureToastWithMessage(data["errorMessage"]));
          } else if (data["success"]) {
            props.deleteJobPosting(props.jobPosting.id);
            props.openToast(
              getSuccessToastWithMessage("Successfully deleted job posting!")
            );
          } else {
            props.openToast(
              getFailureToastWithMessage(
                data["Failed to delete job posting, please try again."]
              )
            );
          }
          props.setShowDeleteJobPostingConfirmationModal(false);
        });
      })
      .catch((error) => {
        props.setShowDeleteJobPostingConfirmationModal(false);
        props.openToast(
          getFailureToastWithMessage(
            "Failed to delete job posting, please try again."
          )
        );
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
        <Segment vertical>ID: {props.jobPosting.id}</Segment>
        <Segment vertical>Role: {props.jobPosting.role}</Segment>
        <Segment vertical>Team: {props.jobPosting.team}</Segment>
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

const mapDispatchToProps = (dispatch) => {
  return {
    openToast: (toast) => dispatch({ type: "OPEN_TOAST", payload: toast }),
    deleteJobPosting: (jobPostingId) =>
      dispatch({ type: "DELETE_JOB_POSTING", payload: jobPostingId }),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteJobPostingConfirmationModal);
