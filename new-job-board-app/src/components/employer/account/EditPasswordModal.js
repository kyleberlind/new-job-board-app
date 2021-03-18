import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

const EditPasswordModal = (props) => {
  return (
    <Modal
      open={props.isEditModalOpen}
      onOpen={props.setIsEditModalOpen(true)}
      onClose={props.setIsEditModalOpen(false)}
    >
        <Modal.Header>
            Edit Password?
        </Modal.Header>
        <Modal.Content>
            <Input></Input>
        </Modal.Content>
    </Modal>
  );
};

EditPasswordModal.propTypes = {
  isEditModalOpen: PropTypes.bool.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
};

export default EditSizeModal;
