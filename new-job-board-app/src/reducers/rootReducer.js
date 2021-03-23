import { loadJobCart } from "../services/applicant/ApplicantServices.js";

let jobCart = [];
loadJobCart().then((response) => {
  response.json().then((data) => {
    jobCart = data["jobCart"];
  });
});

const initState = {
  jobCart: jobCart,
}

const rootReducer = (state = initState, action) => {
  return state;
}

export default rootReducer;
