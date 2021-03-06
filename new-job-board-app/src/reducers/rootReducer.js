import { loadJobCart } from "../services/applicant/ApplicantServices.js";

const initState = {
  toast: { open: false, color: "grey", message: "" },
  employer: {
    jobPostings: [],
  },
  applicant: {
    applications: [],
    jobCart: [],
  },
};

const rootReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "REMOVE_JOB_FROM_CART":
      return {
        ...state,
        applicant: {
          ...state.applicant,
          jobCart: state.applicant.jobCart.filter(
            (entry) => entry.jobPosting.id !== action.payload
          ),
        },
      };
    case "ADD_JOB_TO_CART":
      return {
        ...state,
        applicant: {
          ...state.applicant,
          jobCart: [...state.applicant.jobCart, action.payload],
        },
      };
    case "OPEN_TOAST":
      return {
        ...state,
        toast: {
          open: true,
          color: action.payload.color,
          message: action.payload.message,
        },
      };
    case "CLOSE_TOAST":
      return { ...state, toast: { ...state.toast, open: false } };
    case "LOAD_EMPLOYER":
      return { ...state, employer: action.payload };
    case "LOAD_APPLICANT":
      return { ...state, applicant: action.payload };
    case "UPDATE_EMPLOYER_FIELD":
      return {
        ...state,
        employer: {
          ...state.employer,
          [action.payload.field]: action.payload.value,
        },
      };
    case "LOAD_JOB_POSTINGS":
      return {
        ...state,
        jobPostings: action.payload,
      };
    case "ADD_JOB_POSTING":
      return {
        ...state,
        employer: {
          ...state.employer,
          jobPostings: [...state.employer.jobPostings, action.payload],
        },
      };
    case "DELETE_JOB_POSTING":
      return {
        ...state,
        employer: {
          ...state.employer,
          jobPostings: state.employer.jobPostings.filter(
            (jobPosting) => jobPosting.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
