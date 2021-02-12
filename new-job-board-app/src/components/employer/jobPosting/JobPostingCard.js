import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const JobPostingCard = (props) => {
  const formattedJobLocation = `${props.jobPosting.city}, ${props.jobPosting.state}, ${props.jobPosting.zipCode}`;

  const handleEditButtonClick = () => {
    props.setShowEditJobPostingModal(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            <Card.Text>{props.jobPosting.role} {props.jobPosting.team !== null ? "|" : ''} {props.jobPosting.team}</Card.Text>
          </Row>
          <Row>
            <Card.Subtitle className="mb-2 text-muted">
              {formattedJobLocation}
            </Card.Subtitle>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

JobPostingCard.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default JobPostingCard;
