import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

const MyApplicationsView = (props) => {
  return <Container>My Applications</Container>;
};

const mapStateToProps = (state) => {
  return {
    applications: state.applicant.applications,
  };
};

export default connect(mapStateToProps)(MyApplicationsView);
