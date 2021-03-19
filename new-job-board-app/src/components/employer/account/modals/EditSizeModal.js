import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Container, Button } from "semantic-ui-react";
import { EMPLOYER_SIZE_OPTIONS } from "../../../../constants/employer/EmployerConstants";

const EditSizeModal = (props) => {
  const [newEmployerSize, setNewEmployerSize] = useState("");
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
            onChange={(event) => {
              setNewEmployerSize(event.target.value);
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
};

export default EditSizeModal;
