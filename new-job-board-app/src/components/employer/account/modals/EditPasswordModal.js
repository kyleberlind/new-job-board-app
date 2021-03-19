import React, { useState } from "react";
import { Modal, Form, Button, Container } from "semantic-ui-react";
import PropTypes from "prop-types";

const EditPasswordModal = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  return (
    <Modal
    size="tiny"
      open={props.isEditPasswordModalOpen}
      onOpen={() => {
        props.setIsEditPasswordModalOpen(true);
      }}
      onClose={() => {
        props.setIsEditPasswordModalOpen(false);
      }}
    >
      <Modal.Header>Edit Password?</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            label="Current Password"
            name="currentPassword"
            required
            control="input"
            type="password"
            placeholder="Enter Current Password"
            value={currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
            }}
          />
          <Form.Field
            label="New Password"
            name="newPassword"
            required
            control="input"
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Container textAlign="center">
          <Button.Group attached="bottom">
            <Button positive>Confirm</Button>
            <Button.Or />
            <Button
              negative
              onClick={() => {
                props.setIsEditPasswordModalOpen(false);
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

EditPasswordModal.propTypes = {
  isEditModalOpen: PropTypes.bool.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
};

export default EditPasswordModal;
