import React from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "semantic-ui-react";

const JobPostingCard = (props) => {
  const formattedJobLocation = `${props.jobPosting.location.city}, ${props.jobPosting.location.state}, ${props.jobPosting.location.zipCode}`;
  const getJobPostingHeader = () => {
    return (
      props.jobPosting.generalInfo.role +
      (props.jobPosting.generalInfo.team !== null ? " | " : "") +
      props.jobPosting.generalInfo.team
    );
  };
  return (
    <Card color='grey'  fluid>
      <Card.Content
        textAlign="left"
        header={getJobPostingHeader()}
        meta={formattedJobLocation}
      />
    </Card>
  );
};

JobPostingCard.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default JobPostingCard;
