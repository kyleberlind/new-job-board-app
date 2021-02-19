import React from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { deleteJobPostingService } from "../../../services/employer/EmployerServices";
import PropTypes from "prop-types";

const DeleteJobPostingConfirmationModal = (props) => {
  const formattedJobLocation = `${props.jobPosting.location.city}, ${props.jobPosting.location.state}, ${props.jobPosting.location.zipCode}`;
  const handleConfirmDeleteButtonClick = () => {
    deleteJobPostingService(props.jobPosting.generalInfo.id).then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            props.setShowDeleteJobPostingConfirmationModal(false);
            console.log(data["errorMessage"])
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
      show={props.showDeleteJobPostingConfirmationModal}
      onHide={() => {
        props.setShowDeleteJobPostingConfirmationModal(false);
      }}
      size="lg"
      centered
    >
      <Modal.Header>Delete Job Posting</Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>ID: {props.jobPosting.generalInfo.id}</Col>
          </Row>
          <Row>
            <Col>Role: {props.jobPosting.generalInfo.role}</Col>
          </Row>
          <Row>
            <Col>Team: {props.jobPosting.generalInfo.team}</Col>
          </Row>
          <Row>
            <Col>Location: {formattedJobLocation}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col>
              <Button
                block
                onClick={() => {
                  handleConfirmDeleteButtonClick();
                }}
              >
                Confirm Delete
              </Button>
            </Col>
            <Col>
              <Button
                block
                variant="secondary"
                onClick={() => {
                  props.setShowDeleteJobPostingConfirmationModal(false);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

DeleteJobPostingConfirmationModal.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default DeleteJobPostingConfirmationModal;
