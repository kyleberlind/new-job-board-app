import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const JobPostingCard = (props) => {
  const formattedJobLocation = `${props.jobPosting.location.city}, ${props.jobPosting.location.state}, ${props.jobPosting.location.zipCode}`;

  const handleEditButtonClick = () => {
    props.setShowEditJobPostingModal(true);
  };

  return (
    <Container fluid>
      <Row>
        <Card.Text>
          {props.jobPosting.generalInfo.role}{" "}
          {props.jobPosting.generalInfo.team !== null ? "| " : ""}
          {props.jobPosting.generalInfo.team}
        </Card.Text>
      </Row>
      <Row>
        <Card.Subtitle className="mb-2 text-muted">
          {formattedJobLocation}
        </Card.Subtitle>
      </Row>
    </Container>
  );
};

JobPostingCard.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default JobPostingCard;
