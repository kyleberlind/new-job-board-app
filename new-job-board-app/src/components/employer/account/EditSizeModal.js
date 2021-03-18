import React from "react";
import PropTypes from "prop-types";
import { Modal, Dropdown } from "semantic-ui-react";

const EditSizeModal = (props) => {
  return (
    <Modal
      open={props.isSizeModalOpen}
      onOpen={props.setIsSizeModalOpen(true)}
      onClose={props.setIsSizeModalOpen(false)}
    >
      <Modal.Header>Edit Size?</Modal.Header>
      <Modal.Content>
        <Dropdown>
            
        </Dropdown>
      </Modal.Content>
    </Modal>
  );
};

EditSizeModal.propTypes = {
  isSizeModalOpen: PropTypes.bool.isRequired,
  setIsSizeModalOpen: PropTypes.func.isRequired,
};

export default EditSizeModal;
