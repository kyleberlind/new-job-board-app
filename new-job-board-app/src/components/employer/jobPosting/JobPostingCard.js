import React, { useState, useEffect } from "react";
import { Container, Row, Card} from "react-bootstrap";
import PropTypes from "prop-types";

const JobPostingCard = (props) => {
  const formattedJobLocation = `${props.jobPosting.city}, ${props.jobPosting.state}, ${props.jobPosting.zipCode}`;

  return (
    <Card>
      <Card.Header>
        {props.jobPosting.role} | {formattedJobLocation}
      </Card.Header>
      <Card.Body>
        <Container fluid>
          <Row>ID: {props.jobPosting.id}</Row>
          <Row>Date Created: {props.jobPosting.dateCreated}</Row>
          <Row>Number of Applicants:</Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

JobPostingCard.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default JobPostingCard;
