import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Container } from "semantic-ui-react";
const EditEmailModal = (props) => {
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const handleEditEmailAddress = () => {};
  return (
    <Modal
      open={props.isEditEmailModalOpen}
      onOpen={() => {
        props.setIsEditEmailModalOpen(true);
      }}
      onClose={() => {
        props.setIsEditEmailModalOpen(false);
      }}
    >
      <Modal.Header>Edit Email Address?</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            label="New Email"
            name="newEmail"
            required
            control="input"
            type="email"
            placeholder="Enter New Email"
            value={newEmailAddress}
            onChange={(event) => {
              setNewEmailAddress(event.target.value);
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
                props.setIsEditEmailModalOpen(false);
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

EditEmailModal.propTypes = {
  isEditEmailModalOpen: PropTypes.bool.isRequired,
  setIsEditEmailModalOpen: PropTypes.func.isRequired,
};

export default EditEmailModal;
