import React from "react";
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";
import EditSizeModal from "./EditSizeModal";
import PropTypes from "prop-types";

const EditAccountInfoModal = (props) => {
  switch (props.editType) {
    case "emailAddress":
      return (
        <EditEmailModal
          isEditEmailModalOpen={props.isEditAccountInfoModalOpen}
          setIsEditEmailModalOpen={props.setIsEditAccountInfoModalOpen}
        />
      );
    case "password":
      return (
        <EditPasswordModal
          isEditPasswordModalOpen={props.isEditAccountInfoModalOpen}
          setIsEditPasswordModalOpen={props.setIsEditAccountInfoModalOpen}
        />
      );

    case "size":
      return (
        <EditSizeModal
          isEditSizeModalOpen={props.isEditAccountInfoModalOpen}
          setIsEditSizeModalOpen={props.setIsEditAccountInfoModalOpen}
        />
      );

    default:
      return (
        <EditSizeModal
          isEditSizeModalOpen={props.isEditAccountInfoModalOpen}
          setIsEditSizeModalOpen={props.setIsEditAccountInfoModalOpen}
        />
      );
  }
};
EditAccountInfoModal.propTypes = {
  isEditAccountInfoModalOpen: PropTypes.bool.isRequired,
  setIsEditAccountInfoModalOpen: PropTypes.func.isRequired,
};

export default EditAccountInfoModal;
