import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button, Container } from "semantic-ui-react";

function ApplicantAccount(props) {
  return (
    <Container className="container" fluid>
      <h3>
        Name: {props.applicant?.firstName + " " + props.applicant?.lastName}
      </h3>
      <h4>Email: {props.applicant?.emailAddress}</h4>
      <h4>ID: {props.applicant?.applicantId}</h4>
    </Container>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    applicant: state.applicant,
  };
};

export default connect(mapStateToProps)(ApplicantAccount);
