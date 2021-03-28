import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { Modal, Form, Button, Container, Message } from "semantic-ui-react";
import { UPDATE_PASSWORD_MUTATION } from "../../../../services/graphql/mutations/SharedMutations";
import { getSuccessToastWithMessage } from "../../../shared/toast/ToastOptions";

const EditPasswordModal = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [updatePassword, { mutationData }] = useMutation(
    UPDATE_PASSWORD_MUTATION
  );

  const handleEditPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (newPassword === confirmNewPassword) {
      updatePassword({
        variables: {
          userId: props.userId,
          currentPassword,
          newPassword,
        },
      })
        .then(() => {
          props.setIsEditPasswordModalOpen(false);
          props.openToast(
            getSuccessToastWithMessage("Successfully updated password!")
          );
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    } else {
      setValidationMessage("New passwords must match.");
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
        <Form onSubmit={handleEditPassword}>
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
          <Container textAlign="center">
            <Button.Group attached="bottom">
              <Button type="submit" positive>
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
        </Form>
        {validationMessage.length !== 0 && (
          <Message
            error
            header="Update Password Failed"
            content={validationMessage}
          />
        )}
      </Modal.Content>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openToast: (toast) => dispatch({ type: "OPEN_TOAST", payload: toast }),
  };
};

EditPasswordModal.propTypes = {
  isEditPasswordModalOpen: PropTypes.bool.isRequired,
  setIsEditPasswordModalOpen: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(EditPasswordModal);
