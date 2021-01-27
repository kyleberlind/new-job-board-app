import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import { loadJobPostingsByEmployerId } from "../../../services/employer/EmployerServices";
import JobPostingCard from "../jobPosting/JobPostingCard";

const EmployerConsole = (props) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [areJobPostingsLoading, setAreJobPostingsLoading] = useState(true);

  useEffect(() => {
    if (
      Object.keys(props.employer).length !== 0 &&
      props.employer.employerId !== ""
    ) {
      setAreJobPostingsLoading(true);
      loadJobPostingsByEmployerId(props.employer.employerId)
        .then((response) => {
          response.json().then((data) => {
            if (data["jobPostings"].length > 0) {
              setJobPostings(data["jobPostings"]);
            }
            setAreJobPostingsLoading(false);
          });
        })
        .catch((error) => {
          setAreJobPostingsLoading(false);
          console.log(error);
        });
    }
  }, [props.employer]);

  const generateJobPostings = () => {
    return jobPostings.length > 0 ? (
      jobPostings.map((jobPosting) => {
        return <JobPostingCard key={jobPosting.id} jobPosting={jobPosting} />;
      })
    ) : (
      <Card>You dont have any postings yet</Card>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>My Job Postings</Card.Header>
            <Card.Body>
              {areJobPostingsLoading ? (
                <Spinner animation="border" role="status" size={"lg"}></Spinner>
              ) : (
                generateJobPostings()
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

EmployerConsole.propTypes = {
  employer: PropTypes.object.isRequired,
};

export default EmployerConsole;
