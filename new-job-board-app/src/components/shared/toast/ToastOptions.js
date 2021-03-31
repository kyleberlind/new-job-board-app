export const getSuccessToastWithMessage = (message) => {
  return {
    color: "green",
    message,
  };
};

export const getFailureToastWithMessage = (message) => {
  return {
    color: "red",
    message,
  };
};
