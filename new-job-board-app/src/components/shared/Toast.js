import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TransitionablePortal, Message } from "semantic-ui-react";

const Toast = (props) => {
  const [isToastOpen, setIsToastOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsToastOpen(false);
    }, 5000);
  }, []);
  
  return (
    <TransitionablePortal
      open={isToastOpen}
      transition={{ animation: "fade", duration: 500 }}
    >
      <Message
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

Toast.defaultProps = {
  color: "grey",
};

export default Toast;
