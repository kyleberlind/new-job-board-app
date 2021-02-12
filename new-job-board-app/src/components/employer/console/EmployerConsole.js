import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Accordion,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import EditJobPostingModal from "../jobPosting/EditJobPostingModal";
import {
  loadJobPostingsByEmployerId,
  updateJobPostingService,
} from "../../../services/employer/EmployerServices";
import JobPostingCard from "../jobPosting/JobPostingCard";
import {
  NO_JOB_POSTINGS_MESSAGE,
  MY_JOB_POSTINGS_TITLE,
} from "../constants/EmployerConstants";

const EmployerConsole = (props) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [areJobPostingsLoading, setAreJobPostingsLoading] = useState(true);
  const [showEditJobPostingModal, setShowEditJobPostingModal] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState({})

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
        return (
          <Accordion key={jobPosting.id}>
            <Card>
              <Accordion.Toggle as={Button} variant="dark" eventKey="0">
                <JobPostingCard jobPosting={jobPosting} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Container fluid>
                  <Row noGutters>
                    <Col lg={6}>
                      <Card>
                        <Card.Body>
                          Description: {jobPosting.description}
                        </Card.Body>
                        <Card.Footer>
                          <Container fluid>
                            <Row>
                              <Col>
                                <Button
                                  block
                                  variant="primary"
                                  onClick={() => {
                                    setShowEditJobPostingModal(true);
                                    setSelectedJobPosting(jobPosting)
                                  }}
                                >
                                  Edit
                                </Button>
                              </Col>
                              <Col>
                                <Button block variant="secondary">
                                  Delete
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col lg={6}>
                      <Card>Applicants</Card>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Collapse>
            </Card>
          </Accordion>

        );
      })
    ) : (
      <Card>{NO_JOB_POSTINGS_MESSAGE}</Card>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>{MY_JOB_POSTINGS_TITLE}</Card.Header>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <Button variant="primary">Search</Button>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" />
            </InputGroup>
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
      <EditJobPostingModal
        jobPosting={selectedJobPosting}
        showEditJobPostingModal={showEditJobPostingModal}
        setShowEditJobPostingModal={setShowEditJobPostingModal}
      ></EditJobPostingModal>
    </Container>
  );
};

EmployerConsole.propTypes = {
  employer: PropTypes.object.isRequired,
};

export default EmployerConsole;
