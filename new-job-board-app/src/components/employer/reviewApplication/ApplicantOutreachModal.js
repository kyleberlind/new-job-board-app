import React, { useState } from "react";
import PropTypes from "prop-types";
import { UPDATE_JOB_POSTING_APPLICATION_STATUS_MUTATION } from "../../../services/graphql/mutations/UpdateJobPostingApplicationStatusMutation";
import { useMutation } from "@apollo/client";
import { Button, Container, Modal, Form } from "semantic-ui-react";

const ApplicantOutreachModal = (props) => {
  const [updateApplicationStatus, { mutationData }] = useMutation(
    UPDATE_JOB_POSTING_APPLICATION_STATUS_MUTATION
  );
  const handleApplicantOutreach = () => {
    updateApplicationStatus({
      variables: {
        employerReferenceId: props.employerReferenceId,
        newStatus: "interviewing",
      },
    });
    window.location.href = `mailto:${props.applicantEmailAddress}`;
  };

  return (
    <Modal
      open={props.isApplicantOutReachModalOpen}
      onOpen={() => {
        props.setIsApplicantOutReachModalOpen(true);
      }}
      onClose={() => {
        props.setIsApplicantOutReachModalOpen(false);
      }}
      size="tiny"
    >
      <Modal.Header>
        Mark applicant as interviewing and open email editor?
      </Modal.Header>
      <Modal.Content>
        <Button.Group attached="bottom">
          <Button
            positive
            onClick={() => {
              handleApplicantOutreach();
            }}
          >
            Confirm
          </Button>
          <Button.Or />
          <Button
            negative
            onClick={() => {
              props.setIsApplicantOutReachModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </Button.Group>
      </Modal.Content>
    </Modal>
  );
};

ApplicantOutreachModal.propTypes = {
  isApplicantOutReachModalOpen: PropTypes.bool.isRequired,
  setIsApplicantOutReachModalOpen: PropTypes.func.isRequired,
};

export default ApplicantOutreachModal;
