const isToastOpen = (state = [], action) => {
  switch (action.type) {
    case "OPEN_TOAST":
      return { isToastOpen: action.data.isToastOpen };
    default:
      return state;
  }
};
