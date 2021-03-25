import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Container, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD_MUTATION } from "../../../../services/graphql/mutations/SharedMutations";

const EditPasswordModal = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [updatePassword, { mutationData }] = useMutation(
    UPDATE_PASSWORD_MUTATION
  );

  const handleEditPassword = () => {
    if (newPassword === confirmNewPassword) {
      updatePassword({
        variables: {
          userId: props.userId,
          currentPassword,
          newPassword,
        },
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
      //TODO update the redux state
      //TODO include confirmation toast
    } else {
      setValidationMessage("Passwords must match.");
    }
  };

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
          <Form.Field
            label="Confirm New Password"
            name="confirmNewPassword"
            required
            control="input"
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(event) => {
              setConfirmNewPassword(event.target.value);
            }}
          />
        </Form>
        {validationMessage.length !== 0 && (
          <Message error header="Sign Up Failed" content={validationMessage} />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Container textAlign="center">
          <Button.Group attached="bottom">
            <Button onClick={handleEditPassword} positive>
              Confirm
            </Button>
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
  isEditPasswordModalOpen: PropTypes.bool.isRequired,
  setIsEditPasswordModalOpen: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default EditPasswordModal;
