import { loadJobCart } from "../services/applicant/ApplicantServices.js";

const initState = {
  jobCart: [], // TODO: load jobcart from server for initstate
}

const rootReducer = (state = initState, action) => {
  console.log(action);
  if (action.type === 'UPDATE_JOB_CART') {
    return {
      jobCart: action.jobCart
    }
  }
  return state;
}

export default rootReducer;
