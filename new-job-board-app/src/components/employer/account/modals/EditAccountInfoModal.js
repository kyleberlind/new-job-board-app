import React from "react";
import PropTypes from "prop-types";
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";
import EditSizeModal from "./EditSizeModal";


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
          userId={props.employer.userId}
        />
      );

    case "size":
      return (
        <EditSizeModal
          isEditSizeModalOpen={props.isEditAccountInfoModalOpen}
          setIsEditSizeModalOpen={props.setIsEditAccountInfoModalOpen}
          employerId={props.employer.employerId}
          employerSize={props.employer.employerSize}
        />
      );

    default:
      return (
        <EditSizeModal
          isEditSizeModalOpen={props.isEditAccountInfoModalOpen}
          setIsEditSizeModalOpen={props.setIsEditAccountInfoModalOpen}
          employerId={props.employer.employerId}
          employerSize={props.employer.employerSize}
        />
      );
  }
};
EditAccountInfoModal.propTypes = {
  isEditAccountInfoModalOpen: PropTypes.bool.isRequired,
  setIsEditAccountInfoModalOpen: PropTypes.func.isRequired,
  employer: PropTypes.object.isRequired,
};

export default EditAccountInfoModal;
