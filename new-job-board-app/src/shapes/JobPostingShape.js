import PropTypes from "prop-types";
export const jobPostingShape = PropTypes.shape({
  generalInfo: PropTypes.shape({
    role: PropTypes.string,
    team: PropTypes.string,
    description: PropTypes.string,
  }),
  location: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }),
});
