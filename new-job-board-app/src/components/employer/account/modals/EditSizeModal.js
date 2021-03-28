import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { Modal, Form, Container, Button } from "semantic-ui-react";
import { EMPLOYER_SIZE_OPTIONS } from "../../../../constants/employer/EmployerConstants";
import { UPDATE_EMPLOYER_SIZE_MUTATION } from "../../../../services/graphql/mutations/EmployerMutations";
import {
  getSuccessToastWithMessage,
  getFailureToastWithMessage,
} from "../../../shared/toast/ToastOptions";

const EditSizeModal = (props) => {
  const [newEmployerSize, setNewEmployerSize] = useState(props.employerSize);
  const [updateEmployerSize, { mutationData }] = useMutation(
    UPDATE_EMPLOYER_SIZE_MUTATION
  );

  useEffect(() => {
    setNewEmployerSize(props.employerSize);
  }, [props.employerSize]);

  const handleUpdateSize = () => {
    updateEmployerSize({
      variables: {
        employerId: props.employerId,
        newSize: newEmployerSize,
      },
    })
      .then(() => {
        props.updateEmployerField(newEmployerSize);
        props.openToast(
          getSuccessToastWithMessage("Successfully updated company size!")
        );
      })
      .catch((error) => {
        console.log(error);
        props.openToast(
          getFailureToastWithMessage(
            "Failed to updated company size, please try again."
          )
        );
      });
    props.setIsEditSizeModalOpen(false);
  };

  return (
    <Modal
      size="small"
      open={props.isEditSizeModalOpen}
      onOpen={() => {
        props.setIsEditSizeModalOpen(true);
      }}
      onClose={() => {
        props.setIsEditSizeModalOpen(false);
      }}
    >
      <Modal.Header>Edit Size?</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Dropdown
            selection
            fluid
            required
            size="tiny"
            placeholder="Select Company Size"
            label="Company Size"
            options={EMPLOYER_SIZE_OPTIONS}
            value={newEmployerSize}
            onChange={(event, data) => {
              setNewEmployerSize(data.value);
            }}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Container textAlign="center">
          <Button.Group attached="bottom">
            <Button positive onClick={handleUpdateSize}>
              Confirm
            </Button>
            <Button.Or />
            <Button
              negative
              onClick={() => {
                props.setIsEditSizeModalOpen(false);
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

const mapDispatchToProps = (dispatch) => {
  return {
    openToast: (toast) => dispatch({ type: "OPEN_TOAST", payload: toast }),
    updateEmployerField: (newEmployerSize) =>
      dispatch({
        type: "UPDATE_EMPLOYER_FIELD",
        payload: { field: "employerSize", value: newEmployerSize },
      }),
  };
};

EditSizeModal.propTypes = {
  isEditSizeModalOpen: PropTypes.bool.isRequired,
  setIsEditSizeModalOpen: PropTypes.func.isRequired,
  employerId: PropTypes.string.isRequired,
  employerSize: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(EditSizeModal);
