import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Container, Button } from "semantic-ui-react";
import { EMPLOYER_SIZE_OPTIONS } from "../../../../constants/employer/EmployerConstants";
import { useMutation } from "@apollo/client";
import { UPDATE_EMPLOYER_SIZE_MUTATION } from "../../../../services/graphql/mutations/EmployerMutations";
import { useSelector, useDispatch } from "react-redux";

const EditSizeModal = (props) => {
  const [newEmployerSize, setNewEmployerSize] = useState(props.employerSize);
  const [updateEmployerSize, { mutationData }] = useMutation(
    UPDATE_EMPLOYER_SIZE_MUTATION
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setNewEmployerSize(props.employerSize);
  }, [props.employerSize]);

  const handleUpdateSize = () => {
    updateEmployerSize({
      variables: {
        employerId: props.employerId,
        newSize: newEmployerSize,
      },
    });
    //TODO update the redux state
    //TODO include confirmation toast
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

EditSizeModal.propTypes = {
  isEditSizeModalOpen: PropTypes.bool.isRequired,
  setIsEditSizeModalOpen: PropTypes.func.isRequired,
  employerId: PropTypes.number.isRequired,
  employerSize: PropTypes.string.isRequired,
};

export default EditSizeModal;
