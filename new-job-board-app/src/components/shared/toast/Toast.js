import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TransitionablePortal, Message } from "semantic-ui-react";
import { connect } from "react-redux";

const Toast = (props) => {
  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        props.closeToast();
      }, 4000);
    }
  }, [props.open]);

  return (
    <TransitionablePortal
      open={props.open}
      transition={{ animation: "fade", duration: 500 }}
      closeOnDocumentClick={false}
    >
      <Message
        onDismiss={() => {
          props.closeToast();
        }}
        color={props.color}
        style={{
          left: "50%",
          position: "fixed",
          top: "85%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Message.Header>{props.message}</Message.Header>
      </Message>
    </TransitionablePortal>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    open: state.toast.open,
    message: state.toast.message,
    color: state.toast.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeToast: () => dispatch({ type: "CLOSE_TOAST" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
